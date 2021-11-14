const mongoose = require("mongoose");



const newCampFbSchema = new mongoose.Schema({
    email:{
        type: String
    },
    CampaignType : {
        type : String,
    },
    EngagementTtpe : {
        type : String,
    },
    CampaignName : {
        type : String,
    },

    // Adset

    
    AdsetName : {
        type : String,
    },
    date: {
        type : Date
    },
    location : {
        type : String,
    },
    startAge : {
        type : Number,
        required: true
    },
    endAge : {
        type : Number,
        required: true
    },
    gender : {
        type : String,
    },
    demographics : {
        type : Array,
    },

    // adLevel

    adCreative : {
        type : String,
    },
    image:{
        type: String,
    },
    video:{
        type: [],
    },
    primaryText : {
        type : String,
    },
    headline : {
        type : String,
    },
    description : {
        type : String,
    },
    url : {
        type : String,
    }
    
})

const newFbSave = mongoose.model('STORE_FB_NEW_CAMPAIGN' , newCampFbSchema);

module.exports = newFbSave;