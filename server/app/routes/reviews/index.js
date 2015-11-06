'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
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

// Current URL: '/api/reviews'


router.get('/', function (req, res, next) {
    Review.find({}).then(function (reviews) {
        res.json(reviews);
    }).catch(next);
//	}
});

