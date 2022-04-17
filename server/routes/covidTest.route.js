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
const roleCheck = require("../middlewares/roleCheck.middleware");

router.post("/create", createResult);
router.get("/getAll", roleCheck([2]), getResults);
router.get("/getByBarcode/:barcode", roleCheck([2]), getResult);
router.get("/getById/:id", roleCheck([2]), getResultById);
router.patch("/update/:id", roleCheck([2]), updateResult);
router.delete("/deleteAll", roleCheck([2]), deleteAllResults);
router.delete("/delete/:id", roleCheck([2]), deleteResult);

module.exports = router;