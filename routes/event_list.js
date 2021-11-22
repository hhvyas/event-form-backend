const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();
const controller = require("../controllers/event_list.controller");

router.get("/", controller.event_list)
router.get("/pending/:id", controller.event_list_pending);
router.get("/verified/:id", controller.event_list_verified);
router.post("/verified", controller.event_list_verified_disapprove);


router.post("/approve", controller.event_list_approve);
router.delete("/:id", controller.event_list_delete);





module.exports = router;