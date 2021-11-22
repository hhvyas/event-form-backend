const express = require('express');
const fetch = require('node-fetch');

const Event_Form = require('../models/form');

exports.event_list = async (req, res) => {
    try {
      let Events = await Event_Form.find()
      res.send(Events);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}


exports.event_list_pending = async (req, res) => {
    let school_filter = req.params.id === "All";
    console.log(req.params.id)
    try {
        let PendingEvents;
        if (school_filter){
            PendingEvents = await Event_Form.find({"isVerified" : false})
        }else{
            PendingEvents = await Event_Form.find({"isVerified" : false, "School_Name": req.params.id})
        }
      res.send(PendingEvents);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}

exports.event_list_verified = async (req, res) => {
    let school_filter = req.params.id === "All";
    console.log(req.params.id)
    try {
        let VerifiedEvents;
        if (school_filter){
            VerifiedEvents = await Event_Form.find({"isVerified" : true})
        }else{
            VerifiedEvents = await Event_Form.find({"isVerified" : true, "School_Name": req.params.id})
        }
      res.send(VerifiedEvents);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}

exports.event_list_verified_disapprove = async (req, res) => {
    try {
        const status = await Event_Form.updateOne(
            { _id: req.body._id },
            { $set: { "isVerified": false } }
          );
          res.send(status)
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}

exports.event_list_approve = async (req, res) => {
    try {
    
        const status = await Event_Form.updateOne(
            { _id: req.body._id },
            { $set: { "isVerified": true } }
          );
          res.send(status)
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}

exports.event_list_delete = async (req, res) => {
    
    try {
        const status = await Event_Form.deleteOne(
            { _id: req.params.id },
          );
          res.send(status)
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}
