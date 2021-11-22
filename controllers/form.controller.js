const express = require('express');
const fetch = require('node-fetch');
const fileUpload = require('express-fileupload');

const Event_Form = require('../models/form');

exports.form = async (req, res) => {
    try {
        // fetching form details
        const {
            Enrollment_Number,
            First_Name,
            Last_Name,
            Contact,
            Email_id,
            Gender,
            School_Name,
            Course_Name,
            Semester,
            Event_Name,
            Event_Type,
            Event_Level,
            Rank,
            Start_Date,
            End_Date,
            Team_Size,
            Document
        } = req.body;

        console.log(req.body)
        // validating whether all the form values are filleds
        if (!(Enrollment_Number && 
                First_Name && 
                Last_Name && 
                Email_id && 
                Gender && 
                School_Name &&
                Contact &&
                Course_Name &&
                Semester &&
                Event_Name &&
                Event_Type &&
                Event_Level &&
                Rank &&
                Start_Date &&
                End_Date &&
                Team_Size && 
                Document
                )) {
                    res.send("All input is required");
                    return;
            }
                
            const event = await Event_Form.create({
                Enrollment_Number,
                First_Name,
                Last_Name,
                Email_id,
                Contact,
                Gender,
                School_Name,
                Course_Name,
                Semester,
                Event_Name,
                Event_Type,
                Event_Level,
                Rank,
                Start_Date,
                End_Date,
                Team_Size,
                Document,
                isVerified: false
            });

            let validate = await Event_Form.find({ "_id": event._id });
            if (validate) {
                res.status(200).send("Event has been successfully registered! keep participating...")
            }else{
                res.send("There was some problem from our side... We will look into it shortly...")
            }
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}