const mongoose = require("mongoose");



const googleSchema = new mongoose.Schema({
    email:{
        type: String
    },
    businessName : {
        type : String,
    },
    website : {
        type : String,
    },
    desktopMobile : {
        type : String,
    },

    // Adset

    
    headline1 : {
        type : String,
    },
    headline2: {
        type : String
    },
    headline3 : {
        type : String,
    },
    description1 : {
        type : String
    },
    description2 : {
        type : String
    },
    adsetLocation : {
        type : String,
    },
    time : {
        type: Date,
        default: Date.now
    }
    
})

const newGoogleSave = mongoose.model('GOOGLE_STORE' , googleSchema);

module.exports = newGoogleSave;