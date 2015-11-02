'use strict'
var mongoose = require('mongoose');
var Product = require('./product.js');

var CartSchema = new mongoose.Schema({
	product: {
		type: [mongoose.Schema.Types.ObjectId],
		ref:'Product'
	}
})

mongoose.model('Cart', CartSchema);
