var fs = require('fs');

exports.options =  {
    key: fs.readFileSync(__dirname + '/../private.key'),
    cert: fs.readFileSync(__dirname + '/../certificate.pem')
};
