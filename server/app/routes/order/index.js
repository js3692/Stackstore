'use strict';
var router = require('express').Router();
module.exports = router;
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());
var mandrill = require('mandrill-api/mandrill');
var mdClient = new mandrill.Mandrill('68yA4Bp41FKbX9tv7NkcFg');
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Order = mongoose.model('Order');
var Animal = mongoose.model('Animal');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');

//var ensureAuthenticated = function (req, res, next) {
//    if (req.isAuthenticated()) {
//        next();
//    } else {
//        res.status(401).end();
//    }
//};

// Current URL: '/api/order'

router.get('/', function (req, res, next) {
	Order.find().populate('items')
	.then(function (allOrders) {
		res.status(200).json(allOrders);
	}).catch(next);
});

router.post('/', function (req, res, next) {
	var newOrder;
	Order.create({
		user: req.user._id,
		status: 'Created',
		items: req.session.cart.items,
		date: new Date(),
		shippingAddr: req.body.shipTo
	})
	.then(function (createdOrder) {
		newOrder = createdOrder;
		return Cart.findById(req.session.cart._id);
	})
	.then(function (foundCart) {
		foundCart.items = [];
		return foundCart.save();
	})
	.then(function (emptyCart) {
		res.status(201).json(emptyCart);
	}).catch(next);
});

router.param('id', function(req, res, next, id) {
   Order.findById(id).then(function (order) {
       req.order = order;
       next();
   }).catch(next);
});

router.get('/:id', function (req, res, next) {
	res.json(req.order);
});

router.put('/:id', function (req, res, next) {
	req.order.status = req.body.status;
	req.order.save()
	.then(function (savedOrder) {
		console.log('this is the savedorder', savedOrder);
        User.findById(savedOrder.user).then(function (user) {
           mdClient.messages.send({
	            message: {
		              html: "<a href=\"http://localhost:1337/signup\">Click here to log in and reset your password</a>",
		              text: "Your Order Status",
		              subject: "Your Order Status Has Been Changed To" + savedOrder.status,
		              from_email: "no-reply@TheLifeExotic.com",
		              from_name: "The Life Exotic",
		              to: [{
		                      email: user.email,
		                      name: "Curator",
		                      type: "to"
		                  }],
	            },
              	async: false, 
              	ip_pool: "Main Pool"
	           }, function(result) {
	                console.log(result)
	              },
	                function(e) {
	                     // Mandrill returns the error as an object with name and message keys
	                      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	                    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
          })
        	
        })
		res.status(201).json(savedOrder);
	}).catch(next);
});

router.delete('/:id', function (req, res, next) {
	req.order.remove().exec()
	.then(function () {
		res.sendStatus(201);
	});
});