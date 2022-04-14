const db = require('../models');
const bcrypt = require('bcrypt');
const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

const createStudent = async (req, res) => {
    try {
        const {nameSurname, password, idCard, rfid, studentId, className, department, testResult} = req.body;

        let _student = await db.Student.findOne({where: {idCard}});
        if (_student) {
            throw new Error("STUDENT_ALREADY_EXISTS");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await db.Student.create({
            nameSurname,
            password: hashedPassword,
            roleId: 3,
            idCard,
            rfid,
            studentId,
            className,
            department,
            testResult
        });

        return MessageService(res, student);
    } catch (error) {

        if (error.message.includes("notNull Violation")) {
            return ErrorService(res, {message: "MISSING_PARAM"});
        } else if (error.message.includes("STUDENT_ALREADY_EXISTS")) {
            return ErrorService(res, {message: "STUDENT_ALREADY_EXISTS"});
        } else {
            return ErrorService(res, {message: "INTERNAL_SERVER_ERROR"});
        }

    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await db.Student.findAll({where: {}});

        return MessageService(res, students);
    } catch (error) {
        return ErrorService(res, {message: "INTERNAL_SERVER_ERROR"});
    }
}

const getStudentById = async (req, res) => {
    try {
        const {id} = req.params;

        const student = await db.Student.findOne({where: {id}});

        if (!student) {
            throw new Error("STUDENT_NOT_FOUND");
        }

        return MessageService(res, student);
    } catch (error) {
        if (error.message.includes("STUDENT_NOT_FOUND")) {
            return ErrorService(res, {message: "STUDENT_NOT_FOUND"});
        } else {
            return ErrorService(res, {message: "INTERNAL_SERVER_ERROR"});
        }
    }
}

const updateStudent = async (req, res) => {
    try {
        const {id} = req.params;

        if (req.body.roleId > 3 || req.body.roleId < 1) {
            throw new Error("INVALID_ROLE");
        }

        await db.Student.update(req.body,
            {
                where: {
                    id
                }
            }
        );

        const updatedStudent = await db.Student.findOne({where: {id}});

        return MessageService(res, updatedStudent);
    } catch (error) {
        if (error.message.includes("INVALID_ROLE")) {
            return ErrorService(res, {message: "INVALID_ROLE"});
        } else {
            return ErrorService(res, {message: "INTERNAL_SERVER_ERROR"});
        }
    }
}

const deleteStudent = async (req, res) => {
    try {
        const {id} = req.params;

        await db.Student.destroy({
            where: {
                id
            }
        });

        return MessageService(res, "ok");
    } catch (error) {
        return ErrorService(res, {message: "INTERNAL_SERVER_ERROR"});
    }
}

const deleteAllStudents = async (req, res) => {
    try {
        await db.Student.destroy({
            where: {},
            truncate: true
        });

        return MessageService(res, "ok");
    } catch (error) {
        return ErrorService(res, {message: "INTERNAL_SERVER_ERROR"});
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    deleteAllStudents
}