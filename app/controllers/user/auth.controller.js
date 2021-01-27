const db = require("../../models");
const config = require("../../config/auth.config");
const User = db.user;
const Role = db.role;
const UserRoles = db.user_roles;
const MailController = require("../mail/mail.controller");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  /*
  if ((req.body.nim < 42500) && (req.body.roles == "maba")) {
    res.status(500).send({ message: "Pendaftaran akun MAXIMA hanya diperbolehkan untuk Mahasiswa Baru UMN Angkatan 2020. Jika terjadi kesalahan, mohon menghubungi pihak MAXIMA melalui LINE ataupun Instagram." });
  }
  else if ((req.body.nim > 42500) && (req.body.roles != "maba")) {
    res.status(500).send({ message: "Pendaftaran akun organisator tidak diperbolehkan untuk Mahasiswa Baru UMN Angkatan 2020. Jika terjadi kesalahan, mohon menghubungi pihak MAXIMA melalui LINE ataupun Instagram."});
  }
  else {
    // Save User to Database
    User.create({
      nim: req.body.nim,
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      instagram: req.body.instagram
    })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: req.body.roles
          },
          attributes: ['id']
        }).then(function(role_id) {
          var int_id = role_id[0];
          var int_id = parseInt(int_id['id']);
          UserRoles.create({
            nim: req.body.nim,
            roleId: int_id
          })
          .then(() => {
            //if (int_id == 1) 
            MailController.welcomeEmail(req.body.name, req.body.email);
            res.send({ message: "User was registered successfully!" });
          })
        })
        ///* ini klo yg tipe lama langsung dr sequelize
          roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
        //*/
      //} else {
        // user role = 1
        /* tipe lama sequelize 
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
        //hrsny komen 
        UserRoles.create({
          nim: req.body.nim,
          roleId: 1
        })
        .then(() => {
          MailController.welcomeEmail(req.body.name, req.body.email);
          res.send({ message: "User was registered successfully!" });
        })
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  }
  */
  res.status(500).send({ message: "Maaf, registrasi akun MAXIMA 2020 telah ditutup. Silakan hubungi pihak MAXIMA melalui Instagram atau OA Line untuk mendapatkan bantuan lebih lanjut."});
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      nim: req.body.nim
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    UserRoles.findAll({
      where: {
        nim: req.body.nim
      },
      attributes: ['roleId']
    })
    .then(function(response) {
      var roleArray = [];
      for (i = 0; i < response.length; i++) {
        roleArray[i] = parseInt(response[i].roleId);
      }

      var token = jwt.sign({ nim: user.nim, roles: roleArray }, config.secret, {
        expiresIn: 3600 // 1 hour
      });
  
      var authorities = [];
  
      res.status(200).send({
        accessToken: token,
        name: user.name
      })
    })

    

    /*
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        nim: user.nim,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
    */
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
