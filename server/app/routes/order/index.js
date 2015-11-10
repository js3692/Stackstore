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
	Order.find()
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
		   User.findById(createdOrder.user).then(function (user) {
	           mdClient.messages.send({
		            message: {
			              html: "<p>Thank you for being part of the Life Exotic<br>\“Animals don’t lie. Animals don’t criticize. If animals have moody days, they handle them better than humans do.\”<br> ― Betty White, If You Ask Me</p>",
			              text: "Your Exotic Zoo is on the Way!",
			              subject: "Your Purchase has been Made",
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
		              html: "<p>Thank you for being part of the Life Exotic<br>\“Until one has loved an animal, a part of one's soul remains unawakened.\”<br>― Anatole France</p>",
		              text: "Your Order Status",
		              subject: "Your Order Status Has Been Changed To " + savedOrder.status,
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