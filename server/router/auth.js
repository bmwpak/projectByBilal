const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authenticate = require('../middleware/authenticate');
const transporter = require('../mailer/mail');


const router = express.Router();

// connection
require('../db/conn');

// user Schema
const Register = require("../model/userSchema");

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


router.post('/reset-password' , (req,res) => {
    

        const {email } = req.body;

        if( !email )
        {
            return res.status(400).json({error : "Fill the Field"});
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

router.post('/saveNewCampFb' , (req , res) => {
   
    console.log(req.body);
    res.json({message:req.body});

});



module.exports = router;