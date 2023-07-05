const { decodeToken } = require("../plugin");
const mahasiswaServices = require("../services/mahasiswa");

module.exports = {
  async authorize(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).json({
          status: "Failed",
          message: "Insert Token!"
        });
        return;
      }

      const token = req.headers.authorization.split("Bearer ")[1];
      const tokenPayload = decodeToken(
        token,
        process.env.JWT_PRIVATE_KEY || "Token"
      );
      
      req.mahasiswas = await mahasiswaServices.get(tokenPayload.id);

      next();
    } catch (err) {
      res.status(401).json({
        error: err.message,
        message: "Unauthorized."
      });
    }
  },
};