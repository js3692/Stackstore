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

function cartInit (req) {
	Cart.create()
	.then(function (newCart) {
		req.session.cart = newCart;
	});
}

router.use(function (req, res, next) {
	if (req.session.cart) next();
	else {
		if (req.user) { // ==> if a user is logged in
			Cart.find({ user: req.user._id })
			.then(function (cart) {
				if (cart) req.session.cart = cart; // Get the "personal" cart and attach it to req.session
				else cartInit(req); // Create a new cart and attach it to req.session
			});
		} else { // ==> if a user is not logged in, i.e. guest
			cartInit(req); // Create a new cart and attach it to req.session
		}
	}
});

// === Below here, all middlewares have a req.session.cart

router.get('/', function (req, res) {
	res.json(req.session.cart);
});

router.put('/', function (req, res, next) {
	var cart = req.session.cart;
	cart.animals.push(req.body.animal);
	// If quantity's >= 2, look inside req.body.quantity and push that many times
	cart.save()
	.then (function (savedCart) {
		res.json(savedCart);
	}).catch(next);
});

// router.delete('/', function (req, res, next) {

// });