'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Animal = mongoose.model('Animal');

//var ensureAuthenticated = function (req, res, next) {
//    if (req.isAuthenticated()) {
//        next();
//    } else {
//        res.status(401).end();
//    }
//};

// Current URL: '/api/animals'

router.param('id', function(req, res, next, id) {
   Animal.findById(id).then(function(animal){
       req.animal = animal;
       next();
   }).catch(next);
});

router.get('/', function (req, res, next) {
	if (req.query) {
		Animal.find({ animalName: new RegExp(req.query.name, "i")}).then(function (animals) {
			res.json(animals);
		}).catch(next);
	} else {
		Animal.find().then(function (animals) {
			res.json(animals);
		}).catch(next);
	}
});

router.post('/', function (req, res, next) {
	Animal.create(req.body)
	.then(function (newAnimal) {
		res.status(201).json(newAnimal);
	}).catch(next);
});

//get all animals add to results instead
router.get('/:id', function (req, res) {
    res.status(200).json(req.animal);
});

router.put('/:id', function (req, res, next) {
    _.extend(req.animal, req.body);
    req.animal.save()
	.then(function (updatedAnimal) {
		res.status(200).json(updatedAnimal);
	}).catch(next);
});

router.post('/:id/addReview', function (req, res, next) {
	var animal = req.animal;
	animal.reviews.push(req.body._id);
	animal.save()
	.then(function (animal) {
		req.animal = animal; // ==> may not be necessary
		res.send(201).json(req.animal);
	}).catch(next);
});