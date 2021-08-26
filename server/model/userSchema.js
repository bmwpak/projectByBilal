const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    phone : {
        type : Number,
        required: true
    },
    profession : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    cpassword : {
        type : String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    messages:[
        {
            name : {
                type : String,
                required: true
            },
            email : {
                type : String,
                required: true
            },
            phone : {
                type : Number,
                required: true
            },
            message : {
                type : String,
                required: true
            }
        }
    ],
    tokens:[
        {
            token:{
                type : String,
                required: true
            }
        }
    ],
    resetToken:String,
    expireResetToken:Date
})
 // storing password in hash 
userSchema.pre('save' , async function(next) {
    console.log("--------hash------");

    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password , 12);
        this.cpassword = await bcrypt.hash(this.cpassword , 12);
    }
    next();
});

// token generating function
userSchema.methods.generateToken = async function(){
    try{

        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token});
        await this.save();
        return token;

    }catch(err){
        console.log(err);
    }
};

// storing Message

userSchema.methods.addMessage = async function(name , email , phone , message ){
    try{

        this.messages = this.messages.concat({ name , email , phone , message });
        await this.save();
        return this.messages;

    }catch(err){
        console.log(err);
    }
};

const Register = mongoose.model('REGISTER' , userSchema);

module.exports = Register;