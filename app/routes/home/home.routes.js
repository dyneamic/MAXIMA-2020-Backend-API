const { authJwt } = require("../../middleware");
const homeController = require("../../controllers/home/home_data_mgmt.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    //Admin
    app.post(
      "/api/admin/home/add_home",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.addHome
    )

    app.post(
      "/api/admin/home/add_home_media",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.addHomeMedia
    )

    app.get(
      "/api/admin/home/all_home",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.getAllHome
    )

    app.post(
      "/api/admin/home/get_home_details",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.getHomeDetails
    )
    
    app.post(
      "/api/admin/home/get_media_details",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.getMediaDetails
    )

    app.post(
      "/api/admin/home/update_home",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.updateHomeDetails
    )

    app.post(
      "/api/admin/home/update_home_media",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.updateHomeMedia
    )

    app.post(
      "/api/admin/home/delete_home",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.deleteHome
    )

    app.post(
      "/api/admin/home/delete_home_media",
      [authJwt.verifyToken, authJwt.isAdmin],
      homeController.deleteHomeMedia
    )
    
    //acara
    app.post(
      "/api/acara/home/add_home",
      [authJwt.verifyToken, authJwt.isAcara],
      homeController.addHome
    )

    app.post(
      "/api/acara/home/add_home_media",
      [authJwt.verifyToken, authJwt.isAcara],
      homeController.addHomeMedia
    )

    app.get(
      "/api/acara/home/all_home",
      [authJwt.verifyToken, authJwt.isAcara],
      homeController.getAllHome
    )

    app.post(
      "/api/acara/home/get_home_details",
      [authJwt.verifyToken, authJwt.isAcara],
      homeController.getHomeDetails
    )
    
    app.post(
      "/api/acara/home/get_media_details",
      [authJwt.verifyToken, authJwt.isAcara],
      homeController.getMediaDetails
    )

    app.post(
      "/api/acara/home/update_home",
      [authJwt.verifyToken, authJwt.isAcara],
      homeController.updateHomeDetails
    )

    app.post(
      "/api/acara/home/update_home_media",
      [authJwt.verifyToken, authJwt.isAcara],
      homeController.updateHomeMedia
    )

    app.post(
      "/api/acara/home/delete_home_media",
      [authJwt.verifyToken, authJwt.isAcara],
      homeController.deleteHomeMedia
    )
    
    //Public
    app.get(
      "/api/public/home/all_home",
      homeController.getAllHome
    )
    
    app.get(
      "/api/public/home/get_home_query",
      homeController.publicGetHomeByQuery
    )
  };