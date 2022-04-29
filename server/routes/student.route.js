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

router.post("/create", roleCheck(), createStudent);
router.get("/getAll", getAllStudents);
router.get("/get/:id", getStudentById);
router.get("/getByJWTToken", getStudentByJWTToken);
router.patch("/update/:id", roleCheck(), updateStudent);
router.delete("/delete/:id", roleCheck(), deleteStudent);
router.delete("/deleteAll", roleCheck(), deleteAllStudents);

module.exports = router;