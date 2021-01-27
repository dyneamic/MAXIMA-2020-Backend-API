const { authJwt } = require("../../middleware");
const stateUKMController = require("../../controllers/state/state_organisator.controller");
const stateController = require("../../controllers/state/state.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post(
      "/api/ukm/state/view_state",
      [authJwt.verifyToken, authJwt.isUKM],
      stateUKMController.viewStatePIC
    )

    app.get(
      "/api/ukm/state/all_state_details",
      [authJwt.verifyToken, authJwt.isUKM],
      stateController.getAllStateFull
    )

    app.post(
      "/api/ukm/state/get_state_details",
      [authJwt.verifyToken, authJwt.isUKM],
      stateController.getStateDetails
    )

    app.post(
      "/api/ukm/state/view_registered",
      [authJwt.verifyToken, authJwt.isUKM],
      stateController.viewRegistered
    )
  };