const MailController = require("../mail/mail.controller");
const techControl = require("../technical.controller");

exports.MalpunMain = (req,res) => {
  const { email } = req.body;
  const email_format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email_format.test(email)) {
    const email_domain = email.substring(email.lastIndexOf("@") +1);
    const authorizedDomain = ["student.umn.ac.id", "lecturer.umn.ac.id", "umn.ac.id", "gmail.com", "yahoo.com", "yahoo.co.id"];
    let protected_domain = 0;
    for (let i = 0; i < authorizedDomain.length; i++) {
      if (authorizedDomain[i] == email_domain) {
          protected_domain = 1;
          break;
        }
    }
    if (!protected_domain) res.status(500).send({ message: "Mohon menggunakan email berdomain yahoo.com, gmail.com atau UMN."})
    else if (protected_domain) {
      MailController.emailMalpun(email);
      res.status(200).send({ message: "Email sudah dikirim. Silahkan periksa inbox email anda."});
    }
  }
  else {
    res.status(500).send({ message: "Format email yang dimasukkan tidak valid." });
  }
}


