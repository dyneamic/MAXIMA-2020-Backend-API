const { authJwt } = require("../middleware");
const stateController = require("../controllers/state.controller"); //panit / admin

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    //state untuk maba

    //state untuk panit / admin
    app.get(
      "/api/state/all_state_details",
      [authJwt.verifyToken, authJwt.isPanitiaOrAdmin],
      stateController.getAllStateFull
    )

    app.post(
      "/api/state/get_state_details",
      [authJwt.verifyToken, authJwt.isPanitiaOrAdmin],
      stateController.getStateDetails
    )
    
    app.post(
      "/api/state/add_state",
      [authJwt.verifyToken, authJwt.isPanitiaOrAdmin],
      stateController.addState
    )

    app.post(
      "/api/state/edit_state",
      [authJwt.verifyToken, authJwt.isPanitiaOrAdmin],
      stateController.editState
    )

    app.post(
      "/api/state/delete_state",
      [authJwt.verifyToken, authJwt.isPanitiaOrAdmin],
      stateController.deleteState
    )

    app.post(
      "/api/state/view_registered",
      [authJwt.verifyToken, authJwt.isPanitiaOrAdmin],
      stateController.viewRegistered
    )
  };