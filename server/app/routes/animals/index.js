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

// GTND: good good
router.param('id', function(req, res, next, id) {
   Animal.findById(id).then(function(animal){
       req.animal = animal;
       next();
   }).catch(next);
});

router.get('/', function (req, res, next) {
  // GTND: maybe say var query = req.query ? { animalName: new RegExp(req.query.name, "i")} : {}
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

// GTND: POST '/animals/:id/reviews' (RESTful)
router.post('/:id/addReview', function (req, res, next) {
	var animal = req.animal;
  // GTND: req.body shouldn't have an id...
	animal.reviews.push(req.body._id);
	animal.save()
	.then(function (savedAnimal) {
		req.animal = savedAnimal; // ==> may not be necessary
		res.status(201).json(req.animal);
	}).catch(next);
});
