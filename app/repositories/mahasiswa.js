const { Mahasiswa } = require('../models');

module.exports = {
  create(inputData) {
    return Mahasiswa.create(inputData);
  },

  update(id, updateData) {
    return Mahasiswa.update(updateData, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Mahasiswa.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Mahasiswa.findByPk(id);
  },

  findAll(condition) {
    return Mahasiswa.findAll(condition);
  },

  findOne(key) {
    return Mahasiswa.findOne(key);
  },

  getTotalMahasiswa() {
    return Mahasiswa.count();
  },
};