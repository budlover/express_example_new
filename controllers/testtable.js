const util = require('util');
var router = require('express').Router();

var lookup_db = function(req, res){
    console.log(req.body.columnName);
    console.log(req.body.columnValue);
    var queryStr = 'SELECT * FROM pet';
    if (req.body.columnName && req.body.columnValue) {
        queryStr += util.format(' WHERE %s="%s"', req.body.columnName, req.body.columnValue);
    }
    req.getConnection(function(err, connection) {
        var query = connection.query(queryStr, function(err,rows){
            if(err) console.log("Error Selecting: %s ",err );
            console.log(rows);
            res.render('testtable', {
                page_title:"Anxin Table",
                data:rows
            });
        });
    });
};

router.post('/', lookup_db);
router.get('/', lookup_db);

module.exports = router;
