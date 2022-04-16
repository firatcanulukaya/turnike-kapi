'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.hasMany(models.CovidTest, {
                foreignKey: 'userId',
                as: 'covidTest'
            });
        }
    }

    Student.init({
        nameSurname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCard: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        rfid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        className: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        },
        testResult: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};