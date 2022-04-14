'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    nameSurname: DataTypes.STRING,
    idCard: DataTypes.INTEGER,
    rfid: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    className: DataTypes.STRING,
    department: DataTypes.STRING,
    testResult: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};