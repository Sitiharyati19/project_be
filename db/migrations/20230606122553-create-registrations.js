'use strict';

const { sequelize } = require('../../app/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mahasiswa_id:{
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "mahasiswas",
        },
        key: "id",
      },
      },
      photo_profil: {
        type: Sequelize.STRING
      },
      photo_transfer: {
        type: Sequelize.STRING
      },
      prodi: {
        type: Sequelize.STRING
      },
      tahun_masuk: {
        type: Sequelize.STRING
      },
      seat_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: false,
      },
      is_done:{
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('registrations');
  }
};