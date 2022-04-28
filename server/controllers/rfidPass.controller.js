const db = require('../models');
const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");
const moment = require('moment');

const rfidPass = async (req, res) => {
    try {
        const {rfid} = req.params;
        const student = await db.Student.findOne({
            where: {
                rfid
            },
            attributes: {
                exclude: ["password"]
            },
            include: [{
                model: db.CovidTest,
                as: "covidTest",
                attributes: ["testDate"],
            }]
        });

        if (!student) {
            throw new Error("STUDENT_NOT_FOUND");
        }

        const checkIn = await db.Entries.findOne({
            order: [["createdAt", "DESC"]],
            where: {
                userId: student.id,
            }
        });

        const jsonedCheckIn = checkIn?.toJSON();
        if (jsonedCheckIn?.direction === "GİRİŞ") {
            throw new Error("STUDENT_ALREADY_IN");
        }

        const covid = await db.CovidTest.findOne({
            where: {
                userId: student.id
            },
            attributes: ["testDate", "testResult"],
        });

        if (!covid) {
            throw new Error("COVID_TEST_NOT_FOUND");
        }

        const jsonedCovid = covid.toJSON();
        var parts = jsonedCovid.testDate.split('/');

        const currentDate = new Date();
        const testDate = new Date(parts[2], parts[1] - 1, parts[0]);

        var a = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()]);
        var b = moment([testDate.getFullYear(), testDate.getMonth(), testDate.getDate()]);
        var diff = a.diff(b, 'days');

        if (diff > 7) {
            throw new Error("COVID_TEST_EXPIRED");
        }

        if (jsonedCovid.testResult) {
            throw new Error("COVID_TEST_POSITIVE");
        }

        await db.Entries.create({
            userId: student.id,
            direction: "GİRİŞ"
        })

        MessageService(res, true);
    } catch (error) {
        return ErrorService(res, error);
    }
}

const getOut = async (req, res) => {
    try {
        const {rfid} = req.params;
        const student = await db.Student.findOne({
            where: {
                rfid
            },
            attributes: {
                exclude: ["password"]
            },
            include: [{
                model: db.CovidTest,
                as: "covidTest",
                attributes: ["testDate"],
            }]
        });

        if (!student) {
            throw new Error("STUDENT_NOT_FOUND");
        }

        const checkIn = await db.Entries.findOne({
            order: [["createdAt", "DESC"]],
            where: {
                userId: student.id,
            }
        });

        const jsonedCheckIn = checkIn?.toJSON();
        if (jsonedCheckIn?.direction === "ÇIKIŞ" || !jsonedCheckIn?.direction) {
            throw new Error("STUDENT_ALREADY_OUT");
        }

        await db.Entries.create({
            userId: student.id,
            direction: "ÇIKIŞ"
        })

        MessageService(res, true);

    } catch (error) {
        return ErrorService(res, error);
    }
}

module.exports = {
    rfidPass,
    getOut
};