const registrationsServices = require('../../services/registrations');
const timeFormat = require('../../utils/timeFormat');
const {
  Op
} = require("sequelize");
const {
  Mahasiswa
} = require("../../models")

module.exports = {
  async historyBookings(req, res) {
    try {
      const historyMahasiswa = await registrationsServices.list({
        include: {
          model: Mahasiswa,
          as: 'mahasiswa',
        },
        order: [
          ["mahasiswa_id", "DESC"]
        ]
      });

      const result = historyMahasiswa.map((history) => {
        if (history.is_done === true) {
          return ({
            msg: 'Mahasiswa Sudah Terdaftar',
            mahasiswa_id: history.mahasiswa_id,
            name: history.name,
            nim: history.nim,
            photo_profil: history.photo_profil,
            photo_transfer: history.photo_transfer,
            prodi: history.prodi,
            tahun_masuk: history.tahun_masuk,
            seat_number: history.seat_number,
          })
        } else if (history.is_done === false) {
          return ({
            msg: 'Mahasiswa Belum Terdaftar',
            mahasiswa_id: history.mahasiswa_id,
            name: history.name,
            nim: history.nim,
            photo_profil: history.photo_profil,
            photo_transfer: history.photo_transfer,
            prodi: history.prodi,
            tahun_masuk: history.tahun_masuk,
            seat_number: history.seat_number,
          })
        }
      });

      const mahasiswa_id = req.params.mahasiswa_id;
      const compareId = id.toString() === req.registrations.mahasiswa_id.toString();

      if (!compareId) {
        res.status(401).json({
          status: 'Failed',
          message: 'Tidak bisa melihat'
        });
        return;
      }

      res.status(200).json({
        message: 'Success',
        result,
      });
    } catch (err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  },

  async updateBookingMahasiswa(req, res) {
    try {
      const {
        is_done
      } = req.body;

      const update = await registrationsServices.update(req.params.id, {
        is_done
      });

      res.status(200).json({
        status: 'OK',
        message: `Mahasiswa dengan ID Bangku ${req.params.id} telah selesai.`,
      });
    } catch (err) {
      res.status(422).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async getCurrentRegistrations(req, res) {
    try {
      const getBooking = await registrationsServices.list({
        attributes: {
          exclude: ['password']
        }
      });

      const count = getBooking.count
      const result = getBooking.data.map((registrations) => {
        return ({
          mahasiswa_name: registrations.mahasiswa_name,
          mahasiswa_nim: registrations.mahasiswa_nim,
          photo_profil: registrations.photo_profil,
          photo_transfer: registrations.photo_transfer,
          prodi: registrations.prodi,
          tahun_masuk: registrations.tahun_masuk,
          seat_number: registrations.seat_number,
          count
        });
      });

      res.status(200).json({
        status: "Success",
        result,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  },

  async historyBookId(req, res) {
    try {
      const historyBook = await registrationsServices.list({
        where: {
          id: req.mahasiswa.id,
        },
        order: [
          ['id', 'DESC']
        ]
      });

      const result = historyBook.map((history) => {
        if (history.is_done === true) {
          return ({
            msg: 'Mahasiswa Sudah Terdaftar',
            id: history.mahasiswaId,
            mahasiswa_name: history.mahasiswa_name,
            mahasiswa_nim: history.mahasiswa_nim,
            photo_profil: history.photo_profil,
            photo_transfer: history.photo_transfer,
            prodi: history.prodi,
            tahun_masuk: history.tahun_masuk,
            seat_number: history.seat_number,
          })
        } else if (history.is_done === false) {
          return ({
            msg: 'Mahasiswa Belum Terdaftar',
            id: history.mahasiswaId,
            name: history.mahasiswaName,
            NIM: history.mahasiswanim,
            Photo: history.photo_profil,
            Transfer: history.photo_transfer,
            Prodi: history.prodi,
            Tahun: history.tahun_masuk,
            seat: history.seatNumber,
          })
        }
      });

      const id = req.params.id;
      const compareId = id.toString() === req.mahasiswa.id.toString();

      if (!compareId) {
        res.status(401).json({
          status: 'Failed',
          message: 'Tidak bisa melihat'
        });
        return;
      }

      res.status(200).json({
        message: 'Success',
        result,
      });
    } catch (err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  },
}