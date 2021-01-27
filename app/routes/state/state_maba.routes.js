const { authJwt } = require("../../middleware");
const stateMabaController = require("../../controllers/state/state_maba.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    app.get(
      "/api/student/state/all_state",
      [authJwt.verifyToken],
      stateMabaController.getAllState
    )

    app.post(
      "/api/student/state/state_details",
      [authJwt.verifyToken],
      stateMabaController.getStateDetails
    )

    app.post(
      "/api/student/state/registered_state",
      [authJwt.verifyToken],
      stateMabaController.getRegisteredState
    )

    app.post(
      "/api/student/state/register_state",
      [authJwt.verifyToken],
      stateMabaController.registerState
    )

    app.post(
      "/api/student/state/deregister_state",
      [authJwt.verifyToken],
      stateMabaController.deRegisterState
    )

    app.post(
      "/api/student/state/state_checkin",
      [authJwt.verifyToken],
      stateMabaController.checkInState
    )
    
    /*
    app.post(
      "/api/student/state/state_checkout",
      [authJwt.verifyToken],
      stateMabaController.checkOutState
    )
    */
  };