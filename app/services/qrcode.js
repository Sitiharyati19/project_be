const qrcodeRepository = require("../repositories/qrcode");

module.exports = {
 async create(requestBody) {
    const qrcode = await qrcodeRepository.create(requestBody);
    const qrcodeCount = await qrcodeRepository.getTotalQRcode();

    return {
      data: qrcode,
      count: qrcodeCount,
    };
    // return registrationsRepository.create(requestBody);
  },

  update(id, requestBody) {
    return qrcodeRepository.update(id, requestBody);
  },

  delete(id) {
    return qrcodeRepository.delete(id);
  },

  deleteAll(){
    return qrcodeRepository.deleteAll();
  },

  async list(query) {
    const qrcode = await qrcodeRepository.findAll(query);
    const qrcodeCount = await qrcodeRepository.getTotalQRcode();

    return {
      data: qrcode,
      count: qrcodeCount,
    };
  },

  async listByCondition(query) {
    return registrationsRepository.findAll(query)
  },

  get(id) {
    return registrationsRepository.find(id);
  },

  getOne(key) {
    return registrationsRepository.findOne(key);
  },
};