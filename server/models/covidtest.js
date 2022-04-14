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
    idCard: DataTypes.INTEGER,
    testResult: DataTypes.BOOLEAN,
    testDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CovidTest',
  });
  return CovidTest;
};