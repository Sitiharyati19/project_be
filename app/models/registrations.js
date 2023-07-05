'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registrations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Mahasiswa, {
        foreignKey: 'mahasiswa_id',
        as: 'mahasiswa',
      });
    } 
  }
  Registrations.init({
    mahasiswa_id: DataTypes.INTEGER,
    photo_profil: DataTypes.STRING,
    photo_transfer: DataTypes.STRING,
    prodi: DataTypes.STRING,
    tahun_masuk: DataTypes.STRING,
    seat_number: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Registrations',
    underscored: true,
  });
  return Registrations;
};