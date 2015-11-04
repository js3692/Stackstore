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
router.param('id', function(req, res, next, id) {
   Animal.findById(id).then(function(animal){
       req.animal = animal;
       next();
   }).catch(next);
});

router.use('/', function(req, res, next) {
  console.log('here');
  next();
});
// Current URL: '/api/animals'
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
		res.json(newAnimal);
	}).catch(next);
});

//get all animals add to results instead
router.get('/:id', function (req, res, next) {
    res.json(req.animal);
});

router.put('/:id', function (req, res, next) {
	Animal.update({ _id: req.animal.id }, { $set: req.body })
	.then(function (updatedAnimal) {
		res.json(updatedAnimal);
	}).catch(next);
});

router.post('/:id/addReview', function (req, res, next) {
    res.json(req.animal);
});