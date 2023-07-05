'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    static associate(models) {
      this.hasMany(models.Registrations, {
        foreignKey:"mahasiswa_id",
        as: 'mahasiswa',
      });
      
    }
  }
  Mahasiswa.init({
    name: DataTypes.STRING,
    nim: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Mahasiswa',
    underscored: true,
  });
  return Mahasiswa;
};