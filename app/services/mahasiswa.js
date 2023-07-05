const mahasiswaRepository = require('../repositories/mahasiswa');

module.exports = {
  create(requestBody) {
    return mahasiswaRepository.create(requestBody);
  },

  update(id, requestBody) {
    return mahasiswaRepository.update(id, requestBody);
  },

  delete(id) {
    return mahasiswaRepository.delete(id);
  },

  async listByCondition(condition) {
    try {
      const mahasiswa = await mahasiswaRepository.findAll(condition);
      const mahasiswaCount = await mahasiswaRepository.getTotalMahasiswa();

      return {
        data: mahasiswa,
        count: mahasiswaCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return mahasiswaRepository.find(id);
  },

  getOne(key) {
    return mahasiswaRepository.findOne(key);
  },
};