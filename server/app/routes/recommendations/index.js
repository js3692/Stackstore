'use strict';
var router = require('express').Router();
module.exports = router;
//var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Order = mongoose.model('Order');
var recEngine = require('./engine.js');



// Current URL: '/api/recommendations'

router.get('/:id', function (req, res, next) {
    
    var itemToMatch = req.params.id;
    
    Order.find({})
        .then(function (allOrders) {
            var recommendations = recEngine(allOrders, itemToMatch);
            res.status(200).json(recommendations);
        }).catch(next);
});

