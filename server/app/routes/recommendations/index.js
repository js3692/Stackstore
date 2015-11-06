'use strict';
var router = require('express').Router();
module.exports = router;
//var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');


var recEngine = require('./engine.js');



// Current URL: '/api/recommendations'

router.get('/:id', function (req, res, next) {
    var itemToMatch = req.params.id;
    recEngine(itemToMatch)
        .then(function(recommendedAnimals) {
            res.status(200).json(recommendedAnimals);
        }).catch(next);
});

