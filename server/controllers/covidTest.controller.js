const db = require('../models');
const axios = require('axios');
const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

const createResult = async (req, res) => {
    try {
        const {barcode, idCard} = req.body;
        let regex = /(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|[1][0-2])\/[0-9]+/i;

        const _covidTest = await db.CovidTest.findOne({
            where: {
                barcode: barcode,
            }
        });

        if (_covidTest) {
            throw new Error("BARCODE_ALREADY_EXIST");
        }

        const studentId = await db.Student.findOne({
            where: {
                idCard
            }
        });

        if (!studentId) {
            throw new Error("STUDENT_NOT_FOUND");
        }

        let response = await axios.get(`https://covid-19.gov.ct.tr/QRdogrula/${barcode}/${idCard}`)

        let data = response.data;

        if (data.match(regex) === null) {
            throw new Error("BARCODE_NOT_VALID");
        }

        let newData = {
            testResult: !!data.includes("POZİTİF"),
            testDate: data.match(regex)[0]
        }

        const findTest = await db.CovidTest.findOne({
            where: {
                idCard
            }
        });

        if (findTest) {
            await db.CovidTest.update({
                    barcode,
                    ...newData
                },
                {
                    where: {
                        idCard
                    }
                });
        } else {
            await db.CovidTest.create({
                idCard,
                barcode,
                userId: studentId.id,
                ...newData
            });
        }

        const createdCovidTest = await db.CovidTest.findOne({
            where: {
                barcode
            }
        });

        MessageService(res, createdCovidTest);

    } catch (error) {
        return ErrorService(res, error);
    }
};

const getResults = async (req, res) => {
    try {
        const covidTests = await db.CovidTest.findAll({
            where: {}
        });

        if (covidTests.length === 0) {
            throw new Error("NO_RESULTS_FOUND");
        }

        MessageService(res, covidTests);
    } catch (error) {
        return ErrorService(res, error);
    }
};

const getResult = async (req, res) => {
    try {
        const {barcode} = req.params;
        const covidTest = await db.CovidTest.findOne({
            where: {
                barcode
            }
        });

        if (!covidTest) {
            throw new Error("RESULT_NOT_FOUND");
        }

        MessageService(res, covidTest);
    } catch (error) {
        return ErrorService(res, error);
    }
};

const getResultById = async (req, res) => {
    try {
        const {id} = req.params;
        const covidTest = await db.CovidTest.findOne({
            where: {
                id
            }
        });

        if (!covidTest) {
            throw new Error("RESULT_NOT_FOUND");
        }

        MessageService(res, covidTest);
    } catch (error) {
        return ErrorService(res, error);
    }
};

const updateResult = async (req, res) => {
    try {
        const {id} = req.params;
        const {idCard, barcode, testResult, testDate} = req.body;

        const covidTest = await db.CovidTest.findOne({
            where: {
                id
            }
        });

        if (!covidTest) {
            throw new Error("RESULT_NOT_FOUND");
        }

        const updatedCovidTest = await covidTest.update({
            idCard,
            barcode,
            testResult,
            testDate
        });

        MessageService(res, updatedCovidTest);
    } catch (error) {
        return ErrorService(res, error);
    }
};


const deleteResult = async (req, res) => {
    try {
        const {id} = req.params;
        const covidTest = await db.CovidTest.destroy({
            where: {
                id
            }
        });

        if (!covidTest) {
            throw new Error("RESULT_NOT_FOUND");
        }

        MessageService(res, "ok");
    } catch (error) {
        if (error.message.includes("RESULT_NOT_FOUND")) {
            ErrorService(res, {message: "RESULT_NOT_FOUND"});
        } else {
            ErrorService(res, error);
        }
    }
};

const deleteAllResults = async (req, res) => {
    try {

        const covidTests = await db.CovidTest.findAll({
            where: {}
        });

        if (covidTests.length === 0) {
            throw new Error("NO_RESULTS_FOUND");
        }

        await db.CovidTest.destroy({
            where: {},
            truncate: true
        });

        MessageService(res, "ok");
    } catch (error) {
        return ErrorService(res, error);
    }
};

module.exports = {
    createResult,
    getResults,
    getResult,
    getResultById,
    updateResult,
    deleteResult,
    deleteAllResults
};