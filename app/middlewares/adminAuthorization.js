const { decodeToken } = require("../plugin");
const adminServices = require('../services/admins');

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

      if(tokenPayload.role !== 'Admin') {
        res.status(401).json({
          status: 'Failed',
          message: 'Unauthorized'
        });
        return;
      }

      req.admin = await adminServices.get(tokenPayload.id);

      next();
    } catch (err) {
      res.status(401).json({
        error: err.message,
        message: "Unauthorized."
      });
    }
  },
};