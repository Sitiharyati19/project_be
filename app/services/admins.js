const adminsRepository = require("../repositories/admins");

module.exports = {
  create(requestBody) {
    return adminsRepository.create(requestBody);
  },

  update(id, requestBody) {
    return adminsRepository.update(id, requestBody);
  },

  delete(id) {
    return adminsRepository.delete(id);
  },
  async list() {
    const Admins = await adminsRepository.findAll();
    const AdminsCount = await adminsRepository.getTotalAdmins();

    return {
      data: Admins,
      count: AdminsCount
    }
  },

  get(id) {
    return adminsRepository.find(id);
  },

  getOne(key) {
    return adminsRepository.findOne(key);
  },
};