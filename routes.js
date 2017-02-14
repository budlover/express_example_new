var home = require('./controllers/home');
var about = require('./controllers/about');
var users = require('./controllers/users');
var testtable = require('./controllers/testtable');

module.exports = function(app) {
    app.use('/', home);
    app.use('/about', about);
    app.get('/newsletter', require('./controllers/newsletter').newsletter);
    app.post('/process', require('./controllers/process').process);
    app.get('/contest/photo', require('./controllers/photo').photo);
    app.post('/contest/photo/:year/:month', require('./controllers/uploads').upload);
    app.use('/testtable', testtable);
    app.use('/users', users);
// app.post('/lookup_db', require('./controllers/lookup_db').list);
};
