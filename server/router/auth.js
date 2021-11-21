const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authenticate = require('../middleware/authenticate');
const transporter = require('../mailer/mail');
const path = require('path');
const multer = require('multer');
const ejs = require('ejs');




const router = express.Router();

// disk engine

const storage = multer.diskStorage({
    destination : 'Public/',
    filename : function(req , file , callback){
        callback(null,file.originalname);
    }
});

const upload = multer({ storage:storage});

// //upload disk
// const upload = multer({
//     storage : storage
// }).single('myImage');

// connection
require('../db/conn');

// user Schema
const Register = require("../model/userSchema");

const newFbSave = require("../model/newCampFbSchema");

const newGoogleSave = require("../model/googleSchema");

router.get('/' , (req , res) => {
    res.send("Home Page");
});

//---------PROMISES---------------------------

// router.post('/register' , (req , res) => {

//     const {name,email,phone,profession,password,cpassword} = req.body;

//     if(!name || !email || !phone || !profession || !password || !cpassword)
//     {
//         return res.status(422).json({error: "please fill all fields"});
//     }
//     else{
//     //  console.log(req.body);

//         // registration
//         Register.findOne({email:email})
//         .then((userExist) => {
//             // user Exists
//             if(userExist){
//                 return res.status(422).json({error: "user already registered"});
//             }

//             const register = new Register({name,email,phone,profession,password,cpassword});

//             register.save()
//             .then(() => { res.status(201).json({message: "user registered successgully!!"}); })
//             .catch((err) => {res.status(500).json({error: "failed to register"});})
//         }).catch((err) => console.log(err)); 


//     }
//     // res.json({message : req.body});
// });



// ------------------Async Await--------------------------

router.post('/register' , async (req , res) => {

    const {name,email,phone,profession,password,cpassword} = req.body;

    if(!name || !email || !phone || !profession || !password || !cpassword)
    {
        return res.status(422).json({error: "please fill all fields"});
    }
    else{
    //  console.log(req.body);

        try{

            // registration
        const userExist = await Register.findOne({email:email});

        if(userExist){
            return res.status(422).json({error: "user already registered"});
        }else if(password != cpassword)
        {
            return res.status(422).json({error: "password and confirm password do not match"});
        }else{
            const register = new Register({name,email,phone,profession,password,cpassword});

            const registered = await register.save();

            if(registered){
                return res.status(201).json({message: "user registered successfully!!"});
            }else{
                return res.status(500).json({error: "----------user registered FAILED---------------"});
            }
        }

        

        }catch(err){
            console.log(err)
        }

        

    }
    // res.json({message : req.body});
});

// ----------------------------Sign-in--------------------------


router.post('/signin' , async (req ,res) => {

    try{
        let token;

        const {email , password} = req.body;

        if( !email || !password)
        {
            return res.status(400).json({error : "Fill all fields"});
        }
        const login = await Register.findOne({email:email});

        if(login)
        {
            //comparing password in hash
            const isMatch = await bcrypt.compare(password , login.password);
            if(!isMatch){
                res.status(400).json({error : "invalid credentials"});
            }else{

                // generating token

                token = await login.generateToken();

                // cookie token
                res.cookie("jwtoken" , token,{
                    expires: new Date(Date.now() + 86400000),
                    httpOnly:true
                });

                res.json({message : "-----------user login successful------"});
            }
            
        }else{
            res.status(400).json({error : "invalid credentials"});
        }

    }catch(err)
    {console.log(err);}    

});

//--------------------- About Page ------------------------------

router.get('/about' , authenticate , (req , res) => {
    res.send(req.rootUser);
});

// -------------------------Logout Page----------------

router.get('/logout' , (req , res) => {

    res.clearCookie( 'jwtoken' , {path:'/'});

    res.status(200).send('Logout Successfull');
});


//--------------- Get data for Contact page---------------

router.get('/getData' , authenticate , (req , res) => {
    res.send(req.rootUser);
});

// Contact page

router.post('/contact' , authenticate , async (req , res) => {
    
    try{

        const { name , email , phone , message } = req.body;

        if( !name || !email || !phone || !message)
        {
            console.log("error in contact form");
            return res.status(422).json({error: "fill all fields"});
        }

        const userContact = await Register.findOne({ _id : req.userID});

        if(userContact){
            const userMesage = await userContact.addMessage( name , email , phone , message );

            await userContact.save();

            res.status(201).json({message:"message sent successfully"});
        }

    }catch(err){
        console.log(err);
    }

});

// --------------------------------get-ad-data----------------------------------------------------

// router.get('/about' , authenticate , (req , res) => {
//     res.send(req.rootUser);
// });


