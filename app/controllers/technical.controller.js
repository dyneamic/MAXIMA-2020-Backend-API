const db = require("../models");
const Technical = db.technical;
const ErrorLogs = db.errorLogs;

const Op = db.Sequelize.Op;

//multer s3//
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
//end of multerS3//

//tes state
const KegiatanState = db.kegiatanState;
const PresensiState = db.presensiState;
//end of tes state
exports.addErrorLog = (kode_error, bagian, subbagian, fungsi, pesan) => {
    ErrorLogs.create({
        error_code: kode_error,
        section: bagian,
        subsection: subbagian,
        function: fungsi,
        message: pesan
    })
}

exports.getIsDatabaseOnline = (req,res) => {
    Technical.findAll(
    {
        where: {
            id: 1
        },
        attributes: ['message']
    })
    .then(function(response) {
    res.json(response);
    });
}

exports.getIsServerOnline = (req, res) => {
    res.status(200).send("NodeJS Server is up and running, updated with GitHooks, auto restart PM2");
};

exports.viewErrorLogs = (req, res) => {
    ErrorLogs.findAll({
    })
    .then(function (response) {
        res.json(response);
    })
}
/*
exports.getArray = (req,res) => {
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
            state_id: str_arr
        },
        attributes: [ 'state_id', 'checkIn', 'checkOut'],
        include: [
            {
                model: KegiatanState,
                where: { state_id: str_arr },
                attributes: ['name', 'day', 'room', 'duration' ]
            }
        ]
        //attributes: ['state_id', 'name', 'day', 'room', 'duration']
        })
        .then(function(response) {
        res.json(response);
        })
    })
}
*/

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
        return res.status(404).send({ message: "State Not Found." });
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
            return res.status(403).send({ message: "You have already registered this STATE!" });
          }
          else if (found1 == 0) {
            PresensiState.count({
              where: {
                nim: req.body.nim
              }
            })
            .then(function(count) {
              if (count > 3) {
                return res.status(403).send({ message: "You have exceeded your quota of 3 STATEs."});
              }
              else {
                //get state day
                KegiatanState.findAll({
                    where: {
                      state_id: req.body.state_id
                  },
                  attributes: ['day']
                })
                .then(function(response0) {
                  var JSON_RES0 = JSON.stringify(response0);
                  var JSONify = JSON.parse(JSON_RES0);
                  var arr0 = JSONify[0];
                  var day_init = arr0.day;
                  var day_check = 0;
                  var curr_date = new Date();
                  if (response0[0].day === 1) {
                    if ((curr_date.getFullYear() == 2020) && (curr_date.getMonth() == 08) && (curr_date.getDate() == 09)) {
                      day_check = 1;
                    }
                  }  
                  else if (response0[0].day == 2) {
                    if ((curr_date.getFullYear() == 2020) && (curr_date.getMonth() == 08) && (curr_date.getDate() == 10)) {
                      day_check = 1;
                    }
                  }
                  else if (response0[0].day == 3) {
                    if ((curr_date.getFullYear() == 2020) && (curr_date.getMonth() == 08) && (curr_date.getDate() == 11)) {
                      day_check = 1;
                    }
                  }
                  else if (response0[0].day == 4) {
                    if ((curr_date.getFullYear() == 2020) && (curr_date.getMonth() == 08) && (curr_date.getDate() == 12)) {
                      day_check = 1;
                    }
                  }
                  if (day_check == 0) {
                    return res.status(403).send({ 
                      message: "STATE pada hari ke-"+ response0[0].day+" tidak dibuka pendaftarannya hari ini.",
                      message2: response0[0].day
                    });
                  }
                  else {
                    //cek apakah ada state yang terdaftar di hari yang sama
                    PresensiState.findAll({
                      where: {
                        nim: req.body.nim
                      },
                      attributes: ['state_id']
                    })
                    .then(function(presensi) {
                      var JSON_PRESENSI = JSON.stringify(presensi);
                      var JSONify_1 = JSON.parse(JSON_PRESENSI);
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
                      .then(function(response) {
                        var JSON_RES = JSON.stringify(response);
                        var JSONify = JSON.parse(JSON_RES);
                        if (!isEmptyObject(JSONify)) {
                          for (i = 0; i < JSONify.length; i++) {
                            if (parseInt(day_init) == parseInt(JSONify[i].day)) checker = 1;
                          }
                        }
                        if (checker == 1) {
                          return res.status(403).send({ message: "You have already registered another STATE on the same day!" });
                        }
                        else if (checker == 0) {
                          //cek max quota
                          KegiatanState.findAll({
                            where: {
                              state_id: req.body.state_id
                            },
                            attributes: ['quota', 'registered']
                          })
                          .then(function(response) {
                            var JSON_QUOTA = JSON.stringify(response);
                            var JSONify_quota = JSON.parse(JSON_QUOTA);
                            var arr2 = JSONify_quota[0];
                            var quota = arr2.quota;
                            var registered = arr2.registered;
                            if (registered >= quota) {
                              return res.status(403).send({ message: "STATE Full!" });
                            }
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
                                res.json(responseLast);
                              })
                            })
                          })
                        }
                      })
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
}