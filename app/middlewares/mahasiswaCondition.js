const mahasiswaServices = require('../services/mahasiswa');

module.exports = {
  async checkCondition(req, res, next) {
    const {
      name,
      password,
      nim
    } = req.body;

    if (!name) {
      res.status(400).json({
        status: 'Failed',
        message: 'Nama tidak boleh kosong!'
      });
      return;
    }

    if (!nim) {
      res.status(400).json({
        status: 'Failed',
        message: 'nim tidak boleh kosong!'
      });
      return;
    }

    const uniquenim = await mahasiswaServices.getOne({
      where: {
        nim
      }
    });

    if (uniquenim) {
      res.status(409).json({
        status: 'Failed',
        message: 'NIM sudah terdaftar!'
      });
      return;
    }

    // if (!email) {
    //   res.status(400).json({
    //     status: 'Failed',
    //     message: 'Email tidak boleh kosong!'
    //   });
    //   return;
    // }

    // const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

    // if (email == '' || email.search(filter) == -1) {
    //   res.status(400).json({
    //     status: 'Failed',
    //     message: 'Format penulisan email salah!'
    //   });
    //   return;
    // }

    // const uniqueEmail = await mahasiswaServices.getOne({
    //   where: {
    //     email
    //   }
    // });

    // if (uniqueEmail) {
    //   res.status(409).json({
    //     status: 'Failed',
    //     message: 'Email sudah terdaftar!'
    //   });
    //   return;
    // }
    if (!password) {
      res.status(400).json({
        status: 'Failed',
        message: 'Password tidak boleh kosong!'
      });
      return;
    }
    
    if (password.length < 8) {
      res.status(400).json({
        status: 'Failed',
        message: 'Password harus lebih dari 7 karakter!'
      });
      return;
    }

    next();
  },
};