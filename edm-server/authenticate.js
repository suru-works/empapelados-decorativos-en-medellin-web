var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Dishes = require('./models/dishes');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
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

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin= function(req, res, next) {

    if(req.user.admin){
        return next();
    }
    else{
        var err =  new Error ('You are not authorized to perform this operation!');
        err.status =  403;
        return next(err);
    }
};

exports.verifyCommentOwning = function(req, res, next) {

    Dishes.findById(req.params.dishId)
            .then((dish) => {
                
                if (dish != null && dish.comments.id(req.params.commentId) != null) {

                    if((req.user._id).equals(dish.comments.id(req.params.commentId).author._id)){
                        return next();
                    }
                    else{
                        var err =  new Error ('this comment doesnt belong you.');
                        err.status =  403;
                        return next(err);
                    }                   
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
};