const express = require("express");
const router = express.Router();

const {
    createResult,
    getResults,
    getResult,
    updateResult,
    deleteAllResults,
    deleteResult,
    getResultById
} = require("../controllers/covidTest.controller");

router.post("/create", createResult);
router.get("/getAll", getResults);
router.get("/getByBarcode/:barcode", getResult);
router.get("/getById/:id", getResultById);
router.patch("/update/:id", updateResult);
router.delete("/deleteAll", deleteAllResults);
router.delete("/delete/:id", deleteResult);

module.exports = router;