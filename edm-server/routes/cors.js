const cors = require('cors');

const whitelist = [
    'https://www.empapeladosdecorativosenmedellin.com:3443/',
    'https://www.empapeladosdecorativosenmedellin.com/',
    'https://api.empapeladosdecorativosenmedellin.com/',
    'http://localhost:3000/'
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
exports.corsWithOptions = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);