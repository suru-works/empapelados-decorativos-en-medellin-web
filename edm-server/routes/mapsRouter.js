const express = require('express');
const cors = require('./cors');
const bodyParser = require('body-parser');

const mapsRouter = express.Router();

mapsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.all((req, res, next) => {
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');
    res.json({
        key: process.env.MAPS_KEY
    })
    next();
});

module.exports = mapsRouter;