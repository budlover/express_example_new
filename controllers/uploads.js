var formidable = require('formidable');

exports.upload = function(req, res) {
    var form = new formidable.IncomingForm({
        uploadDir: '/var/tmp'
    });
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/');
    });
};
