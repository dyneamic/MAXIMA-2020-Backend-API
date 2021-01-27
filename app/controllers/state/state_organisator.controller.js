const db = require("../../models");
const { Sequelize } = require("../../models");
const KegiatanState = db.kegiatanState;
const PresensiState = db.presensiState;
const picUKM = db.picUKM;
const User = db.user;
const techControl = require("../technical.controller");

const Op = db.Sequelize.Op;

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

//CRUD UKM PIC
exports.viewPICUKM = (req,res) => {
  picUKM.findAll({
    attributes: ['state_id', 'nim']
  })
  .then(function(response) {
    var nim_arr = [];
    var stateid_arr = [];
    for (i = 0; i < response.length; i++) {
      nim_arr[i] = parseInt(response[i].nim);
    }
    for (i = 0; i < response.length; i++) {
      stateid_arr[i] = parseInt(response[i].state_id);
    }
    picUKM.findAll({
      attributes: ['nim', 'state_id'],
      include: [
        {
            model: User,
            where: { nim: nim_arr },
            attributes: ['name']
        },
        {
            model: KegiatanState,
            where: { state_id: stateid_arr },
            attributes: ['name']
        }
      ]
    })
    .then(function(response) {
      res.json(response);
    })
    .catch(err => {
      kode_error = 220102;
      techControl.addErrorLog(kode_error, "Controller", "STATE - Organisator", "View All Assigned PICs", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
  })
  .catch(err => {
    kode_error = 220101;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Organisator", "View All Assigned PICs", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.addUKMPIC = (req,res) => {
  picUKM.create(
    {
      nim: req.body.nim,
      state_id: req.body.state_id
    }
  )
  .then(function(response) {
    res.status(200).send({ message: "Berhasil ditambah!" });
  })
  .catch(err => {
    kode_error = 220200;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Organisator", "Add New PIC", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.editUKMPIC = (req,res) => {
  picUKM.update(
    {
      state_id: req.body.state_id
    },
    {
      where: { nim: req.body.nim }
    }
  )
  .then(function(rowsUpdated) {
    res.status(200).send({ message: "Berhasil diubah!" });
  })
  .catch(err => {
    kode_error = 220300;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Organisator", "Edit PIC", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.removeUKMPIC = (req,res) => {
  picUKM.destroy(
    {
      where: { nim: req.body.nim, state_id: req.body.state_id }
    }
  )
  .then(function(response) {
    res.status(200).send({ message: "Berhasil dihapus!" });
  })
  .catch(err => {
    kode_error = 220400;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Organisator", "Remove PIC", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}
//end of crud pic ukm

//liat ukm khusus yg di pic
exports.viewStatePIC = (req, res) => {
  picUKM.findAll({
    where: { nim: req.body.nim },
    attributes: ['state_id']
  })
  .then(function(response) {
    var str_arr = [];
    for (i = 0; i < response.length; i++) {
      str_arr[i] = parseInt(response[i].state_id);
    }
    KegiatanState.findAll({
      where: { state_id: str_arr },
      attributes: ['state_id', 'name', 'day', 'room', 'duration', 'quota', 'registered', 'kategori', 'kode_presensi']
    })
    .then(function(response) {
      res.json(response);
    })
    .catch(err => {
      kode_error = 220502;
      techControl.addErrorLog(kode_error, "Controller", "STATE - Organisator", "View Viewable STATE", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
  })
  .catch(err => {
    kode_error = 220501;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Organisator", "View Viewable STATE", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

