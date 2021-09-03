const express = require('express');
const fetch = require('node-fetch');

const Award_Form = require('../models/form');
const Final_Award_Form = require('../models/final_form');
const router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.post('/eventform', async(req, res) => {
    let received_data = JSON.parse(JSON.stringify(req.body));
    console.log(received_data);
    const Enrollment_Number= received_data['rollno'];
    const First_Name= received_data['student_fname'];
    const Last_Name= received_data['student_lname'];
    const Email_id= received_data['email'];
    const Gender= received_data['gender_option'];
    const School_Name= received_data['school_name'];
    const Course_Name= received_data['course_name'];
    const Semester= received_data['sem_option'];
    const Event_Name= received_data['event_name'];
    const Event_Type= received_data['event_type'];
    const Event_Level= received_data['event_level'];
    const Rank= received_data['rank_option'];
    const Event_Date= received_data['event_date'];
    const datetime = Date.now();
    var newData = await Award_Form.create({
        Enrollment_Number,
        First_Name,
        Last_Name,
        Email_id,
        Gender,
        School_Name,
        Course_Name,
        Semester,
        Event_Name,
        Event_Type,
        Event_Level,
        Rank,
        Event_Date,
        datetime
    });
    let task = await Award_Form.find({ "_id": newData._id });
    if (task){
        console.log("Event Added!");
        res.send("Event Successfully Added!");
    }else{
        console.log("Event not Added! Broooo!!!!!!!!");
    }
}); 


// Get all Events

