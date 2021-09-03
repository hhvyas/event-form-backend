const express = require('express');
const fetch = require('node-fetch');

const Award_Form = require('../models/form');
const router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get("/stats", async (req, res) => {
    console.log(req)
});




module.exports = router;