const cloudinary = require("../../../config/cloudinary");

module.exports = {
  uploadPhoto(req, res) {
    console.log(req)
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, function (err, result) {
      if (!!err) {
        return res.status(400).json({
          error: err,
          message: "Gagal Upload File!",
        });
      }

      res.status(201).json({
        message: "Upload Foto Berhasil",
        url: result.url
      })
    })
  }
}