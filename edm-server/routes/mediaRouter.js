const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const path = require("path");
const fs = require("fs");
const shortid = require('shortid');

const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink);

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

const eliminarArchivo = async (req,res,next) => {

    try {
        fs.unlinkSync(process.env.MEDIA_URL+'images/products/'+req.params.fileId);        
    } catch (error) {
        //console.log(error);
        //  res.json({error: error.code});
        //res.statusCode = 500;
        res.status(500).json({msg: 'Error al eliminar el archivo'});
    }
    
}



router.post("/image", subirArchivo

);


router.delete("/image/:fileId", eliminarArchivo

);

module.exports = router;
