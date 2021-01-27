const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // NIM
  User.findOne({
    where: {
      nim: req.body.nim
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! NIM is already in use!"
      });
      return;
    }
    else {
      // Email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
      next(); //karena klo g mentok
      })
    }
    //});
   //next(); 
  });
};

/*
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles
        });
        return;
      }
    }
  }
  
  next();
};
*/

/*
JSON MUlti-Role
{
    "nim": 11113,
    "name": "Mantap",
    "email": "mantap@mxm.umn.ac.id",
    "roles": ["panitia", "admin"],
    "password": "12345678"
}
*/

/* CheckRolesExisted - Last Known Good Configuration
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles
        });
        return;
      }
    }
  }
  
  next();
};
*/

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    var test = false;
    //for (let i = 0; i < req.body.roles.length; i++) {
      for (let i = 0; i < ROLES.length; i++) {
        if (ROLES[i] == req.body.roles) test = true;
      }
      if (test == false) {
        res.status(400).send({
          message: "Failed! Role does not exists = " + req.body.roles
        });
        return;
      }
    //}
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
