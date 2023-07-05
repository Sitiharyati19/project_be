const {
  Admins
} = require("../models");

module.exports = {
  create(inputData) {
    return Admins.create(inputData);
  },
  update(id, updateData) {
    return Admins.update(updateData, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Admins.destroy({
      where: {
        id
      }
    });
  },
  find(id) {
    return Admins.findByPk(id);
  },

  findAll() {
    return Admins.findAll();
  },

  findOne(key) {
    return Admins.findOne(key);
  },

  getTotalAdmins() {
    return Admins.count();
  },
};