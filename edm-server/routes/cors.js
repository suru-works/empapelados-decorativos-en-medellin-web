const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = [
    'https://www.empapeladosdecorativosenmedellin.com:3443/',
    'https://www.empapeladosdecorativosenmedellin.com/'
];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true,
                        methods: ['GET', 'PUT', 'POST']
                     };
    }
    else {
        corsOptions = { origin: false,
                        methods: ['GET', 'PUT', 'POST'] 
                      };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);