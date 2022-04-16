const express = require("express");
const router = express.Router();

const {rfidPass} = require("../controllers/rfidPass.controller");

router.get("/:rfid", rfidPass);

module.exports = router;