router.get("/events", async (req, res) => {
    const { sort, filter, range } = req.query;
    var sorts = JSON.parse(sort);
    var filters = JSON.parse(filter);
    if (filters.datetime) {
        // Solve this error
        console.log(typeof JSfilters.datetime);
        var datetime = new Date(filters.datetime);
        datetime = String(datetime);
        console.log(datetime);
    }
    /* Enrollment_Number,
        First_Name,
        Last_Name,
        Email_id,
        Gender,
        School_Name,
        Course_Name,
        Semester,
        Event_Name,
        Event_Type,
        Event_Level,
        Rank,
        Event_Date,
        datetime
        */
    if (filters.q){
        var ToBeMatchedQueryData = filters["q"];
        if (datetime){
            if (sorts.length === 2){
                var events = await Award_Form.find({ $and: [
                    {$or: [
                    {"Enrollment_Number" : {$regex: ToBeMatchedQueryData}},
                    {"First_Name" : {$regex: ToBeMatchedQueryData}},
                    {"Last_Name" : {$regex: ToBeMatchedQueryData}},
                    {"Email_id": {$regex: ToBeMatchedQueryData}},
                    {"Gender" : {$regex: ToBeMatchedQueryData}},
                    {"School_Name" : {$regex: ToBeMatchedQueryData}},
                    {"Course_Name" : {$regex: ToBeMatchedQueryData}},
                   // {"Semester" : {$regex: ToBeMatchedQueryData}},
                    {"Event_Name" : {$regex: ToBeMatchedQueryData}},
                    {"Event_Type" : {$regex: ToBeMatchedQueryData}},
                    {"Event_Level" : {$regex: ToBeMatchedQueryData}},
                    {"Rank" : {$regex: ToBeMatchedQueryData}},
                ]},
                {"datetime":  datetime }
            ]}).sort({[sorts[0]]: sorts[1] === "ASC" ? 1 : -1})
            }else{
                var events = await Award_Form.find({ $and: [
                    {$or: [
                        {"Enrollment_Number" : {$regex: ToBeMatchedQueryData}},
                        {"First_Name" : {$regex: ToBeMatchedQueryData}},
                        {"Last_Name" : {$regex: ToBeMatchedQueryData}},
                        {"Email_id": {$regex: ToBeMatchedQueryData}},
                        {"Gender" : {$regex: ToBeMatchedQueryData}},
                        {"School_Name" : {$regex: ToBeMatchedQueryData}},
                        {"Course_Name" : {$regex: ToBeMatchedQueryData}},
                       // {"Semester" : {$regex: ToBeMatchedQueryData}},
                        {"Event_Name" : {$regex: ToBeMatchedQueryData}},
                        {"Event_Type" : {$regex: ToBeMatchedQueryData}},
                        {"Event_Level" : {$regex: ToBeMatchedQueryData}},
                        {"Rank" : {$regex: ToBeMatchedQueryData}},
                ]},
                    {"datetime":  { "$gte": datetime, "$lt": datetime }}]}).sort({datetime: 1})
            }
        }else{
            if (sorts.length === 2){
                var events = await Award_Form.find(
                    {$or: [
                    {"Enrollment_Number" : {$regex: ToBeMatchedQueryData}},
                    {"First_Name" : {$regex: ToBeMatchedQueryData}},
                    {"Last_Name" : {$regex: ToBeMatchedQueryData}},
                    {"Email_id": {$regex: ToBeMatchedQueryData}},
                    {"Gender" : {$regex: ToBeMatchedQueryData}},
                    {"School_Name" : {$regex: ToBeMatchedQueryData}},
                    {"Course_Name" : {$regex: ToBeMatchedQueryData}},
                  //  {"Semester" : {$regex: ToBeMatchedQueryData}},
                    {"Event_Name" : {$regex: ToBeMatchedQueryData}},
                    {"Event_Type" : {$regex: ToBeMatchedQueryData}},
                    {"Event_Level" : {$regex: ToBeMatchedQueryData}},
                    {"Rank" : {$regex: ToBeMatchedQueryData}},
                ]}).sort({[sorts[0]]: sorts[1] === "ASC" ? 1 : -1})
            }else{
                var events = await Award_Form.find(
                    {$or: [
                        {"Enrollment_Number" : {$regex: ToBeMatchedQueryData}},
                        {"First_Name" : {$regex: ToBeMatchedQueryData}},
                        {"Last_Name" : {$regex: ToBeMatchedQueryData}},
                        {"Email_id": {$regex: ToBeMatchedQueryData}},
                        {"Gender" : {$regex: ToBeMatchedQueryData}},
                        {"School_Name" : {$regex: ToBeMatchedQueryData}},
                        {"Course_Name" : {$regex: ToBeMatchedQueryData}},
                      //  {"Semester" : {$regex: ToBeMatchedQueryData}},
                        {"Event_Name" : {$regex: ToBeMatchedQueryData}},
                        {"Event_Type" : {$regex: ToBeMatchedQueryData}},
                        {"Event_Level" : {$regex: ToBeMatchedQueryData}},
                        {"Rank" : {$regex: ToBeMatchedQueryData}},
                ]});
            }
        }
    }else{
        if (sorts.length === 2) {
                if (datetime) {
                    var events = await Award_Form.find({ "datetime": { "$gte": datetime, "$lt": datetime } }).sort({
                        [sorts[0]]: sorts[1] === "ASC" ? 1 : -1
                    });
                } else {
                    var events = await Award_Form.find().sort({
                        [sorts[0]]: sorts[1] === "ASC" ? 1 : -1
                    });
                }
        } else {
                if (filters.datetime) {
                    var events = await Award_Form.find({
                        "datetime": { "$gte": datetime, "$lt": datetime }
                    }).sort({ "datetime": 1 });
                } else {
                    var events = await Award_Form.find().sort({ "datetime": 1 });
                }
            }
        }

    events = JSON.parse(JSON.stringify(events).split('"_id":').join('"id":'));

    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.set("Content-Range", events.length);
    res.send(events);
});

