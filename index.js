var http = require('http');
var https = require('https');
var app = require('./server').app;
var options = require('./lib/https_keys').options;

// HTTP
http.createServer(app).listen(app.get('port'), function() {
    console.log(
        'Express started in ' + app.get('env') +
        ' mode on http://localhost:' + app.get('port') +
        '; press Ctrl-C to terminate.'
    );
});

// HTTPS
https.createServer(options, app).listen(app.get('secPort'), function() {
    console.log(
        'Express started in ' + app.get('env') +
        ' mode on http://localhost:' + app.get('secPort') +
        '; press Ctrl-C to terminate.'
    );
});
