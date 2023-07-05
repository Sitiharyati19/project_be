const mahasiswaServices = require('../../services/mahasiswa');
const {
  checkPassword,
  createToken,
  hashPassword
} = require('../../plugin');

module.exports = {
  async register(req, res) {
    try {
      const password = req.body.password;
      const encryptedPassword = await hashPassword(password, 10);

      const mahasiswa = await mahasiswaServices.create({
        name: req.body.name,
        password: encryptedPassword,
        nim: req.body.nim,
      });

      res.status(201).json({
      
        message: 'Berhasil Registrasi, Silahkan Masuk Ke Menu Login',
        mahasiswa,
      })
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: err.message
      });
    }
  },

  async login(req, res) {
    try {
      const nim = req.body.nim;
      const password = req.body.password;

      const mahasiswa = await mahasiswaServices.getOne({
        where: {
          nim
        },
      });

      if (!mahasiswa) {
        res.status(404).json({
          status: 'Failed',
          message: 'nim Tidak Ditemukan!'
        });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, mahasiswa.password);

      if (!isPasswordCorrect) {
        res.status(401).json({
          status: 'Failed',
          message: 'Password Salah!'
        });
        return;
      }

      const token = createToken({
        id: mahasiswa.id,
        name: mahasiswa.name,
        nim: mahasiswa.nim,
        role: 'Mahasiswa',
      }, process.env.JWT_PRIVATE_KEY || 'Token', {
        expiresIn: '2d'
      });

      res.status(201).json({
        id: mahasiswa.id,
        name: mahasiswa.name,
        nim: mahasiswa.nim,
        token,
        createdAt: mahasiswa.createdAt,
        updatedAt: mahasiswa.updatedAt,
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async deleteMahasiswa(req, res) {
    try {
      const id = req.params.id;
      const mahasiswa = await mahasiswaServices.getOne({
        where: {
          id,
        }
      });

      if(!mahasiswa) {
        res.status(404).json({
          status: 'Failed',
          message: `Mahasiswa dengan ID ${id} tidak ditemukan!`,
        });
        return;
      }

      const compareMahasiswaId = req.mahasiswas.id === mahasiswa.id;

      if(!compareMahasiswaId) {
        res.status(404).json({
          status: 'Unauthorized',
          message: 'Mahasiswa hanya bisa menghapus data dia sendiri!'
        });
        return;
      }

      const destroy = await mahasiswaServices.delete(id);
      res.status(200).json({
        status: 'OK',
        message: `mahasiswa dengan ID ${id} berhasil dihapus`,
      });

    } catch (err) {
      res.status(400).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  },

  async whoAmI(req, res) {
    try {
      res.status(200).json({
        id: req.mahasiswas.id,
        name: req.mahasiswas.name,
        nim: req.mahasiswas.nim,
        createdAt: req.mahasiswas.createdAt,
        updatedAt: req.mahasiswas.updatedAt
      });
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },
  async getMahasiswaById(req, res) {
    try {
      const mahasiswa = await mahasiswaServices.getOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ['password']
        }
      });

      if (!mahasiswa) {
        throw new Error(`Mahasiswa dengan ID ${req.params.id} tidak ditemukan!`);
      }
      res.status(200).json(mahasiswa);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getTotalMahasiswa(req, res) {
    const getAll = await mahasiswaServices.listByCondition({
      attributes: {
        exclude: ['password']
      }
    });

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async getCurrentMahasiswa(req, res) {
    try {
      const mahasiswa = await mahasiswaServices.listByCondition({
        attributes: {
          exclude: ['password']
        }
      });

      const count = mahasiswa.count
      const result = mahasiswa.data.map((mahasiswas) => {
        return ({
          name: mahasiswas.name,
          nim: mahasiswas.nim,
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

  
};