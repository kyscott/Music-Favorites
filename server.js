const express = require("express");
const path = require("path");
const axios = require("axios");

const routes = require("./app/routes/api-routes");

const passport   = require('passport')
const session    = require('express-session')
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;
var env = require('dotenv').load();

//Require models for syncing to db
let db = require("./app/models");

//load passport strategies
require('./app/config/passport/passport.js')(passport, db.user);

//Express app handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // was true
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use('/images', express.static(__dirname + '/client/src/components/Nav/'));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Serve up static assets for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use('/api', routes);

app.post('/api/signup', passport.authenticate('local-signup'), (req, res) => {
  res.json(req.body);
});

app.post('/api/signin', passport.authenticate('local-signin'), (req, res) => {
  console.log('hi');
  res.json(req.body);
});

app.get("/*", function(req, res) {
res.sendFile(path.join(__dirname, "/client/public/index.html"));
});


// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
});
