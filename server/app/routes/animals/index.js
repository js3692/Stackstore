'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Animal = mongoose.model('Animal');
var Review = mongoose.model('Review');

//var ensureAuthenticated = function (req, res, next) {
//    if (req.isAuthenticated()) {
//        next();
//    } else {
//        res.status(401).end();
//    }
//};

// Current URL: '/api/animals'


//creates req.animal for requests with id param and attaches all reviews 
router.param('id', function(req, res, next, id) {
    req.toSend = {};
    Animal.findById(id)
        .then(function(animal){
            req.toSend.animal = animal;
            return Review.findReviewsByAnimal(animal._id);
        })
        .then(function(reviews) {
            req.toSend.reviews = reviews;
            next();
        }).catch(next);
});

router.get('/', function (req, res, next) {
//	if (req.query) {
//		Animal.find({ name: new RegExp(req.query.name, "i")}).then(function (animals) {
//			res.json(animals);
//		}).catch(next);
//	} else {
    Animal.find({}).then(function (animals) {
        res.json(animals);
    }).catch(next);
//	}
});

router.post('/', function (req, res, next) {
	Animal.create(req.body)
	.then(function (newAnimal) {
		res.status(201).json(newAnimal);
	}).catch(next);
});

//get all animals add to results instead
router.get('/:id', function (req, res) {
    res.status(200).json(req.toSend);
});


router.put('/:id', function (req, res, next) {
    _.extend(req.toSend.animal, req.body);
    req.toSend.animal.save()
	.then(function (updatedAnimal) {
		res.status(200).json(req.toSend);
	}).catch(next);
});

router.post('/:id/reviews', function (req, res, next) {
    var review = req.body;
    review.animal = req.toSend.animal._id;
    Review.create(review)
        .then(function(newReview) {
            res.status(201).json(newReview);        
        }).catch(next);
});