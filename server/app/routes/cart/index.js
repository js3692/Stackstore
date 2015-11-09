'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Cart = mongoose.model('Cart');
var Item = mongoose.model('Item');
var Animal = mongoose.model('Animal');

// Current URL: '/api/cart'

router.use(function (req, res, next) {
	if (req.session.cart) {
    Cart.findById(req.session.cart._id).populate('items')
      .then(function(cart) {
        req.session.cart = cart;
        next();
      }).catch(next);
	}
	else {
		if (req.user) { // ==> if a user is logged in
			Cart.find({ user: req.user._id }).populate('items')
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
	var animal;
	Animal.findById(req.body.animal)
	.then(function (animalToSave) {
		animal = animalToSave;
		return Item.create({ animal: animalToSave, quantity: req.body.quantity });
	})
	.then(function (createdItem) {
		return req.session.cart.addItem(createdItem._id);
	})
  .then(function (newCart) {
		req.session.cart = newCart;
		return animal.decrInventory(req.body.quantity);
  })
  .then(function () {
    res.status(201).json(animal);
  }).catch(next);
});

router.delete('/me/:itemId', function (req, res, next) {
	req.session.cart.deleteItem(req.params.itemId)
		.then(function () {
			return Item.findById(req.params.itemId);
		})
		.then(function (deletedItem) {
			return Animal.findById(deletedItem.animal._id)
				.then(function (animalToReplenish) {
					return animalToReplenish.incrInventory(deletedItem.quantity);
				});
		})
		.then(function () {
			return Cart.findById(req.session.cart._id).populate('items');
		})
		.then(function (updatedCart) {
			res.status(200).json(updatedCart);
		}).catch(next);
});