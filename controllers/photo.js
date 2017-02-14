var formidable = require('formidable');

exports.photo = function(req, res) {
    var now = new Date();
    res.render('contest/photo', {
        year: now.getFullYear(),
        month: now.getMonth()
    });
};
