const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Products = require('../models/product');
const authenticate = require('../authenticate');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    Products.find({})
    .then((products) => res.json(products), (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    req.body.publisher = req.user._id;
    Products.create(req.body)
    .then((product) => res.json(product), (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.remove({})
    .then((resp) => res.json(resp), (err) => next(err))
    .catch((err) => next(err));
});

productRouter.route('/:productId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    Products.findById(req.params.productId)
    .then((product) => res.json(product), (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, {
        new: true
    })
    .then((product) => res.json(product), (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findByIdAndRemove(req.params.productId)
    .then((resp) => res.json(resp), (err) => next(err))
    .catch((err) => next(err));
});

productRouter.route('/:productId/comments')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    Products.findById(req.params.productId)
    .populate('comments.user')
    .then((product) => res.json(product.comments), (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    req.body.user = req.user._id;
    Products.findByIdAndUpdate(req.params.productId, {
        $push: {
            comments: req.body
        }
    }, {
        new: true
    })
    .then((product) => res.json(product), (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Products.findByIdAndUpdate(req.params.productId, {
        $set: {
            comments: []
        }
    }, {
        new: true
    })
    .then((product) => res.json(product), (err) => next(err))
    .catch((err) => next(err));
});

productRouter.route('/:productId/comments/:commentId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Products.findById(req.params.productId, {
        comments: {
            $elemMatch: {
                _id: req.params.commentId
            }
        }
    })
    .then((product) => res.json(product.comments[0]), (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Products.findOneAndUpdate({
        _id: req.params.productId,
        "comments._id": req.params.commentId
    }, {
        $set: {
            "comments.$.comment": req.body.comment
        }
    }, {
        new: true
    })
    .then((product) => res.json(product), (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Products.findByIdAndUpdate(req.params.productId, {
        $pull: {
            comments: {
                _id: req.params.commentId
            }
        }
    }, {
        new: true
    })
    .then((product) => res.json(product), (err) => next(err))
    .catch((err) => next(err));
});

module.exports = productRouter;