'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Order = mongoose.model('Order');
var Animal = mongoose.model('Animal');
var Cart = mongoose.model('Cart');

//var ensureAuthenticated = function (req, res, next) {
//    if (req.isAuthenticated()) {
//        next();
//    } else {
//        res.status(401).end();
//    }
//};

// Current URL: '/api/order'

router.get('/', function (req, res, next) {
	Order.find()
	.then(function (allOrders) {
		res.status(200).json(allOrders);
	}).catch(next);
});

router.post('/', function (req, res, next) {
	var newOrder;
	Order.create({
		user: req.user._id,
		status: 'Created',
		items: req.session.cart.items,
		date: new Date(),
		shippingAddr: req.body.shipTo
	})
	.then(function (createdOrder) {
		newOrder = createdOrder;
		return Cart.findById(req.session.cart._id);
	})
	.then(function (foundCart) {
		foundCart.items = [];
		return foundCart.save();
	})
	.then(function (emptyCart) {
		res.status(201).json(emptyCart);
	}).catch(next);
});

router.param('id', function(req, res, next, id) {
   Order.findById(id).then(function (order) {
       req.order = order;
       next();
   }).catch(next);
});

router.get('/:id', function (req, res, next) {
	res.json(req.order);
});

router.put('/:id', function (req, res, next) {
	req.order.status = req.body.status;
	req.order.save()
	.then(function (savedOrder) {
		res.status(201).json(savedOrder);
	}).catch(next);
});

router.delete('/:id', function (req, res, next) {
	req.order.remove().exec()
	.then(function () {
		res.sendStatus(201);
	});
});