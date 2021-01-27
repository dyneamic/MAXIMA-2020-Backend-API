const db = require("../../models");
const KegiatanState = db.kegiatanState;
const PresensiState = db.presensiState;
const User = db.user;
const techControl = require("../technical.controller");

const Op = db.Sequelize.Op;

//Panit / Admin
exports.getAllStateFull = (req,res) => {
  KegiatanState.findAll(
    {
      attributes: ['state_id', 'name', 'day', 'room', 'duration', 'quota', 'registered', 'kategori', 'kode_presensi', 'link_logo']
    }
  )
  .then(function(response) {
    res.json(response);
  })
  .catch(err => {
    kode_error = 230100;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Main", "Get All STATE", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

//Detail State
exports.getStateDetails = (req,res) => {
  KegiatanState.findAll(
    {
      where: {
          state_id: req.body.state_id
      },
      attributes: ['state_id', 'name', 'day', 'room', 'duration', 'quota', 'kategori', 'kode_presensi', 'link_logo']
  })
  .then(function(response) {
    res.json(response);
  })
  .catch(err => {
    kode_error = 230200;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Main", "Get STATE Details", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

//Menambah Kegiatan State
//auto increment ALTER TABLE kegiatan_states AUTO_INCREMENT=0
exports.addState = (req,res) => {
    var generateCode = req.body.name.substring(0,2).toUpperCase();
    var randomNumber1 = Math.floor((Math.random() * 899) + 10);
    //var randomNumber2 = Math.floor((Math.random() * 89) + 10);
    KegiatanState.create(
      {
        name: req.body.name,
        day: req.body.day,
        room: req.body.room,
        duration: req.body.duration,
        quota: req.body.quota,
        registered: 0,
        kategori: req.body.kategori,
        link_logo: req.body.link_logo,
        kode_presensi: generateCode + 'A' + randomNumber1
      }
    )
    .then(function(rowsUpdated) {
      res.status(200).send({ message: "Berhasil ditambah! "});
    })
    .catch(err => {
      kode_error = 230300;
      techControl.addErrorLog(kode_error, "Controller", "STATE - Main", "Add STATE", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
}

//EditState
exports.editState = (req,res) => {
    KegiatanState.update(
      {
        name: req.body.name,
        day: req.body.day,
        room: req.body.room,
        duration: req.body.duration,
        quota: req.body.quota,
        kategori: req.body.kategori,
        link_logo: req.body.link_logo,
        kode_presensi: req.body.kode_presensi
      },
      {
        where: { state_id: req.body.state_id }
      }
    )
    .then(function(rowsUpdated) {
      res.status(200).send({ message: "Berhasil diubah! "});
    })
    .catch(err => {
      kode_error = 230400;
      techControl.addErrorLog(kode_error, "Controller", "STATE - Main", "Edit STATE", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
}

//RemoveState
exports.deleteState = (req,res) => {
    KegiatanState.destroy(
        {
            where: { state_id: req.body.state_id }
        }
    )
    .then(function(response) {
      res.status(200).send({ message: "Berhasil dihapus! "});
    })
    .catch(err => {
      kode_error = 230500;
      techControl.addErrorLog(kode_error, "Controller", "STATE - Main", "Delete STATE", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
}

//terdaftar
exports.viewRegistered = (req,res) => {
  PresensiState.findAll(
  {
      where: { 
      state_id: req.body.state_id
      },
      attributes: ['nim']
  })
  .then(function(presensi) {
      var JSON_PRESENSI = JSON.stringify(presensi);
      var JSONify_1 = JSON.parse(JSON_PRESENSI);
      var i = 0;
      var str_arr = [];
      for (i = 0; i < JSONify_1.length; i++) {
      str_arr[i] = parseInt(JSONify_1[i].nim);
      }
      PresensiState.findAll({
        where: {
            state_id: req.body.state_id
        },
        attributes: ['nim', 'attendance'],
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
        kode_error = 230602;
        techControl.addErrorLog(kode_error, "Controller", "STATE - Main", "View Registered Students", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
      });
  })
  .catch(err => {
    kode_error = 230601;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Main", "View Registered Students", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}