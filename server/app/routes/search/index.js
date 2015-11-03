'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Product = mongoose.model('Product');

//var ensureAuthenticated = function (req, res, next) {
//    if (req.isAuthenticated()) {
//        next();
//    } else {
//        res.status(401).end();
//    }
//};

// Current URL: '/api/search'

router.get('/', function (req, res, next) {
	if (req.query) {
		// req.query.name should be a substring of animalName
		Product.find({ animalName: req.query.name }).then(function (products) {
			res.json(products);
		}).catch(next);
	}
	else {
		Product.find().then(function (products) {
			res.json(products);
		}).catch(next);
	}
});