const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Leaders = require('../models/leader');
const authenticate = require('../authenticate');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    leaders.find({})
    .then((leaders) => res.json(leaders), (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.create(req.body)
    .then((leader) => res.json(leader), (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.remove({})
    .then((resp) => res.json(resp), (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => res.json(leader), (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => res.json(leader), (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => res.json(resp), (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;