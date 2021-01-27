const db = require("../../models");
const User = db.user;
const PassReset = db.passwordReset;
const UserRoles = db.user_roles;
const MailController = require("../mail/mail.controller");

const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

//email preparation
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'jaiden50@ethereal.email',
      pass: 'R2qdHCmYpKvqhzC1nd'
  }
});

//get credentials 
exports.getCredentials = (req, res) => {
  User.findAll({
    where: { nim: req.body.nim },
    attributes: ['nim', 'name', 'email', 'instagram']
  })
  .then(function(result) {
    res.json(result);
  })
  .catch(err => {
    kode_error = 530100;
    techControl.addErrorLog(kode_error, "Controller", "User", "Get Credentials", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
};

//update data
exports.updateCredentials = (req, res) => {
  User.update(
    { 
      name: req.body.name,
      email: req.body.email,
      instagram: req.body.instagram
    },
    {
      where: {nim: req.body.nim} 
    }
  )
  .then(function(rowsUpdated) {
    res.json(rowsUpdated);
  })
  .catch(err => {
    kode_error = 530200;
    techControl.addErrorLog(kode_error, "Controller", "User", "Update Credentials", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
};

//update password
exports.updatePassword = (req,res) => {
  User.update(
    {
      password: bcrypt.hashSync(req.body.password, 8)
    },
    {
      where: {nim: req.body.nim} 
    }
  )
  .then(function(rowsUpdated) {
    res.json(rowsUpdated);
  })
  .catch(err => {
    kode_error = 530300;
    techControl.addErrorLog(kode_error, "Controller", "User", "Update Password", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

//create otp
exports.createPassResetOTP = (req,res) => {
  var randomOTP = '';
  var characters = '0123456789';
  var charactersLength = 6;
  for ( var i = 0; i < 6; i++ ) {
    randomOTP += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(randomOTP);
  User.count({
    where: {
      nim: req.body.nim
    }
  })
  .then(function(found0) {
    if (found0 == 0) {
      return res.status(404).send({ message: "NIM Not Found." });
    } 
    else {
      User.findAll({
        where: { nim: req.body.nim },
        attributes: ['email', 'name']
      })
      .then(function(response) {
        var query_name = response[0].name;
        var query_email = response[0].email;
        PassReset.count({
          where: {
            nim: req.body.nim
          }
        })
        .then(function(found1) {
          if (found1 == 0) {
            PassReset.create({
              nim: req.body.nim,
              otp: randomOTP,
              expired: 0
            })
            .then(function(response) {
              MailController.resetOTP(query_name, query_email, randomOTP);
              res.status(200).send({ message: "OTP Berhasil Dibuat! "});
            })
            .catch(err => {
              kode_error = 530405;
              techControl.addErrorLog(kode_error, "Controller", "User", "Create OTP", err.message);
              res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
            });
          } 
          else {
            PassReset.update({
              otp: randomOTP,
              expired: 0
            }, 
            {
              where: { nim: req.body.nim }
            })
            .then(function() {
              MailController.resetOTP(query_name, query_email, randomOTP);
              res.status(200).send({ message: "OTP Berhasil Dibuat! "});
            })
            .catch(err => {
              kode_error = 530404;
              techControl.addErrorLog(kode_error, "Controller", "User", "Create OTP", err.message);
              res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
            });
          }
        })
        .catch(err => {
          kode_error = 530403;
          techControl.addErrorLog(kode_error, "Controller", "User", "Create OTP", err.message);
          res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
        });
      })
      .catch(err => {
        kode_error = 530402;
        techControl.addErrorLog(kode_error, "Controller", "User", "Create OTP", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
      });
    }
  })
  .catch(err => {
    kode_error = 530401;
    techControl.addErrorLog(kode_error, "Controller", "User", "Create OTP", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

//update password with otp
exports.resetPassword = (req, res) => {
  PassReset.count({
    where: {
      nim: req.body.nim
    }
  })
  .then(function(found1) {
    if (found1 == 0) {
      return res.status(404).send({ message: "Password Reset Request Not Found." });
    } else {
      PassReset.count({
        where: {
          nim: req.body.nim,
          otp: req.body.otp
        }
      })
      .then(function(found2) {
        if (found2 == 0) {
          return res.status(404).send({ message: "Invalid OTP." });
        }
        else {
          PassReset.count({
            where: {
              nim: req.body.nim,
              otp: req.body.otp,
              expired: 0
            }
          }).
          then(function(found3) {
            //cek apakah otp expired
            if (found3 == 0) {
              return res.status(404).send({ message: "OTP Expired." });
            }
            else {
              //update password
              User.update(
                {
                  password: bcrypt.hashSync(req.body.password, 8)
                },
                {
                  where: {nim: req.body.nim} 
                }
              )
              .then(function(rowsUpdated) {
                if (rowsUpdated == 1) {
                  PassReset.update(
                    {
                      expired: 1
                    },
                    {
                      where: { nim: req.body.nim}
                    }
                  )
                  .then(function() {
                    return res.status(200).send({ message: "Password Updated." });
                  })
                  .catch(err => {
                    kode_error = 530505;
                    techControl.addErrorLog(kode_error, "Controller", "User", "Reset Password", err.message);
                    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
                  });
                }
              })
              .catch(err => {
                kode_error = 530504;
                techControl.addErrorLog(kode_error, "Controller", "User", "Reset Password", err.message);
                res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
              });
            }
          })
          .catch(err => {
            kode_error = 530503;
            techControl.addErrorLog(kode_error, "Controller", "User", "Reset Password", err.message);
            res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
          });
        }
      })
      .catch(err => {
        kode_error = 530502;
        techControl.addErrorLog(kode_error, "Controller", "User", "Reset Password", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
      });
    }
  })
  .catch(err => {
    kode_error = 530501;
    techControl.addErrorLog(kode_error, "Controller", "User", "Reset Password", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}