var path = require('path');
var app = require('express')();
exports.app = app;

// HTTPS only
app.all('*', function(req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

// all environments
app.set('port', process.env.PORT || 8000);
app.set('secPort', process.env.PORT || 8443);
app.set('views', path.join(__dirname, 'views'));

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

// view engine
var handlebars = require('./lib/handlebars').getHandlebars();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Add middleware
require('./middleware').use(app);

// routes
require('./routes.js')(app);

// error handling
app.get('*', function(req, res, next) {
    var err = new Error('Path does not exist: ' + req.path);
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    if(err.status !== 404) {
        return next(err);
    }
    res.send(err.message || '** no unicorns here **');
});

app.use(function(err, req, res, next) {
    if (err.status !== 401) {
        return next(err);
    }
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

app.use(function(err, req, res, next) {
    res.status(500).send({status:500, message: 'oops! something broke', type:'internal'});
});
