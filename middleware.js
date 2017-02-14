exports.use = function(app) {
    app.use(function (req, res, next) {
        res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
        next();
    });
    app.use(function (req, res, next) {
        if (!res.locals.partials) res.locals.partials = {};
        res.locals.partials.weather = require('./lib/weather').getWeatherData();
        next();
    });
    app.use(require('body-parser')());
    var session = require('express-session');
    var FileStore = require('session-file-store')(session);
    app.use(session({
        name: 'session-id',
        secret: '12345-67890-09876-54321',
        saveUninitialized: true,
        resave: true,
        store: new FileStore()
    }));
    app.use(function (req, res, next) {
        // if there's a flash message, transfer
        // it to the context, then clear it
        res.locals.flash = req.session.flash;
        delete req.session.flash;
        next();
    });

    // authenticate
    require('./lib/authenticate').config_passport(app);

    // connect db
    var mysql = require('mysql');
    var connection  = require('express-myconnection');
    app.use(
        connection(mysql, {
            host: 'localhost',
            user: 'root',
            password : '',
            // port : 3306, //port mysql
            database:'test'
        },'pool')
    );

    // require login
    // app.use(require('./middlewares/auth').requireLogin());

    app.use(require('express').static(require('path').join(__dirname, 'public')));

    // log settings
    switch(app.get('env')) {
        case 'development':
            // compact, colorful dev logging
            app.use(require('morgan')('dev'));
            break;
        case 'production':
            // module 'express-logger' supports daily log rotation
            app.use(require('express-logger')({
                path: '/var/log/anxin.log'
            }));
            break;
    }
};
