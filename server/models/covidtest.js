'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CovidTest extends Model {
        static associate(models) {
            // define association here
        }
    }

    CovidTest.init({
        idCard: DataTypes.BIGINT,
        barcode: DataTypes.STRING,
        testResult: DataTypes.BOOLEAN,
        testDate: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'CovidTest',
    });
    return CovidTest;
};