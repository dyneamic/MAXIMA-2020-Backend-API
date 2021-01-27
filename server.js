require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// tambahan buat response time 
//process.env.DEBUG = '*';
//end of response time

var corsOptions = {
  origin: "http://localhost:8081"
};

//morgan response time
const morgan = require('morgan');

app.use(
    morgan((token,req,res) => {
      return [
        new Date(),
        token.method(req,res),
        token.url(req,res),
        token.status(req,res),
        token.res(req, res, 'content-length'),
        '-',
        token['response-time'](req, res),
        'ms',
        req.method === 'POST' ? JSON.stringify(req.body): '',
      ].join(' ');
    })
);
//end of morgan

// ini original app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to Maxima 2020 API, co-created with lumiere03." });
  res.sendFile(__dirname + '/pages/welcome.html');
});
app.use(express.static('pages'));

// start for routes (CEK PERUBAHAN ROUTES)
require('./app/routes/user/auth.routes')(app);
require('./app/routes/user/user.routes')(app);
//home
require('./app/routes/home/home.routes')(app);
//state
require('./app/routes/state/state_admin.routes')(app);
require('./app/routes/state/state_bph.routes')(app);
require('./app/routes/state/state_acara.routes')(app);
require('./app/routes/state/state_maba.routes')(app);
require('./app/routes/state/state_organisator.routes')(app);
//malpun
require('./app/routes/malpun/malpun.routes')(app);
//survey
require('./app/routes/survey/survey.routes')(app);
//technical route
require('./app/routes/technical.routes')(app);
// end for routes

//tambahan database
const db = require("./app/models");
const Role = db.role;
const Technical = db.technical;

/*
db.sequelize.sync({force: true}).then(() => {
 console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "maba"
  });
 
  Role.create({
    id: 2,
    name: "panitia"
  });
 
  Role.create({
    id: 3,
    name: "ukm"
  });

  Role.create({
    id: 4,
    name: "acara"
  });

  Role.create({
    id: 5,
    name: "bph"
  });

  Role.create({
    id: 6,
    name: "admin"
  });

  Technical.create({
    id: 1,
    message: "Database is up and running."
  });
}
*/

db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


