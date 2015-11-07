'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Review = mongoose.model('Review');

// Current URL: '/api/reviews'
router.get('/', function (req, res, next) {
    Review.find({}).then(function (reviews) {
        res.json(reviews);
    }).catch(next);
});

router.post('/', function(req, res, next) {
    Review.create(req.body)
        .then(function(review) {
            res.json(review);    
        }).catch(next);
});

