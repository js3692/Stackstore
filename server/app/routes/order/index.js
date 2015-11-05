'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Order = mongoose.model('Order');
var Animal = mongoose.model('Animal');

//var ensureAuthenticated = function (req, res, next) {
//    if (req.isAuthenticated()) {
//        next();
//    } else {
//        res.status(401).end();
//    }
//};

// Current URL: '/api/orders'

router.get('/', function (req, res, next) {
	Order.find()
	.then(function (allOrders) {
		res.status(200).json(allOrders);
	}).catch(next);
});

router.post('/', function (req, res, next) {
	//	req.body should have the animal document._id's in it
	//	and also a shipping address

	Animal.find({ _id: { $in: req.body.id }})
	.then(function (animalsToBuy) {
		animalsToBuy.map(function(animal) {
			return animal.toObject();
		});
		return Order.create({
			user: req.user._id,
			status: 'Created',
			animals: animalsToBuy,
			date: new Date(),
			shippingAddr: req.body.shippingAddr
		});
	})
	.then(function (newOrder) {
		res.status(201).json(newOrder);
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