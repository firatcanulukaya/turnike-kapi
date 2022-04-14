'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CovidTest extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    CovidTest.init({
        idCard: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        testResult: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        testDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'CovidTest',
    });
    return CovidTest;
};