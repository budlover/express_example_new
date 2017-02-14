exports.getHandlebars = function () {
    var hbs = require('express3-handlebars');
    return hbs.create({
        defaultLayout: 'main',
        helpers: {
            showNull: function(value, options) {
                console.log(value);
                if(value == null) {
                    return "null";
                }
                return value;
            },
            static: function(name) {
                return require('./static.js').map(name);
            }
            // More helpers...
        }
    });
};
