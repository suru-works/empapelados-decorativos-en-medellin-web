const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');
const cors = require('./cors');
const { token } = require('morgan');
const crypto = require("crypto");
const CryptoJS = require('crypto-js');

const mail = require('../com/mail');
const verifyView = require('../view/verifyView');
const forgotView = require('../view/forgotView');


const encrypt = text => {
  const encrypted = CryptoJS.AES.encrypt(text+'', process.env.CRYPTOJS_SECRET);
  return encrypted;
};

const decrypt = data => {
  const decrypted = CryptoJS.AES.decrypt(data, process.env.CRYPTOJS_SECRET);
  return decrypted;
};

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  const verifyToken = Math.floor((Math.random() * 100) + 54);
  req.body.verifyToken = verifyToken;
  req.body.verified = false;
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      if (req.body.name) user.name = req.body.name;
      if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
      if (req.body.verifyToken) user.verifyToken = req.body.verifyToken;
      if (req.body.verified) user.verified = req.body.verified;


      const verifyHTML = verifyView.verifyView(user);
      //sending email for user verification
      mailData = {
        serverService: 'gmail',
        serverMail: process.env.AUTH_EMAIL_USER,
        serverPassword: process.env.AUTH_EMAIL_PASSWORD,
        sender: '"Empapelados decorativos en medellin"',
        receivers: req.body.username,
        subject: 'vertificacion de cuenta',
        text: '',
        html: verifyHTML
      };
      mail.mail(mailData);
      user.save((err, user) => {
        if (err) {

          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, token: authenticate.getToken({ _id: req.user._id }), status: 'Registration Successful!' });
        });
      })
    }
  });
});

router.get('/verify/:token', cors.corsWithOptions, (req, res) => {

  const token = req.params.token.split(',');
  User.findByIdAndUpdate(token[0], {
    $set: {
      verified: true
    }
  }, { new: true })
    .then((user) => {
      res.redirect('https://www.empapeladosdecorativosenmedellin.com/');
      return user;
    }, (err) => next(err))
    .catch((err) => {
      next(err)
    });
});

router.post('/login', cors.corsWithOptions, authenticate.userIsVerified, passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, username: req.user.username, admin: req.user.admin, status: 'You are successfully logged in!' });
});

router.get('/logout', cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
  req.logout();
  res.json({ success: true, status: 'You have successfully logged out!' });
});

router.post('/forgot', async function (req, res, next) {

  const data = req.body;

  try {
    let user = await User.findOne({ username: data.username });

    if (user) {
      var isTokenNotUnique = true;
      const now = new Date();
      now.setMinutes(now.getMinutes() + 10);
      var key = crypto.randomBytes(20).toString('hex');
      while (isTokenNotUnique) {
        var forgotToken = now.toISOString() + ',' + key;
        var userByToken = await User.findOne({ forgotPasswordToken: forgotToken });
        if (userByToken) {
          //the token allready exist
          key = crypto.randomBytes(20).toString('hex');
        }
        else {
          isTokenNotUnique = false;
          data.forgotToken = forgotToken;
          await User.findByIdAndUpdate(user._id, {
            $set: {
              forgotPasswordToken: forgotToken
            }
          }, { new: true })
        }

      }

      const forgotHTML = forgotView.forgotView(data);
      //sending email for user verification
      mailData = {
        serverService: 'gmail',
        serverMail: process.env.AUTH_EMAIL_USER,
        serverPassword: process.env.AUTH_EMAIL_PASSWORD,
        sender: '"Empapelados decorativos en medellin"',
        receivers: data.username,
        subject: 'restablecer contraseña',
        text: '',
        html: forgotHTML
      };
      mail.mail(mailData);
      res.status(200);
      res.json({
        success: true
      });
    }
    else {
      var err = new Error("User does not exist");
      err.statusCode = 404;
      throw err;
    }
  }
  catch (err) {
    if (err.statusCode == 404) {
      res.status(404);
      res.json({
        msg: "User does not exist"
      });
    } else {
      res.status(500);
      res.json({
        msg: "Unknown error"
      });
    }
  }
});

router.post('/forgot/:token', async function (req, res, next) {

  try {
    const data = req.body;
    const token = req.params.token.split(',');

    const now = new Date();
    const exp = parseISOString(token[0]);
    

    if (now > exp) {
      var err = new Error("The recovery token has expired");
      err.statusCode = 401;
      throw err;
    }
    else {
      let user = await User.findOne({ forgotPasswordToken: req.params.token });
      if (user) {
        await user.setPassword(data.newPassword);
        await user.save();
        res.status(200);
        res.json({
          status: 200,
          msg: "Password changed successfully"
        });

      }
      else {
        //error por que no existe
        var err = new Error("User does not exist");
        err.statusCode = 404;
        throw err;
      }
    }
  }
  catch (err) {
    if (err.statusCode == 401) {
      res.status(401);
      res.json({
        msg: "The recovery token has expired"
      });
    }
    else if (err.statusCode == 404) {
      res.status(404);
      res.json({
        msg: "User does not exist"
      });
    }
    else {
      res.status(500);
      res.json({
        msg: "Unknown error"
      });
    }
  }

});
module.exports = router;