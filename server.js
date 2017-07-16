var express = require('express')
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Beer = require("./models/BeerModel");
var User = require("./models/UserModel");
var userRoutes = require("./routes/beerRoutes");
var beerRoutes = require("./routes/userRoutes");

mongoose.connect('mongodb://localhost/beers');

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure passport and session middleware
app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status('401').send({message: "Unauthorized" });
  }
};

app.use('/users', userRoutes);
app.use('/beers', ensureAuthenticated, beerRoutes);

//handle all non-file requests with index.html
app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// error handler to catch 404 and forward to main error handler
 app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

//start the server
app.listen('8000', function() {
  console.log("yo yo yo, on 8000 bro");
});