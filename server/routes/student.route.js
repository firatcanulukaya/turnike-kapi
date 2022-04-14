const express = require("express");
const router = express.Router();

const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    deleteAllStudents
} = require("../controllers/student.controller");
const roleCheck = require("../middlewares/roleCheck.middleware");
const authCheck = require("../middlewares/authCheck.middleware");

router.post("/create", roleCheck([2]), authCheck(), createStudent);
router.get("/getAll", authCheck(), getAllStudents);
router.get("/get/:id", authCheck(), getStudentById);
router.delete("/delete/:id", roleCheck([2]), authCheck(), deleteStudent);
router.delete("/deleteAll", roleCheck([2]), authCheck(), deleteAllStudents);

module.exports = router;