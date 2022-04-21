const express = require("express");
const router = express.Router();

const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
    getStudentByJWTToken
} = require("../controllers/student.controller");
const roleCheck = require("../middlewares/roleCheck.middleware");

router.post("/create", roleCheck([2]), createStudent);
router.get("/getAll", getAllStudents);
router.get("/get/:id", getStudentById);
router.patch("/update/:id", roleCheck([2]), updateStudent);
router.delete("/delete/:id", roleCheck([2]), deleteStudent);
router.delete("/deleteAll", roleCheck(), deleteAllStudents);
router.get("/getByJWTToken", getStudentByJWTToken);

module.exports = router;