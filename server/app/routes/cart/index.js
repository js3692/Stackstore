'use strict';
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Cart = mongoose.model('Cart');

// var User = mongoose.model('User');

//var ensureAuthenticated = function (req, res, next) {
//    if (req.isAuthenticated()) {
//        next();
//    } else {
//        res.status(401).end();
//    }
//};

// Current URL: '/api/cart'

router.use(function (req, res, next) {
	if (req.session.cart) {
        Cart.findById(req.session.cart._id)
            .then(function(cart) {
                req.session.cart = cart;
                next();
        }).catch(next);
	}
	else {
		if (req.user) { // ==> if a user is logged in
			Cart.find({ user: req.user._id })
			.then(function (cart) {
				if (cart.length) { // Get the "personal" cart and attach it to req.session
					req.session.cart = cart;
					next();
				}	else { // Create a new cart and attach it to req.session
					Cart.create({ user: req.user._id })
					.then(function (newUserCart) {
						req.session.cart = newUserCart;
						next();
					}).catch(next);
				}
			});
		} else { // ==> if a user is not logged in, i.e. guest
			// Create a new cart and attach it to req.session
			Cart.create({})
				.then(function (newCart) {
					req.session.cart = newCart;
					next();
				}).catch(next);
		}
	}
});

// === Below here, all middlewares have a req.session.cart

router.get('/me', function (req, res) {
	res.json(req.session.cart);
});

router.put('/me', function (req, res, next) {
    console.log(req.session.cart);
    var cart = req.session.cart;
    cart.animals.push(req.body.animal);
    cart.save()
        .then(function() {
            res.status(201).json(cart);
        }).catch(next);
});

router.delete('/me/:itemId', function (req, res, next) {
	var toDelete = req.params.itemId;
    var cart = req.session.cart;
    
    cart.deleteAnimalById(toDelete)
	.then(function (updatedCart) {
		res.status(200).json(updatedCart);
	}).catch(next);
});