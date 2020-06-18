const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Products = require('../models/product');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
.get((req, res, next) => {
    Products.find({})
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch((err) => next(err));
});

productRouter.route('/:productId')
.get((req, res, next) => {
    Products.findById(req.params.productId)
    .then((product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    })
    .catch((err) => next(err));
});

module.exports = productRouter;