const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const path = require("path");
const fs = require("fs");
const shortid = require('shortid');

const authenticate = require('../authenticate');

const router = express.Router();

router.use(bodyParser.json());


const multer = require("multer");

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const subirArchivo = async (req,res,next) =>{
    const upload = multer({
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                //cb(null, __dirname + '/../uploads')
                console.log(process.env.MEDIA_URL);
                cb(null, process.env.MEDIA_URL+'images/products/')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`)
            }
        })
    }).single('file');
    upload(req, res, async (error) =>{
        console.log(req.file);
        res.json({archivo: req.file.filename});
    })
}


router.post("/image", subirArchivo

);

module.exports = router;
