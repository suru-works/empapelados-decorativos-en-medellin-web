const express = require('express');
const bodyParser = require('body-parser');

const mapsRouter = express.Router();

mapsRouter.get('/', function(req, res, next) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        key: process.env.MAPS_KEY
    })
    next();
});

module.exports = mapsRouter;