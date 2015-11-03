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

// Current URL: '/api/animals'

router.param('id', function(req, res, next, id) {
   Product.findById(id).then(function(product){
       req.product = product;
   }).catch(next); 
});

router.get('/', function (req, res, next) {
	if (req.query) {
		// req.query.name should be a substring of animalName
		Product.find({ animalName: new RegExp(req.query.name, "i")}).then(function (products) {
			res.json(products);
		}).catch(next);
	} else {
		Product.find().then(function (products) {
			res.json(products);
		}).catch(next);
	}
});

//get all products add to results instead
router.get('/:id', function (req, res, next) {
    res.json(product);
});
