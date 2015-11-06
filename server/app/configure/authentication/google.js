'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: '405639642373-89s6i4f8bdrsb8g3urmht3jui7j089aj.apps.googleusercontent.com',
        clientSecret: '21Ij8QoaOfdSnrftmaR03FUB',
        callbackURL: 'http://localhost:1337/auth/google/callback'
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'google.id': profile.id }).exec()
            .then(function (user) {
                console.log('this is the user', user)
                if (user) {
                    console.log('are we in if', profile)

                    return user;
                } else {
                    console.log('are we in else', profile)

                    return UserModel.create({
                        google: {
                            id: profile._json.id,
                            username: profile._json.name,
                            token: accessToken
                        },
                        email: profile._json.email
                    });
                }

            }).then(function (userToLogin) {
                console.log('this is the userToLogin', userToLogin)
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));
   
    // app.use('/auth/google', function (req, res, next) {

    //     console.log("are you ALIVE")

    // });

    app.get('/auth/google', function (req, res, next) {
        console.log('hellooooo')
        next();
    },
        passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

};
