const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const UserRoles = db.user_roles;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Invalid or expired token. Please login again."
      });
    }
    req.nim = decoded.nim; //nim awalny userId
    next();
  });
};

isAdmin = (req, res, next) => {
  UserRoles.findAll({
    where: {
      nim: req.nim
    },
    attributes: ['roleId']
  })
  .then(function(response) {
    var roleArray = [];
    for (i = 0; i < response.length; i++) {
      roleArray[i] = parseInt(response[i].roleId);
    }
    for (let i = 0; i < roleArray.length; i++) {
      if (parseInt(roleArray[i]) == 6) {
        next();
        return;
      }
    }
    
    res.status(403).send({
      message: "Require Admin Role!"
    });
    return;
  })
};

isBPH = (req, res, next) => {
  UserRoles.findAll({
    where: {
      nim: req.nim
    },
    attributes: ['roleId']
  })
  .then(function(response) {
    var roleArray = [];
    for (i = 0; i < response.length; i++) {
      roleArray[i] = parseInt(response[i].roleId);
    }
    for (let i = 0; i < roleArray.length; i++) {
      if (parseInt(roleArray[i]) == 5) {
        next();
        return;
      }
    }
    
    res.status(403).send({
      message: "Require BPH Role!"
    });
    return;
  })
};

isAcara = (req, res, next) => {
  UserRoles.findAll({
    where: {
      nim: req.nim
    },
    attributes: ['roleId']
  })
  .then(function(response) {
    var roleArray = [];
    for (i = 0; i < response.length; i++) {
      roleArray[i] = parseInt(response[i].roleId);
    }
    for (let i = 0; i < roleArray.length; i++) {
      if (parseInt(roleArray[i]) == 4) {
        next();
        return;
      }
    }
    
    res.status(403).send({
      message: "Require Panitia Acara Role!"
    });
    return;
  })
};


isUKM = (req, res, next) => {
  UserRoles.findAll({
    where: {
      nim: req.nim
    },
    attributes: ['roleId']
  })
  .then(function(response) {
    var roleArray = [];
    for (i = 0; i < response.length; i++) {
      roleArray[i] = parseInt(response[i].roleId);
    }
    for (let i = 0; i < roleArray.length; i++) {
      if (parseInt(roleArray[i]) == 3) {
        next();
        return;
      }
    }
    
    res.status(403).send({
      message: "Require UKM / Organisator Role!"
    });
    return;
  })
};

isPanitia = (req, res, next) => {
  UserRoles.findAll({
    where: {
      nim: req.nim
    },
    attributes: ['roleId']
  })
  .then(function(response) {
    var roleArray = [];
    for (i = 0; i < response.length; i++) {
      roleArray[i] = parseInt(response[i].roleId);
    }
    for (let i = 0; i < roleArray.length; i++) {
      if (parseInt(roleArray[i]) == 2) {
        next();
        return;
      }
    }
    
    res.status(403).send({
      message: "Require Panitia Role!"
    });
    return;
  })
};

isPanitiaOrAdmin = (req, res, next) => {
  User.findByPk(req.nim).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "panitia") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Panitia or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isBPH: isBPH,
  isAcara: isAcara,
  isPanitia: isPanitia,
  isUKM: isUKM,
  isPanitiaOrAdmin: isPanitiaOrAdmin
};
module.exports = authJwt;
