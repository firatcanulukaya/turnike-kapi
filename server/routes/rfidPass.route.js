const express = require("express");
const router = express.Router();

const {rfidPass, getOut} = require("../controllers/rfidPass.controller");

router.get("/in/:rfid", rfidPass);
router.get("/out/:rfid", getOut);

module.exports = router;