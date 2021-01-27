const mailjet = require ('node-mailjet').connect(process.env.MAILJET_1, process.env.MAILJET_2)
const techControl = require("../technical.controller");

exports.welcomeEmail = (name, email_student) => {
  const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": process.env.EMAIL_MAILJET,
            "Name": "MAXIMA 2020"
          },
          "To": [
            {
              "Email": email_student,
              "Name": name
            }
          ],
          "TemplateID": process.env.MAIL_TEMPLATE1,
          "TemplateLanguage": true,
          "Subject": "Pendaftaran Akun Berhasil",
          "Variables": {
            "name": name
          }
        }
      ]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
      techControl.addErrorLog(310100, "Mail", "Welcome Email", email_student, err.statusCode);
    })
}

exports.resetOTP = (name, email_student, OTP) => {
  const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": process.env.EMAIL_MAILJET,
            "Name": "MAXIMA 2020"
          },
          "To": [
            {
              "Email": email_student,
              "Name": name
            }
          ],
          "TemplateID": process.env.MAIL_TEMPLATE2,
          "TemplateLanguage": true,
          "Subject": "Permohonan Penggantian Kata Sandi",
          "Variables": {
            "name": name,
            "otp": OTP
          }
        }
      ]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
      techControl.addErrorLog(310200, "Mail", "Request OTP", email_student, err.statusCode);
    })
}

exports.regisSTATE = (name, email_student, state_name, day, zoom_link) => {
  var tanggal_full = '';
  var hari_subject = "Pendaftaran STATE Day " + day + " Berhasil";
  if (day == 1) tanggal_full = "Senin, 7 September 2020";
  else if (day == 2) tanggal_full = "Selasa, 8 September 2020";
  else if (day == 3) tanggal_full = "Rabu, 9 September 2020";
  else if (day == 4) tanggal_full = "Kamis, 10 September 2020";
  const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": process.env.EMAIL_MAILJET,
            "Name": "MAXIMA 2020"
          },
          "To": [
            {
              "Email": email_student,
              "Name": name
            }
          ],
          "TemplateID": process.env.MAIL_TEMPLATE3,
          "TemplateLanguage": true,
          "Subject": hari_subject,
          "Variables": {
            "nama_maba": name,
            "nama_ukm": state_name,
            "hari": tanggal_full,
            "link_zoom": zoom_link
          }
        }
      ]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
      techControl.addErrorLog(310300, "Mail", "Regis STATE", email_student, err.statusCode);
    })
}

exports.deregisSTATE = (name, email_student, state_name, day) => {
  var hari_subject = "Pembatalan Pendaftaran STATE Day " + day + " Berhasil";
  const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": process.env.EMAIL_MAILJET,
            "Name": "MAXIMA 2020"
          },
          "To": [
            {
              "Email": email_student,
              "Name": name
            }
          ],
          "TemplateID": process.env.MAIL_TEMPLATE4,
          "TemplateLanguage": true,
          "Subject": hari_subject,
          "Variables": {
            "nama_maba": name,
            "nama_ukm": state_name
          }
        }
      ]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
      techControl.addErrorLog(310500, "Mail", "Regis STATE", email_student, err.statusCode);
    })
}

exports.emailMalpun = (email) => {
  const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": process.env.EMAIL_MAILJET,
            "Name": "MAXIMA 2020"
          },
          "To": [
            {
              "Email": email
            }
          ],
          "TemplateID": process.env.MAIL_TEMPLATE5,
          "TemplateLanguage": true,
          "Subject": "Link Malam Puncak MAXIMA 2020",
          "Variables": {
          }
        }
      ]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
      techControl.addErrorLog(310600, "Mail", "Malpun", email_student, err.statusCode);
    })
}