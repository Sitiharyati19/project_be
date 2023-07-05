'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Barcode.init({
    data: DataTypes.STRING,
    registration_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Barcode',
    underscored: true,
  });
  return Barcode;
};