const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

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
  User.findByPk(req.nim).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isBPH = (req, res, next) => {
  User.findByPk(req.nim).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "bph") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require BPH Role!"
      });
      return;
    });
  });
};

isAcara = (req, res, next) => {
  User.findByPk(req.nim).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "acara") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Acara Role!"
      });
      return;
    });
  });
};

isPanitia = (req, res, next) => {
  User.findByPk(req.nim).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "panitia") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Panitia Role!"
      });
    });
  });
};

isUKM = (req, res, next) => {
  User.findByPk(req.nim).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ukm") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require UKM Role!"
      });
    });
  });
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