router.put('/events/:id', async(req, res) => {
    // console.log(req.body);
    console.log("PUT Called");
    
    console.log(req.body['Status']);
    if (req.body['Status'] === 1){
        console.log(req.params.id);
        let ress = await Award_Form.find({_id: req.params.id});
        if (ress){

            console.log(ress[0]);

            let received_data =ress[0];
            console.log(received_data['Enrollment_Number'])
            const Enrollment_Number= received_data['Enrollment_Number'];
            const First_Name= received_data['First_Name'];
            const Last_Name= received_data['Last_Name'];
            const Email_id= received_data['Email_id'];
            const Gender= received_data['Gender'];
            const School_Name= received_data['School_Name'];
            const Course_Name= received_data['Course_Name'];
            const Semester= received_data['Semester'];
            const Event_Name= received_data['Event_Name'];
            const Event_Type= received_data['Event_Type'];
            const Event_Level= received_data['Event_Level'];
            const Rank= received_data['Rank'];
            const Event_Date= received_data['Event_Date'];
            const datetime = received_data['datetime'];
            var newData = await Final_Award_Form.create({
                Enrollment_Number,
                First_Name,
                Last_Name,
                Email_id,
                Gender,
                School_Name,
                Course_Name,
                Semester,
                Event_Name,
                Event_Type,
                Event_Level,
                Rank,
                Event_Date,
                datetime
            });
            let task = await Final_Award_Form.find({ "_id": newData._id });
            if (task){
                console.log("Event Added! to The Main DB");
                res.send("Event Successfully Added!");
            }else{
                console.log("Event not Added! Broooo!!!!!!!! in MAIN DB");
            }
            }
        }else{
    let id = req.params.id;
    const { Enrollment_Number,
        First_Name,
        Last_Name,
        Email_id,
        Gender,
        School_Name,
        Course_Name,
        Semester,
        Event_Name,
        Event_Type,
        Event_Level,
        Rank,
        Event_Date,
        datetime } = req.body;

    
    if (!Enrollment_Number,
        !First_Name,
        !Last_Name,
        !Email_id,
        !Gender,
        !School_Name,
        !Course_Name,
        !Semester,
        !Event_Name,
        !Event_Type,
        !Event_Level,
        !Rank,
        !Event_Date,
        !datetime) {
        res.status(302).json("Data Missing");
    } else {
        try {
            let result = await Award_Form.updateOne({ "_id": id }, { $set: { Enrollment_Number,
                First_Name,
                Last_Name,
                Email_id,
                Gender,
                School_Name,
                Course_Name,
                Semester,
                Event_Name,
                Event_Type,
                Event_Level,
                Rank,
                Event_Date,
                datetime } });

            if (result.n === 1 && result.nModified === 1) {
                res.send(req.body);
                console.log("Updated");
            } else
                res.status(404).json("Error");
        } catch (err) {
            console.log(err);
        }
    }
}
});


router.get('/events/:id', async(req, res) => {
    const id = req.params.id;
    console.log(id);
    let events = await Award_Form.find({ _id: ObjectID(id) });
        res.send(events[0]);
    });

router.delete('/events/:id', async(req, res) => {
    const id = req.params.id;
    Award_Form.deleteOne({ _id: id }, (e) => {
        
    });
    });



router.get("/stats", async (req, res) => {
    const { sort, filter, range } = req.query;
    console.log(req.query['q'])
    
    var stats = {
        gender: {},
        school:{},
        rank:{},
        semester:{}
    };
    //let Score = await Award_Form.find({'Gender': 'Male'}).count();
    if (req.query['q'] === "Final"){
    var events = await Final_Award_Form.find();

    for (let i=0;i<events.length;i++){
        const event = events[i];
        if (event.Gender in stats.gender){
            stats.gender[event.Gender] += 1;
        }else{
            stats.gender[event.Gender] = 1;
        }
        if (event.School_Name in stats.school){
            stats.school[event.School_Name] += 1;
        }else{
            stats.school[event.School_Name] = 1;
        }
        if (event.Semester in stats.semester){
            stats.semester[event.Semester] += 1;
        }else{
            stats.semester[event.Semester] = 1;
        }
        if (event.Rank in stats.rank){
            stats.rank[event.Rank] += 1;
        }else{
            stats.rank[event.Rank] = 1;
        }
    }
}else{
    var events = await Award_Form.find();

    for (let i=0;i<events.length;i++){
        const event = events[i];
        if (event.Gender in stats.gender){
            stats.gender[event.Gender] += 1;
        }else{
            stats.gender[event.Gender] = 1;
        }
        if (event.School_Name in stats.school){
            stats.school[event.School_Name] += 1;
        }else{
            stats.school[event.School_Name] = 1;
        }
        if (event.Semester in stats.semester){
            stats.semester[event.Semester] += 1;
        }else{
            stats.semester[event.Semester] = 1;
        }
        if (event.Rank in stats.rank){
            stats.rank[event.Rank] += 1;
        }else{
            stats.rank[event.Rank] = 1;
        }
    }
}

    stats = JSON.parse(JSON.stringify(stats).split('"_id":').join('"id":'));
    console.log(stats);
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.set("Content-Range", stats);
    res.send(stats);
});



module.exports = router;