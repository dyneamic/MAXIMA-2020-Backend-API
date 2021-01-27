const db = require("../../models");
const { Sequelize } = require("../../models");
const surveyResponse = db.surveyResponse;

const Op = db.Sequelize.Op;

exports.viewAllResponse = (req,res) => {
  surveyResponse.findAll({
    attributes: [
      'nim', 'nama_lengkap', 'jurusan', 'state_name', 'state_id', 'section1_1', 'section1_2', 'section2_1', 'section2_2', 'section2_3', 'section2_4', 'section2_5', 'section3_1', 'section3_2']
  })
  .then(function(response) {
    res.json(response);
  })
  .catch(err => {
    kode_error = 410100;
    techControl.addErrorLog(kode_error, "Controller", "Survey", "Liat Respons Survey", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.addResponse = (req,res) => {
  surveyResponse.create(
    {
      nim: req.body.nim,
      nama_lengkap: req.body.nama_lengkap,
      jurusan: req.body.jurusan,
      state_name: req.body.state_name,
      state_id: req.body.state_id,
      section1_1: req.body.section1_1,
      section1_2: req.body.section1_2,
      section2_1: req.body.section2_1,
      section2_2: req.body.section2_2,
      section2_3: req.body.section2_3,
      section2_4: req.body.section2_4,
      section2_5: req.body.section2_5,
      section3_1: req.body.section3_1,
      section3_2: req.body.section3_2
    }
  )
  .then(function(response) {
    res.status(200).send({ message: "Terima kasih telah mengisi! "});
  })
  .catch(err => {
    kode_error = 410200;
    techControl.addErrorLog(kode_error, "Controller", "Survey", "Isi Survey", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}