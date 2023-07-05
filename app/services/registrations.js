const registrationsRepository = require("../repositories/registrations");

module.exports = {
 async create(requestBody) {
    const registrations = await registrationsRepository.create(requestBody);
    const registrationsCount = await registrationsRepository.getTotalRegistrations();

    return {
      data: registrations,
      count: registrationsCount,
    };
    // return registrationsRepository.create(requestBody);
  },

  update(id, requestBody) {
    return registrationsRepository.update(id, requestBody);
  },

  delete(id) {
    return registrationsRepository.delete(id);
  },

  deleteAll(){
    return registrationsRepository.deleteAll();
  },

  async list(query) {
    const registrations = await registrationsRepository.findAll(query);
    const registrationsCount = await registrationsRepository.getTotalRegistrations();

    return {
      data: registrations,
      count: registrationsCount,
    };
  },

  // async listByCondition(query) {
  //   return registrationsRepository.findAll(query)
  // },

  get(id) {
    return registrationsRepository.find(id);
  },

  getOne(key) {
    return registrationsRepository.findOne(key);
  },
};