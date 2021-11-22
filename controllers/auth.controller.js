const express = require('express');
const fetch = require('node-fetch');

exports.login = async (req, res) => {
   
    try {
        console.log(req.body.password, "RRU12345")
        if (req.body.password === "RRU12345"){
            res.send("Success");
        }else{
            res.send("Unothorized");
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
}


