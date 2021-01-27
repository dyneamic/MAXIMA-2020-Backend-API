const db = require("../../models");
const DaftarHome = db.daftarHome;
const MediaHome = db.mediaHome;
const ErrorLogs = db.errorLogs;
const techControl = require("../technical.controller");

const Op = db.Sequelize.Op;

var kode_error;

//Tambah Home
exports.addHome = (req,res) => {
  DaftarHome.create(
    {
      name: req.body.name,
      search_key: req.body.name.toLowerCase().split(' ').join('-'),
      kategori: req.body.kategori,
      narasi: req.body.narasi,
      narasi_panjang: req.body.narasi_panjang,
      link_logo: req.body.link_logo,
      link_video: req.body.link_video,
      link_audio: req.body.link_audio,
      line: req.body.line,
      instagram: req.body.instagram
    }
  )
  .then(function(rowsUpdated) {
    res.status(200).send({ message: "Berhasil ditambah! "});
  })
  .catch(err => {
    kode_error = 110100;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Add Home", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

// Tambah Media
exports.addHomeMedia = (req,res) => {
  MediaHome.create(
    {
      home_id: req.body.home_id,
      link_media: req.body.link_media
    }
  )
  .then(function(rowsUpdated) {
    res.status(200).send({ message: "Berhasil ditambah! "});
  })
  .catch(err => {
    kode_error = 110200;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Add Home Media", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

//Get All Home
exports.getAllHome = (req,res) => {
  DaftarHome.findAll({
    attributes: ['home_id', 'search_key', 'name', 'kategori', 'narasi', 'narasi_panjang', 'link_logo', 'link_video', 'link_audio', 'line', 'instagram']
  })
  .then(function (response) {
    res.json(response);
  })
  .catch(err => {
    kode_error = 110300;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Get All HOME", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

//Get Home Details
exports.getHomeDetails = (req,res) => {
  DaftarHome.findAll({
    where: { home_id: req.body.home_id },
    attributes: ['home_id', 'search_key', 'name', 'kategori', 'narasi', 'narasi_panjang', 'link_logo', 'link_video', 'link_audio', 'line', 'instagram']
  })
  .then(function (response) {
    res.json(response);
  })
  .catch(err => {
    kode_error = 110400;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Get HOME Details", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

//Get Media Details for a HOME
exports.getMediaDetails = (req,res) => {
  MediaHome.findAll({
    where: { home_id: req.body.home_id },
    attributes: ['media_id', 'home_id', 'link_media']
  })
  .then(function(response) {
    res.json(response);
  })
  .catch(err => {
    kode_error = 110500;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Get Media Details for a HOME", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

//Update Home Details
exports.updateHomeDetails = (req,res) => {
  DaftarHome.update(
    {
      search_key : req.body.search_key,
      name: req.body.name,
      kategori: req.body.kategori,
      narasi: req.body.narasi,
      narasi_panjang: req.body.narasi_panjang,
      link_logo: req.body.link_logo,
      link_video: req.body.link_video,
      link_audio: req.body.link_audio,
      line: req.body.line,
      instagram: req.body.instagram
    },
    {
      where: { home_id: req.body.home_id }
    }
  )
  .then(function(rowsUpdated) {
    res.status(200).send({ message: "Berhasil diubah! "});
  })
  .catch(err => {
    kode_error = 110600;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Update Home Details", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}



//Update Home Details
exports.updateHomeMedia = (req,res) => {
  MediaHome.update(
    {
      link_media: req.body.link_media
    },
    {
      where: { home_id: req.body.media_id, media_id: req.body.media_id }
    }
  )
  .then(function(rowsUpdated) {
    res.status(200).send({ message: "Berhasil diubah! "});
  })
  .catch(err => {
    kode_error = 110700;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Update Media Details", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.deleteHome = (req,res) => {
  DaftarHome.destroy({
    where: { home_id: req.body.home_id }
  })
  .then(function(response) {
    MediaHome.destroy({
      where: { home_id: req.body.home_id }
    })
    .then(function(response) {
      res.status(200).send({ message: "Berhasil dihapus! "});
    })
    .catch(err => {
      kode_error = 110802;
      techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Delete Home", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    });
  })
  .catch(err => {
    kode_error = 110801;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Delete Home", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.deleteHomeMedia = (req,res) => {
  DaftarHome.destroy({
    where: { media_id: req.body.media_id }
  })
  .then(function(response) {
    res.status(200).send({ message: "Berhasil dihapus! "});
  })
  .catch(err => {
    kode_error = 110900;
    techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Delete Home Media", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  });
}

exports.publicGetHomeByQuery = (req, res) => {
  DaftarHome.findAll({
    where: { search_key: req.query.ukm },
    attributes: ['home_id']
  })
  .then(function(response) {
    response = response[0];
    DaftarHome.findAll({
      where: { home_id: response['home_id'] },
      attributes: ['home_id', 'name', 'kategori', 'narasi', 'narasi_panjang', 'link_logo', 'link_video', 'link_audio', 'line', 'instagram'],
      include: [
        {
            model: MediaHome,
            where: { home_id: response['home_id'] },
            attributes: ['link_media']
        }
    ]
    })
    .then(function(response) {
      res.json(response);
    })
    .catch(err => {
      kode_error = 111002;
      //techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Public GET HOME BY QUERY 2", err.message);
      res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
    })
  })
  .catch(err => {
    kode_error = 111001;
    //techControl.addErrorLog(kode_error, "Controller", "Home Data Management", "Public GET HOME BY QUERY 1", err.message);
    res.status(500).send({ message: "Telah terjadi kesalahan. Silahkan mencoba lagi. Kode Error: " + kode_error });
  })
}