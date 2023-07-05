const registrationsServices = require('../services/registrations');

module.exports = {
  async checkCondition(req, res, next) {
    const {
      photo_profil,
      photo_transfer,
      prodi,
      tahun_masuk,
      seat_number
    } = req.body;

    if (!photo_profil) {
      res.status(400).json({
        status: 'Failed',
        message: 'tidak boleh kosong!'
      });
      return;
    }

    if (!photo_transfer) {
      res.status(400).json({
        status: 'Failed',
        message: 'tidak boleh kosong!'
      });
      return;
    }

    if (!prodi) {
      res.status(400).json({
        status: 'Failed',
        message: 'tidak boleh kosong!'
      });
      return;
    }

    if (!tahun_masuk) {
      res.status(400).json({
        status: 'Failed',
        message: 'tidak boleh kosong!'
      });
      return;
    }

    // if (!seat_number) {
    //   res.status(400).json({
    //     status: 'Failed',
    //     message: 'nomor bangku tidak boleh kosong!'
    //   });
    //   return;
    // }

    // const uniqueseat = await registrationsServices.getOne({
    //   where: {
    //     seat_number
    //   }
    // });

    // if (uniqueseat) {
    //   res.status(409).json({
    //     status: 'Failed',
    //     message: 'nomor bangku sudah terisi!'
    //   });
    //   return;
    // }

    next();
  }
}