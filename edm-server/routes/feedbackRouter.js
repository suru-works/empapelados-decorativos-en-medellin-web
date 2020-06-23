const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Feedbacks = require('../models/feedback');
const authenticate = require('../authenticate');

const feedbackRouter = express.Router();

feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    feedbacks.find({})
    .then((feedbacks) => res.json(feedbacks), (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    feedbacks.create(req.body)
    .then((feedback) => res.json(feedback), (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    feedbacks.remove({})
    .then((resp) => res.json(resp), (err) => next(err))
    .catch((err) => next(err));
});

feedbackRouter.route('/:feedbackId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    feedbacks.findById(req.params.feedbackId)
    .then((feedback) => res.json(feedback), (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    feedbacks.findByIdAndUpdate(req.params.feedbackId, {
        $set: req.body
    }, { new: true })
    .then((feedback) => res.json(feedback), (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    feedbacks.findByIdAndRemove(req.params.feedbackId)
    .then((resp) => res.json(resp), (err) => next(err))
    .catch((err) => next(err));
});

module.exports = feedbackRouter;