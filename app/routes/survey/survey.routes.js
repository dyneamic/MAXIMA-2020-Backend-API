const { authJwt } = require("../../middleware");
const surveyController = require("../../controllers/survey/survey.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });


    //admin acara bph
    app.get(
      "/api/admin/survey/responses",
      [authJwt.verifyToken, authJwt.isAdmin],
      surveyController.viewAllResponse
    )

    app.get(
      "/api/acara/survey/responses",
      [authJwt.verifyToken, authJwt.isAcara],
      surveyController.viewAllResponse
    )

    app.get(
      "/api/bph/survey/responses",
      [authJwt.verifyToken, authJwt.isBPH],
      surveyController.viewAllResponse
    )

    //maba
    app.post(
      "/api/student/survey/submit_survey",
      [authJwt.verifyToken],
      surveyController.addResponse
    )
  };