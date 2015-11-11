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
	if (!req.user) { // ==> if a user is not logged in
		if (!req.session.cart) { // ==> if there is no cart, make new one
			Cart.create({})
			.then(function (newCart) {
				req.session.cart = newCart;
				next();
			}).catch(next);
		} else { // ==> if there is a cart, good.
			Cart.findById(req.session.cart._id).populate('items')
			.then(function (populatedCart) {
				req.session.cart = populatedCart;
				next();
			}).catch(next);
		}
	} else {
		Cart.findById(req.session.cart._id).populate('items')
			.then(function (populatedCart) {
				req.session.cart = populatedCart;
				next();
			}).catch(next);
	}
});

// === Below here, all middlewares have a req.session.cart

router.get('/me', function (req, res) {
	res.json(req.session.cart);
});

router.put('/me', function (req, res, next) {
	var animal, item;
	Animal.findById(req.body.animal)
		.then(function (animalToSave) {
			animal = animalToSave;
			return Item.create({
				animal: animalToSave,
				quantity: req.body.quantity
			});
		})
		.then(function (createdItem) {
			item = createdItem;
			return Cart.findById(req.session.cart._id);
		})
		.then(function (fetchedCart) {
			return fetchedCart.addItem(item._id);
		})
		.then(function (newCart) {
			console.log(newCart);
			req.session.cart = newCart;
			return animal.decrInventory(req.body.quantity);
		})
		.then(function () {
			res.status(201).json(animal);
		}).catch(next);
});

router.delete('/me/:itemId', function (req, res, next) {
	Cart.findById(req.session.cart._id)
		.then(function (fetchedCart) {
			return fetchedCart.deleteItem(req.params.itemId);
		})
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