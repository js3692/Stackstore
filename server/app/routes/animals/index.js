'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Animal = mongoose.model('Animal');
var Review = mongoose.model('Review');

var ensureAuthenticated = function (req, res, next) {
    if (req.user) next();
    else res.status(401).end();
};

// middleware to check if user is admin.
function ensureAdmin(req, res, next) {
    if(req.user && req.user.isAdmin) next();
    else res.status(401).end();
}

// Current URL: '/api/animals'


//creates req.animal for requests with id param and attaches all reviews 
router.param('id', function(req, res, next, id) {
//    req.toSend = {};
    Animal.findById(id)
        .then(function(animal){
            req.animal = animal;
            next();
//            return Review.findReviewsByAnimal(animal._id);
        }).catch(next);
//        .then(function(reviews) {
//            req.toSend.reviews = reviews;
//            next();
//        }).catch(next);
});

router.get('/', function (req, res, next) {
    Animal.find({}).then(function (animals) {
        res.json(animals);
    }).catch(next);
//	}
});

router.post('/', ensureAdmin, function (req, res, next) {
    //check if animal name is unique
    Animal.checkIfUnique(req.body.name)
        .then(function(isUnique) {
        if(isUnique) {
            Animal.create(req.body)
            .then(function (newAnimal) {
                res.status(201).json(newAnimal);
            }).catch(next);
        } else {
            var validationError = new Error();
            validationError.message = 'Animal name is not unique';
            next(validationError);
        }   
    })
});

//get all animals add to results instead
router.get('/:id', function (req, res) {
    res.status(200).json(req.animal);
});


router.put('/:id', ensureAdmin, function (req, res, next) {
    _.extend(req.animal, req.body);
    req.animal.save()
	.then(function () {
		res.status(200).json(req.animal);
	}).catch(next);
});

router.post('/:id/reviews', ensureAuthenticated, function (req, res, next) {
    var review = req.body;
    review.animal = req.animal._id;
    Review.create(review)
        .then(function(newReview) {
            res.status(201).json(newReview);        
        }).catch(next);
});