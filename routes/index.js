const express = require('express');
const fetch = require('node-fetch');

const Award_Form = require('../models/form');
const router = express.Router();

router.post('/eventform', async(req, res) => {
    console.log(req.body);
})
/* router.post('/eventform', async(req, res) => {
    res.send("Received Something!");
    console.log("Event is POSTING SOMETHING...");
    console.log(req.body);
    var newData = await Award_Form.create({
        Enrollment_Number: req.body.rollno,
        First_Name: req.body.student_fname,
        Last_Name: req.body.student_lname,
        Email_id: req.body.email,
        Gender: req.body.gender_option,
        School_Name: req.body.school_name,
        Course_Name: req.body.course_name,
        Semester: req.body.sem_option,
        Event_Name: req.body.event_name,
        Event_Type: req.body.event_type,
        Event_Level: req.body.event_level,
        Rank: req.body.rank_option,
        Event_Date: req.body.event_date,
        Document: req.body.proof,
    });
    let task = await Award_Form.find({ "_id": newData._id });
    if (task){
        console.log("Event Added!");
    }else{
        console.log("Event not Added! Broooo!!!!!!!!");
    }
}); */

module.exports = router;