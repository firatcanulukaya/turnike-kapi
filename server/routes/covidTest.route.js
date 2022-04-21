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
const authCheck = require("../middlewares/authCheck.middleware");

router.post("/create", createResult);
router.get("/getAll", authCheck, roleCheck([2]), getResults);
router.get("/getByBarcode/:barcode", authCheck, roleCheck([2]), getResult);
router.get("/getById/:id", authCheck, roleCheck([2]), getResultById);
router.patch("/update/:id", authCheck, roleCheck([2]), updateResult);
router.delete("/deleteAll", authCheck, roleCheck([2]), deleteAllResults);
router.delete("/delete/:id", authCheck, roleCheck([2]), deleteResult);

module.exports = router;