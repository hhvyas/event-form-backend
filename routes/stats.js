const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();
const controller = require("../controllers/stats.contoller");


router.get("/", controller.stats);




module.exports = router;