const { authJwt } = require("../middleware");
const Technical = require("../controllers/technical.controller");
const tesController = require("../controllers/test.controller");
const statePIC = require("../controllers/state/state_organisator.controller");
const UserController = require("../controllers/user/user_mgmt.controller");
const MailController = require("../controllers/mail/mail.controller");
const { technical } = require("../models");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get(
        "/api/tech/db_server",
        Technical.getIsDatabaseOnline
    )

    app.get(
        "/api/tech/node_server",
        Technical.getIsServerOnline
    )
    
    /*
    app.post(
      "/api/tech/get_array",
      Technical.getArray
    )
    */

    app.get(
      "/api/test/all", 
      tesController.allAccess
    );

    app.get(
      "/api/test/maba",
      [authJwt.verifyToken],
      tesController.mabaBoard
    );

    app.get(
      "/api/test/ukm",
      [authJwt.verifyToken, authJwt.isUKM],
      tesController.ukmBoard
    )
  
    app.get(
      "/api/test/panitia",
      [authJwt.verifyToken, authJwt.isPanitia],
      tesController.panitiaBoard
    );

    app.get(
      "/api/test/acara",
      [authJwt.verifyToken, authJwt.isAcara],
      tesController.acaraBoard
    )

    app.get(
      "/api/test/bph",
      [authJwt.verifyToken, authJwt.isBPH],
      tesController.bphBoard
    )
  
    app.get(
      "/api/test/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      tesController.adminBoard
    );
  
    app.get(
      "/api/test/AdminPanit",
      [authJwt.verifyToken, authJwt.isPanitiaOrAdmin],
      tesController.panitAdminBoard
    );
    
    app.get(
      "/api/tech/error_logs",
      Technical.viewErrorLogs
    )

    app.post(
      "/api/tech/regis_state",
      Technical.registerState
    )

    app.post(
      "/api/tech/email_test",
      MailController.welcomeEmail
    )
  };