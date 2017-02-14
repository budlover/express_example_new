exports.requireLogin = function() {
    return function middleware(req, res, next) {
        console.log(req.headers);

        if (!req.session.user) {
            var authHeader = req.headers.authorization;
            if (!authHeader) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            }
            var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
            var user = auth[0];
            var pass = auth[1];
            if (user == 'admin' && pass == 'password') {
                req.session.user = 'admin';
                next();
            } else {
                var err = new Error('You are not authenticated! Only allow user "admin"');
                err.status = 401;
                return next(err);
            }
        } else {
            if (req.session.user === 'admin') {
                console.log('req.session: ', req.session);
                next();
            } else {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                next(err);
            }
        }
    };
};
