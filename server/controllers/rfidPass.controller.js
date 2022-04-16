const db = require('../models');
const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

const rfidPass = async (req, res) => {
    try {
        const {rfid} = req.params;
        const student = await db.Student.findOne({
            where: {
                rfid
            }
        });

        if (!student) {
            throw new Error("STUDENT_NOT_FOUND");
        }

        MessageService(res, true);
    } catch (error) {
        if (error.message.includes("STUDENT_NOT_FOUND")) {
            ErrorService(res, {message: "STUDENT_NOT_FOUND"});
        } else {
            ErrorService(res, error);
        }
    }
}

module.exports = {
    rfidPass
};