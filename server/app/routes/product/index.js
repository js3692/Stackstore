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

router.param('id', function(req, res, next, id) {
   Product.findById(id).then(function(){
       
   }).catch(next); 
});


//get all products
router.get('/', function (req, res, next) {
    Product.find({}).then(function(products) {
        res.send(products);
    }).catch(next);
});

