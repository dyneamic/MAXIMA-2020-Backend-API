const db = require("../../models");
const { Sequelize } = require("../../models");
const KegiatanState = db.kegiatanState;
const PresensiState = db.presensiState;
const techControl = require("../technical.controller");
const User = db.user;
const MailController = require("../mail/mail.controller");

const Op = db.Sequelize.Op;

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

exports.getAllState = (req,res) => {
    KegiatanState.findAll(
      {
        attributes: ['state_id', 'name', 'day', 'room', 'duration', 'quota', 'registered', 'kategori', 'link_logo']
      }
    )
    .then(function(response) {
      res.json(response);
    })
    .catch(err => {
      kode_error = 210100;
      techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Get All State", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
}

exports.registerState = (req,res) => {
    //cek state apakah benar ada
    KegiatanState.count({
      where: {
        state_id: req.body.state_id
      }
    })
    .then(function(count1) {
      //cek hari state terdaftar
      if (count1 == 0) {
        return res.status(403).send({ message: "STATE tidak ditemukan." });
      }
      else {
        PresensiState.count({
          where: {
            nim: req.body.nim,
            state_id: req.body.state_id
          }
        })
        .then(function(found1) {
          if (found1 == 1) {
            return res.status(403).send({ message: "Anda sudah pernah mendaftar STATE ini." });
          }
          else if (found1 == 0) {
            PresensiState.count({
              where: {
                nim: req.body.nim
              }
            })
            .then(function(count) {
              if (count > 2) {
                return res.status(403).send({ message: "Anda sudah melebihi kuota tiga STATE."});
              }
              else {
                //get state day
                KegiatanState.findAll({
                    where: {
                      state_id: req.body.state_id
                  },
                  attributes: ['day']
                })
                .then(function(JSONify) {
                  var arr0 = JSONify[0];
                  var day_init = arr0.day;
                  //cek apakah ada state yang terdaftar di hari yang sama
                  PresensiState.findAll({
                    where: {
                      nim: req.body.nim
                    },
                    attributes: ['state_id']
                  })
                  .then(function(JSONify_1) {
                    var i = 0;
                    var checker = 0;
                    var str_arr = [];
                    for (i = 0; i < JSONify_1.length; i++) {
                      str_arr[i] = parseInt(JSONify_1[i].state_id);
                    }
                    KegiatanState.findAll({
                      where: {
                        state_id: str_arr
                      },
                      attributes: ['day']
                    })
                    .then(function(JSONify) {
                      if (!isEmptyObject(JSONify)) {
                        for (i = 0; i < JSONify.length; i++) {
                          if (parseInt(day_init) == parseInt(JSONify[i].day)) checker = 1;
                        }
                      }
                      if (checker == 1) {
                        return res.status(403).send({ message: "Anda sudah mendaftar state lain di hari yang sama!" });
                      }
                      else if (checker == 0) {
                        //cek max quota
                        KegiatanState.findAll({
                          where: {
                            state_id: req.body.state_id
                          },
                          attributes: ['name', 'quota', 'registered', 'room', 'day']
                        })
                        .then(function(JSONify_quota) {
                          var arr2 = JSONify_quota[0];
                          var state_name = arr2.name;
                          var state_day = arr2.day;
                          var zoom_link = arr2.room;
                          var quota = arr2.quota;
                          var registered = arr2.registered;
                          if (registered >= quota) {
                            return res.status(403).send({ message: "STATE sudah penuh!" });
                          }
                          else {
                            PresensiState.create({
                              nim: req.body.nim,
                              state_id: req.body.state_id,
                              attendance: 0
                            })
                            .then(function(responseBeforeFinal) {
                              KegiatanState.update(
                                {
                                  registered: Sequelize.literal('registered + 1')
                                },
                                {
                                  where: { state_id: req.body.state_id}
                                })
                              .then(function(responseLast) {
                                User.findAll({
                                  where: { nim: req.body.nim },
                                  attributes: ['name', 'email']
                                })
                                .then(function(response) {
                                  MailController.regisSTATE(response[0].name, response[0].email, state_name, state_day, zoom_link);
                                  res.status(200).send({ message: "Berhasil mendaftar! "});
                                })
                                .catch(err => {
                                  kode_error = 210210;
                                  techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
                                  res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
                                });
                              })
                              .catch(err => {
                                kode_error = 210209;
                                techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
                                res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
                              });
                            })
                            .catch(err => {
                              kode_error = 210208;
                              techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
                              res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
                            });
                          }
                        })
                        .catch(err => {
                          kode_error = 210207;
                          techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
                          res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
                        });
                      }
                    })
                    .catch(err => {
                      kode_error = 210206;
                      techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
                      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
                    });
                  })
                  .catch(err => {
                    kode_error = 210205;
                    techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
                    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
                  });
                })
                .catch(err => {
                  kode_error = 210204;
                  techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
                  res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
                });
              }
            })
            .catch(err => {
              kode_error = 210203;
              techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
              res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
            });
          }
        })
        .catch(err => {
          kode_error = 210202;
          techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
          res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
        });
      }
    })
    .catch(err => {
      kode_error = 210201;
      techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Register State", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
  
  //res.status(500).send({ message: "Pendaftaran STATE telah ditutup. Untuk informasi lebih lanjut, silakan menghubungi pihak MAXIMA melalui LINE ataupun Instagram."});
}

exports.deRegisterState = (req,res) => {
  /*
  PresensiState.findAll({
    where: {
      nim: req.body.nim,
      state_id: req.body.state_id
    },
    attributes: ['attendance']
  })
  .then(function(found1) {
    if (isEmptyObject(found1)) {
      return res.status(403).send({ message: "Anda tidak terdaftar pada STATE ini." });
    }
    else {
      var int_attendance = parseInt(found1[0].attendance);
      if (int_attendance == 1) {
        return res.status(403).send({ message: "Anda sudah melakukan presensi STATE ini." });
      }
      else {
        PresensiState.destroy(
          {
              where: { 
                nim: req.body.nim,
                state_id: req.body.state_id 
              }
          })
        .then(function(response) {
          KegiatanState.update(
            {
              registered: Sequelize.literal('registered - 1')
            },
            {
              where: { state_id: req.body.state_id}
            })
          .then(function(responseLast) {
            KegiatanState.findAll({
              where: { state_id: req.body.state_id },
              attributes: ['name', 'day']
            })
            .then(function(response) {
              var nama_state = response[0].name;
              var hari_state = response[0].day;
              User.findAll({
                where: { nim: req.body.nim },
                attributes: ['name', 'email']
              })
              .then(function(response) {
                MailController.deregisSTATE(response[0].name, response[0].email, nama_state, hari_state);
                res.status(200).send({ message: "Berhasil deregistrasi! "});
              })
              .catch(err => {
                kode_error = 210305;
                techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "DeRegister State", err.message);
                res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
              });
            })
            .catch(err => {
              kode_error = 210304;
              techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "DeRegister State", err.message);
              res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
            });
          })
          .catch(err => {
            kode_error = 210303;
            techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "DeRegister State", err.message);
            res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
          });
        })
        .catch(err => {
          kode_error = 210302;
          techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "DeRegister State", err.message);
          res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
        });
      }
    }
  })
  .catch(err => {
    kode_error = 210301;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "DeRegister State", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
  */
 res.status(500).send({ message: "Pembatalan Pendaftaran STATE sudah ditutup. Untuk informasi lebih lanjut, silakan menghubungi pihak MAXIMA melalui LINE ataupun Instagram."})
}


//Detail State
exports.getStateDetails = (req,res) => {
  KegiatanState.findAll(
    {
      where: {
          state_id: req.body.state_id
      },
      attributes: ['state_id', 'name', 'day', 'room', 'duration', 'kategori']
  })
  .then(function(response) {
    res.json(response);
  })
  .catch(err => {
    kode_error = 210400;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Get State Details", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.getRegisteredState = (req,res) => {
  PresensiState.findAll(
  {
      where: { 
      nim: req.body.nim
      },
      attributes: ['state_id']
  })
  .then(function(presensi) {
      var JSON_PRESENSI = JSON.stringify(presensi);
      var JSONify_1 = JSON.parse(JSON_PRESENSI);
      var i = 0;
      var str_arr = [];
      for (i = 0; i < JSONify_1.length; i++) {
      str_arr[i] = parseInt(JSONify_1[i].state_id);
      }
      PresensiState.findAll({
        where: {
            state_id: str_arr,
            nim: req.body.nim
        },
        attributes: [ 'state_id', 'attendance'],
        include: [
            {
                model: KegiatanState,
                where: { state_id: str_arr },
                attributes: ['name', 'day', 'room', 'duration', 'link_logo' ]
            }
        ]
      })
      .then(function(response) {
        res.json(response);
      })
      .catch(err => {
        kode_error = 210502;
        techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Get Registered State", err.message);
        res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
      });
  })
  .catch(err => {
    kode_error = 210501;
    techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Get Registered State", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.checkInState = (req,res) => {
  /*
  KegiatanState.findAll(
    {
      where: { 
        state_id: req.body.state_id
      },
      attributes: ['kode_presensi']
    })
    .then(function(response) {
      var JSON_code = JSON.stringify(response);
      var JSONify = JSON.parse(JSON_code);
      var arr = JSONify[0];
      var code = arr.kode_presensi;
      if (code != req.body.kode_presensi) {
        return res.status(403).send({ message: "Kode Invalid." });
      }
      else {
        PresensiState.update(
        {
          attendance: 1
        },
        {
          where: {
            nim: req.body.nim,
            state_id: req.body.state_id
          }
        })
        .then(function(response) {
          res.status(200).send({ message: "Berhasil check-in! "});
        })
        .catch(err => {
          kode_error = 210602;
          techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Check In State", err.message);
          res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
        });
      }
    })
    .catch(err => {
      kode_error = 210601;
      techControl.addErrorLog(kode_error, "Controller", "STATE - Maba", "Check In State", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
  */
  res.status(500).send({ message: "Absensi STATE sudah ditutup. Untuk informasi lebih lanjut, silakan menghubungi pihak MAXIMA melalui LINE ataupun Instagram."})
}