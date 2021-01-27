const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//start for sign in and sign up//
db.user = require("../models/user/user.model.js")(sequelize, Sequelize);
db.role = require("../models/user/role.model.js")(sequelize, Sequelize);
db.passwordReset = require("../models/user/passwordReset.model.js")(sequelize, Sequelize);

/*
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "nim"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "nim",
  otherKey: "roleId"
});
*/
db.user_roles = require("../models/user/user_roles.model")(sequelize, Sequelize);

db.ROLES = ["maba", "panitia", "ukm", "acara", "bph", "admin"];

//end for sign in and sign up//

//start of state
db.kegiatanState = require("../models/state/kegiatanState.model")(sequelize, Sequelize);
db.presensiState = require("../models/state/presensiState.model")(sequelize, Sequelize);

db.user.hasMany(db.presensiState, { foreignKey: 'nim' });
db.kegiatanState.hasMany(db.presensiState, { foreignKey: 'state_id' });
db.presensiState.belongsTo(db.user, {foreignKey: 'nim'});
db.presensiState.belongsTo(db.kegiatanState, { foreignKey: 'state_id'});

db.picUKM = require("../models/state/picUKM.model")(sequelize,Sequelize);
db.user.hasMany(db.picUKM, { foreignKey: 'nim' });
db.picUKM.belongsTo(db.user, {foreignKey: 'nim'});
db.kegiatanState.hasMany(db.picUKM, { foreignKey: 'state_id' });
db.picUKM.belongsTo(db.kegiatanState, { foreignKey: 'state_id'}); 
//end of state

//start of home
db.daftarHome = require("../models/home/daftarHome.model")(sequelize, Sequelize);
db.mediaHome = require("../models/home/mediaHome.model")(sequelize, Sequelize);
db.daftarHome.hasMany(db.mediaHome, { foreignKey: 'home_id' });
db.mediaHome.belongsTo(db.daftarHome, {foreignKey: 'home_id'});
//end of home

//survey//
db.surveyQuestion = require("../models/survey/questions.model")(sequelize, Sequelize);
db.surveyResponse = require("../models/survey/responses.model")(sequelize, Sequelize);
//end of survey

//technical
db.technical = require("../models/technical/technical.model")(sequelize,Sequelize);
db.errorLogs = require("../models/technical/error_logs.model")(sequelize, Sequelize);
//end of technical

module.exports = db;
