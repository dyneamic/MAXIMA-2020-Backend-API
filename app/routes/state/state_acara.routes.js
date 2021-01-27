const { authJwt } = require("../../middleware");
const stateController = require("../../controllers/state/state.controller"); //panit / admin
const statePICController = require("../../controllers/state/state_organisator.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    //state untuk admin
    app.get(
      "/api/acara/state/all_state_details",
      [authJwt.verifyToken, authJwt.isAcara],
      stateController.getAllStateFull
    )

    app.post(
      "/api/acara/state/get_state_details",
      [authJwt.verifyToken, authJwt.isAcara],
      stateController.getStateDetails
    )
    
    app.post(
      "/api/acara/state/add_state",
      [authJwt.verifyToken, authJwt.isAcara],
      stateController.addState
    )

    app.post(
      "/api/acara/state/edit_state",
      [authJwt.verifyToken, authJwt.isAcara],
      stateController.editState
    )

    app.post(
      "/api/acara/state/view_registered",
      [authJwt.verifyToken, authJwt.isAcara],
      stateController.viewRegistered
    )

    //UKM PIC
    app.post(
      "/api/acara/state/pic/add_pic",
      [authJwt.verifyToken, authJwt.isAcara],
      statePICController.addUKMPIC
    )

    app.post(
      "/api/acara/state/pic/edit_pic",
      [authJwt.verifyToken, authJwt.isAcara],
      statePICController.editUKMPIC
    )

    app.get(
      "/api/acara/state/pic/all_pic",
      [authJwt.verifyToken, authJwt.isAcara],
      statePICController.viewPICUKM
    )
  };