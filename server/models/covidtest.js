'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CovidTest extends Model {
        static associate(models) {
            CovidTest.belongsTo(models.Student, {
                foreignKey: 'idCard',
                as: 'student'
            });
        }
    }

    CovidTest.init({
        idCard: DataTypes.BIGINT,
        barcode: DataTypes.STRING,
        testResult: DataTypes.BOOLEAN,
        testDate: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'CovidTest',
    });
    return CovidTest;
};