const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const key = process.env.JWT_KEY;

exports.getToken = function(user) {
    return jwt.sign(user, key, {expiresIn: 3600});
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;
exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));

exports.userIsVerified = function(req, res, next) {
    User.findOne({
        username: req.body.username
    })
    .then(user => {
        if (user.verified) {
            next();
        } else {
            var err = new Error('You are not verified, check your email');
            err.status = 403;
            next(err);
        }
    })
}



exports.verifyUser = passport.authenticate('jwt', {session: false});

/* exports.verifyUser = function(req, res, next) {
    console.log(req.body);
    console.log( passport.authenticate('jwt', {session: false}));
} */

exports.verifyAdmin = function(req, res, next) {
    if (req.user.admin) {
        next();
    } else {
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        next(err);
    }
} 