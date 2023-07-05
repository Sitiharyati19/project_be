'use strict';
const {
  Op
} = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = '12345678';
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const listAdmins = [{
        name: 'Iqbaal Dhiafakhri Ramadhan',
      },
      {
        name: 'Angga Aldi Yunanda',
      },
      {
        name: 'Irham Nuran Harir',
      },
      {
        name: 'Muhammad Arfiza Shahab',
      },
      {
        name: 'Aghniny Haque',
      },
      {
        name: 'Rachel Amanda Aurora',
      },
    ];

    const users = new Array(1);
    for (let i = 0; i < users.length; i++) {
      users[i] = i + 1;
    }

    const insertAdmin = [];
    listAdmins.forEach((admin) => {
      insertAdmin.push(
        ...users.map(() => {
          const splitName = admin.name.split(' ');
          let emailBuild = splitName[0] + splitName[splitName.length - 1];
          const rand = Math.floor(Math.random() * 10);

          return ({
            name: admin.name,
            email: `${emailBuild.toLowerCase()}@gmail.com`,
            password: encryptedPassword,
            created_at: new Date(),
            updated_at: new Date(),
          });
        })
      )
    });

    await queryInterface.bulkInsert('admins', insertAdmin, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};