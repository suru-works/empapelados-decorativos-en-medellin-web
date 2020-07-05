const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');
const cors = require('./cors');
const { token } = require('morgan');

const mail = require('../com/mail');
const verifyView = require('../view/verifyView');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  const verifyToken=Math.floor((Math.random() * 100) + 54);
  req.body.verifyToken=verifyToken;
  req.body.verified=false;
  console.log(req.body);
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    } else {
      if (req.body.name) user.name = req.body.name;
      if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
      if (req.body.verifyToken) user.verifyToken = req.body.verifyToken;
      if (req.body.verified) user.verified = req.body.verified;
      

      const verifyHTML =verifyView.verifyView(user);
      //sending email for user verification
      mailData = {
        serverService:'gmail',
        serverMail:process.env.AUTH_EMAIL_USER,
        serverPassword:process.env.AUTH_EMAIL_PASSWORD,
        sender:'"Empapelados decorativos en medellin"',
        receivers:req.body.username,
        subject:'vertificacion de cuenta',
        text:'',
        html:verifyHTML
      };
      mail.mail(mailData);
      user.save((err, user) => {
        if (err) {
          
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, token: authenticate.getToken({_id: req.user._id}), status: 'Registration Successful!'});
        });
      })
    }
  });
});

router.get('/verify/:token', cors.corsWithOptions,(req, res) => {
  
   console.log('User verification attempt');
   const token=req.params.token.split(',');
   console.log(token);
   User.findByIdAndUpdate(token[0],{
     $set: {
       verified: true
      }
    },{new: true})
   .then((user) => {
     console.log(user);
     res.redirect('https://www.empapeladosdecorativosenmedellin.com/');
     return user;
   }, (err) => next(err))
   .catch((err) => {
     console.log(err);
      next(err)
    });
});

router.post('/login', cors.corsWithOptions, authenticate.userIsVerified, passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  //res.json({success: true, token: token, status: 'You are successfully logged in!'});
  res.json({success: true, status: 'You are successfully logged in!'});
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: true
  });
});

router.get('/logout', cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
  req.logout();
  res.json({success: true, status: 'You have successfully logged out!'});
});

module.exports = router;