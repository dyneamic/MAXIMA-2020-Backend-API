const db = require("../../models");
const User = db.user;
const UserRoles = db.user_roles;

const Op = db.Sequelize.Op;

//liat semua role tambahan 
exports.viewAddedRoles = (req,res) => {
    UserRoles.findAll({
        where: {
            roleId: { [Op.gt]: 2 }
        },
        attributes: ['nim', 'roleId'],
        include: [
            {
                model: User,
                where: { nim: str_arr },
                attributes: ['name']
            }
        ]
    })
    .then(function(response) {
        res.json(response);
    })
    .catch(err => {
        kode_error = 520100;
        techControl.addErrorLog(kode_error, "Controller", "User", "View Added Roles", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
}
//tambah role
exports.addUserRole = (req,res) => {
    UserRoles.create({
        nim: req.body.nim,
        roleId: req.body.roleId
    })
    .then(function(rowsUpdated) {
        res.json(rowsUpdated);
    })
    .catch(err => {
        kode_error = 520200;
        techControl.addErrorLog(kode_error, "Controller", "User", "Add Role", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
}

//edit role
exports.editUserRole = (req,res) => {
    UserRoles.update(
    {
        roleId: req.body.roleId
    },
    {
        where: {
            nim: req.body.nim
        }
    })
    .then(function(response) {
        res.json(response);
    })
    .catch(err => {
        kode_error = 520300;
        techControl.addErrorLog(kode_error, "Controller", "User", "Edit Role", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
}

//delete additional role
exports.deleteAddedRole = (req,res) => {
    UserRoles.destroy({
        where: {
            nim: req.body.nim,
            roleId: req.body.roleId
        }
    })
    .catch(err => {
        kode_error = 520400;
        techControl.addErrorLog(kode_error, "Controller", "User", "Delete Role", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
}

exports.getAllMaba = (req, res) => {
    UserRoles.findAll({
        where: {
            roleId: 1
        },
        attributes: ['nim']
    })
    .then(function (response) {
      var nim_arr = [];
      for (i = 0; i < response.length; i++) {
        nim_arr[i] = parseInt(response[i].nim);
      }
      User.findAll({
        where: {
          nim: nim_arr
        },
        attributes: ['nim', 'name', 'email', 'instagram']
      })
      .then(function(response) {
          res.json(response);
      })
      .catch(err => {
        kode_error = 520502;
        techControl.addErrorLog(kode_error, "Controller", "User", "Get All Maba", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
      });
    })
    .catch(err => {
        kode_error = 520501;
        techControl.addErrorLog(kode_error, "Controller", "User", "Get All Maba", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
  }

exports.getAllUKMPIC = (req, res) => {
    UserRoles.findAll({
        where: {
            roleId: 3
        },
        attributes: ['nim']
    })
    .then(function (response) {
      var nim_arr = [];
      for (i = 0; i < response.length; i++) {
        nim_arr[i] = parseInt(response[i].nim);
      }
      User.findAll({
        where: {
          nim: nim_arr
        },
        attributes: ['nim', 'name', 'email', 'instagram']
      })
      .then(function(response) {
          res.json(response);
      })
      .catch(err => {
        kode_error = 520602;
        techControl.addErrorLog(kode_error, "Controller", "User", "Get All PIC UKM", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
    })
    .catch(err => {
        kode_error = 520601;
        techControl.addErrorLog(kode_error, "Controller", "User", "Get All PIC UKM", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
  }