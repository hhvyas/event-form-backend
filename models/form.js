const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AwardFormSchema = new Schema({
    Enrollment_Number: {
        default: "",
        type: String,
    },
    First_Name: {
        type: String,
        default: "",
    },
    Last_Name: {
        type: String,
        default: "",
    },
    
    Email_id: {
        type: String,
        default: ""
    },
    Gender: {
        type: String,
        default: "",
    },
    
    School_Name: {
        type: String,
        default: "",
    },
    
    Course_Name: {
        type: String,
        default: "",
    },

    Semester: {
        type: Number,
    },

    Event_Name: {
        type: String,
        default: "",
    },

    Event_Type: {
        type: String,
        default: "",
    },

    Event_Level: {
        type: String,
        default: "",
    },

    Rank: {
        type: String,
        default: "",
    },
    
    Event_Date: {
        type: Date,
        default: "",
    },

    Document: {
        type: String,
        data: Buffer,
        default: "",
    }
}, {timestamps: true});

const Event_Form = mongoose.model("Detail", AwardFormSchema);
module.exports = Event_Form;