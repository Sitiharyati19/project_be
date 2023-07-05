const registrationsServices = require('../../services/registrations');
// const mahasiswaServices = require('../../services/mahasiswa');
// const qrcode = require('qrcode')
// const qrcodeServices = require ("../../services/qrcode")
// const qrcodeRepository = require ("../../repositories/qrcode")
const {
  Mahasiswa, Registrations
} = require("../../models");
const mahasiswaServices = require("../../services/mahasiswa");

module.exports = {
  async createRegistrations(req, res) {
    try {
      const booking = await registrationsServices.create({
        mahasiswa_id: req.mahasiswas.id,
        name: req.mahasiswas.name,
        nim: req.mahasiswas.nim,
        photo_profil: req.body.photo_profil,
        photo_transfer: req.body.photo_transfer,
        prodi: req.body.prodi,
        tahun_masuk: req.body.tahun_masuk,
        is_done: false,
      });
      res.status(201).json({
        message: 'Berhasil Melakukan Pendaftaran',
        booking
      });
    } catch (err) {
      res.status(400).json({
        error: err.name,
        message: err.message
      });
    }

  },

  async deleteAllRegistrations(req, res) {
    const deleteRegistrations = await registrationsServices.deleteAll();
    res.status(200).json({
      status: 'Success',
      data: deleteRegistrations
    });
  },

  async getAllRegistrations(req, res) {
    const getAll = await registrationsServices.list({
      include: {
        model: Mahasiswa,
        as: 'mahasiswa',
      },
      order: [
        ["mahasiswa_id", "DESC"]
      ]
    })
    console.log(getAll.data);
    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async getRegistrationsOne(req, res) {
    try {
      const id = req.params.id
  
      const registrations = await Registrations.findByPk(id);
  
      if (registrations) {
        const mahasiswa = await Mahasiswa.findByPk(registrations.mahasiswa_id);
        let data = {
          id: mahasiswa.id,
          name: mahasiswa.name,
          nim: mahasiswa.nim,
          prodi: registrations.prodi,
          photo_profil: registrations.photo_profil,
          photo_transfer: registrations.photo_transfer,
          seat_number: registrations.seat_number,
          tahun_masuk: registrations.tahun_masuk,
        };
        res.status(200).json({ mahasiswa: data });
      } else {
        throw new Error("Pendaftaran tidak ditemukan");
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },


}