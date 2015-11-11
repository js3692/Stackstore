'use strict';
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
mongoose.Promise = require('bluebird');

function logIn(req, res, next) {
    var authCb = function (err, user) {

        if (err) return next(err);

        if (!user) {
            var error = new Error('Invalid login credentials.');
            error.status = 401;
            return next(error);
        }

        if(req.session.cart) {
            var cartIdToUse;
            Cart.findOne({ user: user._id })
            .then(function (fetchedCart) { // ==> See if this user already has a cart in db
                if (!fetchedCart) { // ==> if he doesn't, then append user id on to the session cart
                    cartIdToUse = req.session.cart._id;
                    return Cart.update({ _id: req.session.cart._id },
                        {
                            user: user._id,
                            items: req.session.cart.items
                        });
                } else { // ==> if he already has a cart in db, then combine the session cart with the fetched cart
                    cartIdToUse = fetchedCart._id;
                    return Cart.update({ _id: fetchedCart._id },
                        {
                            $push: { items: { $each: req.session.cart.items } }
                        })
                        .then(function () {
                            return Cart.remove({ _id: req.session.cart._id });
                        })
                }
            })
            .then(function () {
                return Cart.findById(cartIdToUse).populate('items');
            })
            .then(function (updatedCart) {
                req.logIn(user, function (loginErr) {
                    if (loginErr) return next(loginErr);
                    req.session.cart = updatedCart;
                    // We respond with a response object that has user with _id and email.
                    res.status(200).send({
                        user: _.omit(user.toJSON(), ['password', 'salt'])
                    });
                });
            }, next);
        } else {
            Cart.findOne({ user: user._id })
            .then(function (cart) {
                if (!cart) return  Cart.create({ user: user._id });
                else return cart;
            })
            .then(function (fetchedCart) {
                // req.logIn will establish our session.
                req.logIn(user, function (loginErr) {
                    if (loginErr) return next(loginErr);
                    req.session.cart = fetchedCart;
                    // We respond with a response object that has user with _id and email.
                    res.status(200).send({
                        user: _.omit(user.toJSON(), ['password', 'salt'])
                    });
                });
            }, next);
        }

    };

    passport.authenticate('local', authCb)(req, res, next);
}

module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({ email: email })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {
        logIn(req, res, next);
    });
    
    app.post('/signup', function(req, res, next) {
        User.create(req.body)
            .then(function() {
                logIn(req, res, next);
            }).catch(next);
    });

};
