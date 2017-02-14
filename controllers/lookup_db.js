exports.list = function(req, res) {
    console.log(req.body.columnName);
    console.log(req.body.columnValue);
    res.render('home');
};
