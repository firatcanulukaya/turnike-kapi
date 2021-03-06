const db = require('../models');
const bcrypt = require('bcrypt');
const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");
const jwt = require("jsonwebtoken");

const createStudent = async (req, res) => {
    try {
        const {nameSurname, password, idCard, rfid, studentId, className, department, testResult} = req.body;

        let _student = await db.Student.findOne({where: {idCard}});
        if (_student) {
            throw new Error("STUDENT_ALREADY_EXISTS");
        }

        let getRfid = await db.Student.findOne({where: {rfid}});
        if (getRfid && rfid !== "") {
            throw new Error("RFID_ALREADY_EXISTS");
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
        return ErrorService(res, error);
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await db.Student.findAll({
            attributes: {
                exclude: ["password"]
            },
            include: [{
                model: db.CovidTest,
                as: "covidTest",
                attributes: {
                    exclude: ["userId"]
                }
            },
                {
                    model: db.Entries,
                    as: "entries",
                    attributes: {
                        exclude: ["userId"]
                    }
                }]
        });

        return MessageService(res, students);
    } catch (error) {
        return ErrorService(res, error);
    }
}

const getStudentById = async (req, res) => {
    try {
        const {id} = req.params;

        const student = await db.Student.findOne(
            {
                where: {id},
                attributes: {
                    exclude: ["password"]
                },
                include: [{
                    model: db.CovidTest,
                    as: "covidTest",
                    attributes: {
                        exclude: ["userId"]
                    }
                },
                    {
                        model: db.Entries,
                        as: "entries",
                        attributes: {
                            exclude: ["userId"]
                        }
                    }]
            });

        if (!student) {
            throw new Error("STUDENT_NOT_FOUND");
        }

        return MessageService(res, student);
    } catch (error) {
        return ErrorService(res, error);
    }
}

const getStudentByJWTToken = async (req, res) => {
    try {

        const token = req.session.access_token || req.headers["x-access-token"];

        const decoded = jwt.verify(token, "GENERATE_CODE", {
            algorithms: ["HS256"]
        });

        const student = await db.Student.findOne({
            where: {
                id: decoded.id
            },
            attributes: {
                exclude: ["password"]
            },
            include: [{
                model: db.CovidTest,
                as: "covidTest",
                attributes: {
                    exclude: ["userId"]
                }
            },
                {
                    model: db.Entries,
                    as: "entries",
                    attributes: {
                        exclude: ["userId"]
                    }
                }]
        });

        return MessageService(res, student);

    } catch (error) {
        return ErrorService(res, error);
    }
}

const updateStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const {rfid, idCard, studentId, roleId} = req.body
        const student = await db.Student.findOne({where: {id}});

        if (student.dataValues.roleId < req.user.roleId || roleId < req.user.roleId) throw new Error("FORBIDDEN");
        if (roleId > 3 || roleId < 1) throw new Error("INVALID_ROLE");

        if (rfid) {
            const checkRfid = await db.Student.findOne({where: {rfid}});
            if (checkRfid && rfid !== "") throw new Error("RFID_EXIST");
        }

        if (studentId) {
            const checkStudentId = await db.Student.findOne({where: {studentId}});
            if (checkStudentId) throw new Error("STUDENT_ID_EXIST");
        }

        if (idCard) {
            const checkIdCard = await db.Student.findOne({where: {idCard}});
            if (checkIdCard) throw new Error("ID_CARD_EXIST");
        }

        await db.Student.update(req.body,
            {
                where: {
                    id
                },
                attributes: {
                    exclude: ["password"]
                },
            }
        );

        const updatedStudent = await db.Student.findOne({where: {id}});

        return MessageService(res, updatedStudent);
    } catch (error) {
        return ErrorService(res, error);
    }
}

const deleteStudent = async (req, res) => {
    try {
        const {id} = req.params;

        const student = await db.Student.findOne({where: {id}});

        if (student.dataValues.roleId < req.user.roleId) throw new Error("FORBIDDEN");

        await db.Student.destroy({
            where: {
                id
            }
        });

        await db.CovidTest.destroy({
            where: {
                userId: id
            }
        });

        await db.Entries.destroy({
            where: {
                userId: id
            }
        });

        return MessageService(res, "ok");
    } catch (error) {
        return ErrorService(res, error);
    }
}

const deleteAllStudents = async (req, res) => {
    try {

        await db.Student.destroy({
            where: {},
            truncate: true
        });

        await db.CovidTest.destroy({
            where: {},
            truncate: true
        });

        await db.Entries.destroy({
            where: {},
            truncate: true
        });

        return MessageService(res, "ok");
    } catch (error) {
        return ErrorService(res, error);
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
    getStudentByJWTToken
}