router.post('/reset-password' , (req,res) => {
    

        const {email } = req.body;

        if( !email )
        {
            return res.status(400).json({error : "Fill the Fields"});
        }

        crypto.randomBytes(32, (err,Buffer) => {
            if(err){
                console.log(err);
            }
            const resToken = Buffer.toString("hex");

            Register.findOne({email:email})
            .then((user) =>{
            console.log(res);

            if(!user)
            {
                return res.status(422).json({error:"User Not Found"});
            }
            user.resetToken = resToken;
            user.expireToken = Date.now() + 900000;

            user.save().then((result)=>{

            

                transporter.sendMail({
                    to:email,
                    from:'no-reply@yahoo.com',
                    subject:"Password Reset",
                    html:`
                    <p>You Requested for <b>Password Reset</b></p>
                    <h5>Click on this <a href="http://localhost:3000/reset/${resToken}">Link</a>to reset password</h5>
                    `
                }).catch((err) => console.log(err));
                res.json({message:"Check Your Email"});
            
        });
   
});
});
});

// =================================get Data from google ad storage==============================

router.get('/getGoogleData' ,authenticate ,async (req , res , next) => {


    const googleUser = await newGoogleSave.find({ email : req.email});

    if(!googleUser)
     {
          throw new Error('User Not Found');
    }else{

   
    req.googleUser = googleUser;
    console.log("----------------got google data----------");
    res.send(req.googleUser);
    // next();
    }
    // const userContact = await newGoogleSave.findOne({ email : req.rootUser.email});
    
});


// =================================get Data from facebook ad storage==============================

router.get('/getFacebookData' ,authenticate ,async (req , res , next) => {


    const facebookUser = await newFbSave.find({ email : req.email});

    if(!facebookUser)
     {
          throw new Error('Fb User Not Found');
    }else{

   
    req.facebookUser = facebookUser;
    console.log("----------------got facebook data----------");
    console.log(facebookUser);
    res.send(req.facebookUser);
    // next();
    }
    // const userContact = await newGoogleSave.findOne({ email : req.rootUser.email});
    
});


//=========================save google ad-data========================
router.post('/saveGoogleCamp' ,async (req , res) => {
    
    console.log(req.body);

     const {email,
        businessName,
        website,
        desktopMobile,

        headline1,
        headline2,
        headline3,
        description1,
        description2,

        adsetLocation} = req.body;


        const save = new newGoogleSave({email, 
            businessName,
            website,
            desktopMobile,
    
            headline1,
            headline2,
            headline3,
            description1,
            description2,
    
            adsetLocation});

        const saved = await save.save();

        if(saved){
            return res.status(201).json({message: "Google Ad information registered successfully!!"});
        }else{
            return res.status(500).json({error: "----------Google User Ad Information registration FAILED---------------"});
        }

    // const google = require('../fbInterface/imageDecoder');

});




router.post('/saveNewCampFb',upload.single('image')  , async (req , res) => {
   

    // const Location =  req.file.path;

    // console.log(Location);
    console.log(req.body);
    // console.log(req.body);

    
    // for(let i = 0; i <= req.body.demographics.length; i++) {
    //     console.log(req.body.demographics[i]);
    //   }
    
    // var Location = path.parse(req.body.image.replace(/^data:image\/(png|gif|jpeg);base64,/,''));

    // binaryData = new Buffer(Location.dir, 'base64').toString('binary');

    

    // var Images = new Image();

    // Images.src = req.body.image;

    // var img = Images.toDataURL("image");

    // var item_image = img.replace(/^data:image\/(png|jpg);base64,/, "") ;

    // // upload(req.body.image.file,res,(err) => {
    // //     if(err){
            
    // //     }else{
    // //         console.log(req.file);
    // //     }
    // // });
    // console.log(Location.dir);

    // module.exports=Location.dir;

    // const imageDecoder = require('../fbInterface/imageDecoder');

    // var form = new formidable.IncomingForm();

    // console.log("1");

    // form.parse(req);

    // console.log("2");

    // console.log(__dirname);

    // form.on('fileBegin', function(name,file) {
    //     file.path=__dirname+'/Public/'+file.name;
    //     console.log(file.name);
    // });

    // form.on('file', function(name,file) {
    //     console.log("uploaded file : " + file.name);
    // });

    // form.sendFile(__dirname);
    const newFbCampData = req.body;
    

    // module.exports = Location;    

    // module.exports = {newFbCampData , Location};


    // const fb = require('../fbInterface/interface');

    // const start = fb(req.body);

    const {email,selection,engagement,CampaignName,

        //adset attributes

        AdsetName,date,location,startAge,endAge,gender,demographics,

        // adLevel

        AdName,adCreative,image,primaryText,headline,description,url} = req.body;

    //     // console.log(AdsetName);

        const save = new newFbSave({email,selection,engagement,CampaignName,

            //adset attributes
    
            AdsetName,date,location,startAge,endAge,gender,demographics,
    
            // adLevel
    
            AdName,adCreative,image,primaryText,headline,description,url});

        const saved = await save.save();

        if(saved){
            return res.status(201).json({message: "user registered successfully!!"});
        }else{
            return res.status(500).json({error: "----------user registeration FAILED---------------"});
        }

});



module.exports = router;