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

        axios.get(`https://covid-19.gov.ct.tr/QRdogrula/${barcode}/${idCard}`)
            .then(async response => {
                let data = response.data;
                let newData = {
                    testResult: !!data.includes("POZİTİF"),
                    testDate: data.match(regex)[0]
                }

                const covidTest = await db.CovidTest.create({
                    idCard,
                    barcode,
                    ...newData
                });

                MessageService(res, covidTest);
            })
            .catch(error => {
                throw new Error(error);
            })
    } catch (error) {
        if (error.message.includes("BARCODE_ALREADY_EXIST")) {
            ErrorService(res, {message: "BARCODE_ALREADY_EXIST"});
        } else {
            ErrorService(res, error);
        }
    }
};

module.exports = {
    createResult
};