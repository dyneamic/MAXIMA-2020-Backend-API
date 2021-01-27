const { authJwt } = require("../../middleware");
const stateController = require("../../controllers/state/state.controller"); //panit / bph
const statePICController = require("../../controllers/state/state_organisator.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    //state untuk bph
    app.get(
      "/api/bph/state/all_state_details",
      [authJwt.verifyToken, authJwt.isBPH],
      stateController.getAllStateFull
    )

    app.post(
      "/api/bph/state/get_state_details",
      [authJwt.verifyToken, authJwt.isBPH],
      stateController.getStateDetails
    )

    app.post(
      "/api/bph/state/view_registered",
      [authJwt.verifyToken, authJwt.isBPH],
      stateController.viewRegistered
    )

    app.get(
      "/api/bph/state/pic/all_pic",
      [authJwt.verifyToken, authJwt.isBPH],
      statePICController.viewPICUKM
    )
  };