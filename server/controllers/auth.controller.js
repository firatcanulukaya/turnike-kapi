const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

const login = async (req, res) => {
    try {
        const {idCard, password} = req.body;

        const user = await db.Student.findOne({
            where: {idCard}
        });

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("INVALID_PASSWORD");
        }

        const token = jwt.sign(
            {
                id: user.id,
                idCard: user.idCard,
                roleId: user.roleId,
                rfid: user.rfid,
            },
            "ooml",
            {expiresIn: "24h"});
        return MessageService(res, token);
    } catch (error) {
        return ErrorService(res, error);
    }
};

const register = async (req, res) => {
    try {
        const {nameSurname, password, idCard, rfid, studentId, className, department, testResult} = req.body;

        let _student = await db.Student.findOne({where: {idCard}});
        if (_student) {
            throw new Error("STUDENT_ALREADY_EXISTS");
        }

        let getRfid = await db.Student.findOne({where: {rfid}});
        if (getRfid) {
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
};

module.exports = {
    login,
    register
};