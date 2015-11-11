'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Item = mongoose.model('Item');
var Animal = mongoose.model('Animal');

// Current URL: '/api/items'
router.put('/:id', function (req, res, next) {
	var itemToUpdate;
	Item.findById(req.params.id)
		.then(function (item) {
			return item.incrQuant(Number(req.body.quantity));
		})
		.then(function (item) {
			itemToUpdate = item;
			return Animal.findById(item.animal)

		}).then(function (animal) {
			animal.decrInventory(Number(req.body.quantity));
			res.status(201).json(itemToUpdate);
		})
		.catch(next);
});