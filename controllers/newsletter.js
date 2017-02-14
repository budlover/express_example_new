exports.newsletter = function (req, res) {
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('newsletter', {csrf: 'CSRF token goes here'});
};
