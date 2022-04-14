const express = require("express");
const router = express.Router();

const {createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, deleteAllStudents} = require("../controllers/student.controller");

router.post("/create", createStudent);
router.get("/getAll", getAllStudents);
router.get("/get/:id", getStudentById);
router.patch("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.delete("/deleteAll", deleteAllStudents);

module.exports = router;