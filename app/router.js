const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const apiRouter = express.Router();
const uploadOnMemory = require("./../config/uploadOnMemory");

// // configure and initialization swagger
// const swaggerUI = require('swagger-ui-express');
// const swaggerDocument = require('../config/swagger.json');

apiRouter.get("/", controllers.api.application.getRoot);

/**
 * @Admin Resources 
 */
// apiRouter.post("/api/admins/register",
//   middlewares.adminCondition.checkCondition,
//   controllers.api.admins.register
// );
apiRouter.post("/api/admin/login",
  controllers.api.admins.login
);

apiRouter.get("/api/admin/who-am-i",
  middlewares.adminAuthorization.authorize,
  controllers.api.admins.whoAmI
);

apiRouter.get("/api/admin/:id",
  controllers.api.admins.getAdmin
);

apiRouter.get("/api/admin",
  middlewares.adminAuthorization.authorize,
  controllers.api.admins.getAllAdmins
);

/**
 * @Mahasiswa Resources 
 */

apiRouter.post("/api/mahasiswa/register",
  middlewares.mahasiswaCondition.checkCondition,
  controllers.api.mahasiswa.register
);

apiRouter.post("/api/mahasiswa/login",
  controllers.api.mahasiswa.login
);

apiRouter.get("/api/mahasiswa/who-am-i",
  middlewares.mahasiswaAuthorization.authorize,
  controllers.api.mahasiswa.whoAmI
);

apiRouter.put("/api/mahasiswa/:id/detail",
  middlewares.mahasiswaAuthorization.authorize,
  controllers.api.mahasiswa.updateDetail
);

apiRouter.delete("/api/mahasiswa/:id/destroy",
  middlewares.mahasiswaAuthorization.authorize,
  controllers.api.mahasiswa.deleteMahasiswa
);

apiRouter.get("/api/mahasiswa/:uuid",
  middlewares.adminAuthorization.authorize,
  controllers.api.mahasiswa.getMahasiswa
);

// apiRouter.get("/api/mahasiswa/:id",
//   middlewares.adminAuthorization.authorize,
//   controllers.api.mahasiswa.getMahasiswaById
// );

apiRouter.get("/api/mahasiswa",
  middlewares.adminAuthorization.authorize,
  controllers.api.mahasiswa.getTotalMahasiswa
);

apiRouter.get("/api/mahasiswa-current",
  middlewares.adminAuthorization.authorize || middlewares.mahasiswaAuthorization.authorize,
  controllers.api.mahasiswa.getCurrentMahasiswa
);

/**
 * @Registrations Resources 
 */

apiRouter.post("/api/mahasiswa/booking",
  middlewares.mahasiswaAuthorization.authorize,
  middlewares.registrationsCondition.checkCondition,
  controllers.api.registrations.createRegistrations
);

apiRouter.get("/api/bookings/:id",
  middlewares.mahasiswaAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.registrations.getRegistrations
);

apiRouter.get("/api/bookings",
  middlewares.mahasiswaAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.registrations.getAllRegistrations
);

apiRouter.delete("/api/destroys/booking",
  middlewares.adminAuthorization.authorize,
  controllers.api.registrations.deleteAllRegistrations
);

// apiRouter.get("/api/booking/:id",
//   middlewares.mahasiswaAuthorization.authorize || middlewares.adminAuthorization.authorize,
//   controllers.api.registrations.getRegistrationsOne
// );


/**
 * @Booking History 
 */

apiRouter.put("/api/admin/update-booking/:id",
  middlewares.adminAuthorization.authorize,
  controllers.api.bookings.updateBookingMahasiswa
);

apiRouter.get("/api/bookings/history/:id",
  middlewares.mahasiswaAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.bookings.historyBookings
);

apiRouter.get("/api/current-registrations", 
  middlewares.mahasiswaAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.bookings.getCurrentRegistrations
);

apiRouter.get("/api/qrcode", 
  middlewares.mahasiswaAuthorization.authorize,
  controllers.api.qrCode.getQRCode
);
/**
 * @Upload Resources
 */
apiRouter.put(
  "/api/citizens/picture/:id/cloudinary",
  uploadOnMemory.single("picture"),
  controllers.api.images.uploadPhoto,
);

apiRouter.post(
  "/api/mahasiswa/qrcode",
  middlewares.mahasiswaAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.qrCode.getQRCode,
)


// /**
//  * @Examinations Resources 
//  */

// apiRouter.get("/api/examinations",
//   middlewares.patientAuthorization.authorize || middlewares.adminAuthorization.authorize,
//   controllers.api.examinations.getAllExamination
// );

// apiRouter.get("/api/examinations/:id",
//   middlewares.patientAuthorization.authorize || middlewares.adminAuthorization.authorize,
//   controllers.api.examinations.getExaminations
// );

// /**
//  * @Notifications Resources 
//  */

// apiRouter.get("/api/notifications",
// middlewares.adminAuthorization.authorize,
// controllers.api.notifications.getAllNotification
// );

// /**
//  * @API Documentation
//  */

// apiRouter.get('/documentation.json', (req, res) => res.send(swaggerDocument));
// apiRouter.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;