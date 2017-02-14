var LocalStrategy = require('passport-local').Strategy;
var User = require('./../models/users');
var config = require('./../config');
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
exports.passport = passport;

exports.config_passport = function (app) {
    app.use(passport.initialize());
    // exports.local = passport.use(new LocalStrategy(User.authenticate()));
    passport.use(facebook_strategy);
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};

var facebook_strategy = new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ OauthId: profile.id }, function(err, user) {
            if(err) {
                console.log(err); // handle errors!
            }
            if (!err && user !== null) {
                done(null, user);
            } else {
                user = new User({
                    username: profile.displayName
                });
                user.OauthId = profile.id;
                user.OauthToken = accessToken;
                user.save(function(err) {
                    if(err) {
                        console.log(err); // handle errors!
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                });
            }
        });
    }
);
