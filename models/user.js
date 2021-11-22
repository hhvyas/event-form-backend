const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    First_Name: {
        type: String,
        default: "",
    },
    Last_Name: {
        type: String,
        default: "",
    },
    Username: {
        type: String,
        default: "",
    },
    Passowrd: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const User = mongoose.model("user", UserSchema);
module.exports = User;