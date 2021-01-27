exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.mabaBoard = (req, res) => {
  res.status(200).send("Maba Content.");
};

exports.ukmBoard = (req,res) => {
  res.status(200).send("UKM Content");
}

exports.panitiaBoard = (req, res) => {
  res.status(200).send("Panitia Content.");
};

exports.acaraBoard = (req,res) => {
  res.status(200).send("Panit Acara Content");
}

exports.bphBoard = (req,res) => {
  res.status(200).send("BPH Content");
}

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.panitAdminBoard = (req, res) => {
  res.status(200).send("Panitia and Admin Content.");
};