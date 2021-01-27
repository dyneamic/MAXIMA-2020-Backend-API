const { authJwt } = require("../../middleware");
const accountController = require("../../controllers/user/user.controller");
const userMgmtController = require("../../controllers/user/user_mgmt.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //admin
  app.post(
    "/api/admin/add_user_role",
    [authJwt.verifyToken, authJwt.isAdmin],
    userMgmtController.addUserRole
  )
  
  app.get(
    "/api/admin/user/all_maba",
    [authJwt.verifyToken, authJwt.isAdmin],
    userMgmtController.getAllMaba
  )

  app.get(
    "/api/acara/user/all_maba",
    [authJwt.verifyToken, authJwt.isAcara],
    userMgmtController.getAllMaba
  )

  app.get(
    "/api/bph/user/all_maba",
    [authJwt.verifyToken, authJwt.isBPH],
    userMgmtController.getAllMaba
  )

  app.get(
    "/api/admin/user/all_pic_ukm",
    [authJwt.verifyToken, authJwt.isAdmin],
    userMgmtController.getAllUKMPIC
  )

  app.get(
    "/api/acara/user/all_pic_ukm",
    [authJwt.verifyToken, authJwt.isAcara],
    userMgmtController.getAllUKMPIC
  )

  //all
  app.post(
    "/api/user/get_credentials",
    [authJwt.verifyToken],
    accountController.getCredentials
  );

  app.post(
    "/api/user/update_credentials",
    [authJwt.verifyToken],
    accountController.updateCredentials
  )

  app.post(
    "/api/user/update_password",
    [authJwt.verifyToken],
    accountController.updatePassword
  )

  app.post(
    "/api/user/create_otp_reset_pass",
    accountController.createPassResetOTP
  )

  app.post(
    "/api/user/resetPassword",
    accountController.resetPassword
  )
};
