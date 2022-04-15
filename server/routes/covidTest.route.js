const express = require("express");
const router = express.Router();

const {createResult} = require("../controllers/covidTest.controller");

router.post("/create", createResult);

module.exports = router;