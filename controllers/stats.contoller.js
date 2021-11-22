const express = require('express');
const fetch = require('node-fetch');

const Event_Form = require('../models/form');

exports.stats = async (req, res) => {
    try {
        const StatsData = {
            gender_list: [{
                gender: "Male",
                pending: 0,
                verified: 0,
            },{
                gender: "Female",
                pending: 0,
                verified: 0,
            },{
                gender: "Others",
                pending: 0,
                verified: 0,
            }],
            schools: [
                 {school_name: "SISPA", verified: 0, pending: 0},
                 {school_name: "SITAICS", verified: 0, pending: 0},
                 {school_name: "SICMSS", verified: 0, pending: 0},
                 {school_name: "SISDSS", verified: 0, pending: 0},
                 {school_name: "SFRMNS", verified: 0, pending: 0},
                 {school_name: "SICSSL", verified: 0, pending: 0},
                 {school_name: "SCBS", verified: 0, pending: 0},
                 {school_name: "SSLECJ", verified: 0, pending: 0},
                 {school_name: "SASET", verified: 0, pending: 0},
                 {school_name: "SPES", verified: 0, pending: 0},
                 {school_name: "SASTRA", verified: 0, pending: 0},
            ],
            verified: {
                accepted: 0,
                pending: 0,
            },
            Duration: [{
                    name: "Today",
                    pending: 0,
                    verified: 0
                },
                {
                    name: "This Week",
                    pending: 0,
                    verified: 0
                },
                {
                    name: "This Month",
                    pending: 0,
                    verified: 0
                },
                {
                    name: "Total",
                    pending: 0,
                    verified: 0,
                }
            ],}
       // console.log(Event_Form.distinct("School_Name"));
        StatsData.gender_list[0].verified = await Event_Form.find({"Gender" : "Male", "isVerified": true}).count();
        StatsData.gender_list[0].pending = await Event_Form.find({"Gender" : "Male", "isVerified": false}).count();
        
        StatsData.gender_list[1].verified = await Event_Form.find({"Gender" : "Female", "isVerified": true}).count();
        StatsData.gender_list[1].pending = await Event_Form.find({"Gender" : "Female", "isVerified": false}).count();
        StatsData.gender_list[2].verified = await Event_Form.find({"Gender" : "Other", "isVerified": true}).count();
        StatsData.gender_list[2].pending = await Event_Form.find({"Gender" : "Other", "isVerified": false}).count();
        
        
        {StatsData.schools.map(async (item, idx) => 
            {
            StatsData.schools[idx].verified = await Event_Form.find({"School_Name": `${item.school_name}`, "isVerified": true}).count();
            StatsData.schools[idx].pending = await Event_Form.find({"School_Name": `${item.school_name}`, "isVerified": false}).count();
            }
        )}
        
        StatsData.Duration[3].pending = await Event_Form.find({"isVerified" : false}).count();
        StatsData.Duration[3].verified = await Event_Form.find({"isVerified" : true}).count();
        let This_Date_Convertor = new Date().valueOf() - 86400000;
        let This_Week_Convertor = new Date().valueOf() - 604800000;
        let This_Month_Convertor = new Date().valueOf() - 2592000000;
        
        
        StatsData.Duration[0].pending = await Event_Form.find({"createdAt": { $lt: new Date().toISOString(), $gt: (new Date(This_Date_Convertor).toISOString())}, "isVerified": false}).count();
        StatsData.Duration[0].verified = await Event_Form.find({"createdAt": { $lt: new Date().toISOString(), $gt: (new Date(This_Date_Convertor).toISOString())}, "isVerified": true}).count();
       
        
        StatsData.Duration[1].pending = await Event_Form.find({"createdAt": { $lt: new Date().toISOString(), $gt: (new Date(This_Week_Convertor).toISOString())}, "isVerified": false}).count();
        StatsData.Duration[1].verified = await Event_Form.find({"createdAt": { $lt: new Date().toISOString(), $gt: (new Date(This_Week_Convertor).toISOString())}, "isVerified": true}).count();
       
        StatsData.Duration[2].pending = await Event_Form.find({"createdAt": { $lt: new Date().toISOString(), $gt: (new Date(This_Month_Convertor).toISOString())}, "isVerified": false}).count();
        StatsData.Duration[2].verified = await Event_Form.find({"createdAt": { $lt: new Date().toISOString(), $gt: (new Date(This_Month_Convertor).toISOString())}, "isVerified": true}).count();
       
        res.send(StatsData)

       } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}