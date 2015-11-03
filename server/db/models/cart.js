'use strict'

var mongoose = require('mongoose');
var Product = require('./product.js');

var CartSchema = new mongoose.Schema({
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'User',
	// 	required: true
	// },
	products: {
		type: [mongoose.Schema.Types.ObjectId],
		ref:'Product',
		required: true
	}
})

mongoose.model('Cart', CartSchema);
