const db = require('../models');
const axios = require('axios');
const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

const getResult = async (req, res) => {
    try {
        const {barcode, idCard} = req.body;
        let regex = /(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|[1][0-2])\/[0-9]+/i;

        axios.get(`https://covid-19.gov.ct.tr/QRdogrula/${barcode}/${idCard}`)
            .then(response => {
                let data = response.data;
                let newData = {
                    covidTest: !!data.includes("POZİTİF"),
                    date: data.match(regex)[0]
                }
                MessageService(res, newData);
            })
            .catch(error => {
                throw new Error(error);
            })
    } catch (error) {
        ErrorService(res, error);
    }
};

module.exports = {
    getResult
};