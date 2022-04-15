const express = require("express");
const router = express.Router();

const {getResult} = require("../controllers/covidTest.controller");

router.get("/getResult", getResult);

module.exports = router;