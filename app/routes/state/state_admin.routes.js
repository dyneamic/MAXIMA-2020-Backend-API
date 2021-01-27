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
      "/api/admin/state/all_state_details",
      [authJwt.verifyToken, authJwt.isAdmin],
      stateController.getAllStateFull
    )

    app.post(
      "/api/admin/state/get_state_details",
      [authJwt.verifyToken, authJwt.isAdmin],
      stateController.getStateDetails
    )
    
    app.post(
      "/api/admin/state/add_state",
      [authJwt.verifyToken, authJwt.isAdmin],
      stateController.addState
    )

    app.post(
      "/api/admin/state/edit_state",
      [authJwt.verifyToken, authJwt.isAdmin],
      stateController.editState
    )

    app.post(
      "/api/admin/state/delete_state",
      [authJwt.verifyToken, authJwt.isAdmin],
      stateController.deleteState
    )

    app.post(
      "/api/admin/state/view_registered",
      [authJwt.verifyToken, authJwt.isAdmin],
      stateController.viewRegistered
    )

    //UKM PIC
    app.get(
      "/api/admin/state/pic/all_pic",
      [authJwt.verifyToken, authJwt.isAdmin],
      statePICController.viewPICUKM
    )
    
    app.post(
      "/api/admin/state/pic/add_pic",
      [authJwt.verifyToken, authJwt.isAdmin],
      statePICController.addUKMPIC
    )

    app.post(
      "/api/admin/state/pic/edit_pic",
      [authJwt.verifyToken, authJwt.isAdmin],
      statePICController.editUKMPIC
    )

    app.post(
      "/api/admin/state/pic/remove_pic",
      [authJwt.verifyToken, authJwt.isAdmin],
      statePICController.removeUKMPIC
    )
  };