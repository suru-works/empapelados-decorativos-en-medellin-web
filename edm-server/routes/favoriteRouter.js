const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');

var authenticate = require('../authenticate');

const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        var userId = mongoose.Types.ObjectId(req.user._id);
        Favorites.findOne({ 'user': userId })
            .populate('user')
            .populate('dishes.dish')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        var userId = mongoose.Types.ObjectId(req.user._id);
        Favorites.findOne({ 'user': userId })
            .then((favorite) => {
                if (favorite) {
                    for (var i = 0; i < req.body.length; i++) {
                        if (favorite.dishes.id(req.body[i]._id) === null) {
                            favorite.dishes.push(req.body[i]._id);
                        }
                    }
                    favorite.save();
                    console.log('Favorite Added ', favorite);
                }
                else {
                    Favorites.create({ user: req.user._id })
                        .then((favorite) => {
                            favorite.dishes.push({ "_id": req.params.dishId });
                            for (i = 0; 1 < req.body.length; i++) {
                                if (favorite.dishes.id(req.body[i]._id) === null) {
                                    favorite.dishes.push({ "_id": req.body[i]._id });
                                }
                            }
                            favorite.save()
                                .then((favorite) => {
                                    console.log('Favorite Created ');
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(favorite);
                                })
                        })
                    console.log('Favorite Created ', favorite);
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.remove({ 'user': req.user.id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

favoriteRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /favorites/:dishId');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        var userId = mongoose.Types.ObjectId(req.user._id);
        Favorites.findOne({ 'user': userId })
            .then((favorite) => {
                if (favorite) {
                    if (favorite.dishes.id(req.params.dishId) === null) {
                        favorite.dishes.push(req.params.dishId);
                    }

                    favorite.save();
                    console.log('Favorite Added ', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }
                else {
                    Favorites.create({ user: req.user._id })
                        .then((favorite) => {
                            favorite.dishes.push({ "_id": req.params.dishId });
                            favorite.save()
                                .then((favorite) => {
                                    console.log('Favorite Created ');
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(favorite);
                                })
                        })
                    console.log('Favorite Created ', favorite);
                }


            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites/:dishId');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        var userId = mongoose.Types.ObjectId(req.user._id);
        Favorites.findOne({ 'user': userId }, (err, favorite) => {
            if (err) return next(err);

            if (favorite != null && favorite.dishes.id(req.params.dishId) != null){
                favorite.dishes.id(req.params.dishId).remove();
                favorite.save()
                    .then((favorite) => {
                        console.log('Dishhhhh deleted by accident');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })
                    .catch((err) => {
                        return next(err);
                    })

            
            }
            
            else {
                err = new Error('The dish ' + req.params.dishId + 'was not found as a user favorite.');
                err.status = 404;
                return next(err);
            }
        })
    });



module.exports = favoriteRouter;