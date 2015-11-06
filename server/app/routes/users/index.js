'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Animal = mongoose.model('Animal');
var User = mongoose.model('User');


// middleware to check if user is admin.
function ensureAdmin(req, res, next) {
    if(req.user && req.user.isAdmin) next();
    else res.status(401).end();
}

// Current URL: '/api/users'

router.param('id', function(req, res, next, id) {
    User.findById(id)
        .then(function(user) {
            req.userToUpdate = user;     
            next();
        });
})

//Promote user to admin
router.post('/:id/admin', ensureAdmin, function (req, res, next) {
    console.log('in here')
    req.userToUpdate.isAdmin = true;
    req.userToUpdate
        .save()
        .then(function(user) {
            res.status(200).send(user);
        }).catch(next);
});

//Delete a user

router.delete('/:id', ensureAdmin, function(req, res, next) {
    req.userToUpdate.remove()
        .then(function() {
            res.status(200).end();
        }).catch(next);
});

//Trigger password reset

router.put('/:id/password', ensureAdmin, function(req, res, next){
    
})