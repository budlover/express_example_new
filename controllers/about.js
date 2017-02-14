var fortune = require('../lib/fortune');
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

module.exports = router;
