const express = require("express");
const router = express.Router();

const controller = require("../controllers/form.controller");

router.post("/", controller.form);

module.exports = router