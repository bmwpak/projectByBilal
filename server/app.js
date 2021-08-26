const env = require('dotenv');

const express = require("express");

const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

env.config({ path : './config.env' });

// // connection
// require('../db/conn');

app.use(express.json()); 

const port =process.env.PORT;




// const register = require("./model/userSchema");


// we make our router file to make route easy
app.use(require('./router/auth'));


// MIDDLEWARE

// const middleware = (req , res , next) => {
//     console.log("hello");
//     next();
// }

// app.get('/' , (req , res) => {
//     res.send("Home Page");
// });

// app.get('/about' , middleware ,  (req , res) => {
//     res.send("About Page");
// });


// app.get('/contact' , (req , res) => {
//     // cookie
//     res.cookie("test","bilal");
//     res.send("Contact Page");
// });

app.listen(port , () => {
    console.log (`Server is running at port no. ${port}`);
})