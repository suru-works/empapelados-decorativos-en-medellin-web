// Basic imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Config import
const config = require('./config');

// Environment variables
require('dotenv').config();

// Router imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/productRouter');
const leaderRouter = require('./routes/leaderRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const mapsRouter = require('./routes/mapsRouter');

// MongoDB initialization
const mongoose = require('mongoose');
const passport = require('passport');
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// Express initialization
var app = express();

// HTTPS
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    console.log('https://' + req.hostname + ':' + app.get('secPort') + req.url);
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
    
  }
});



//middleware for cross origin
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Host');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    console.log("handeling options client request!!");
    res.sendStatus(200);
  }
  else {
  //move on
    next();
  }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Unidentified Express shenanigans
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Generate authentication key
//config.generateKey();

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Router initialization
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/leaders', leaderRouter);
app.use('/feedback', feedbackRouter);
app.use('/maps', mapsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
