'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entries.init({
    userId: DataTypes.INTEGER,
    direction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entries',
  });
  return Entries;
};