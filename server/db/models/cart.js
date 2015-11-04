'use strict';

var mongoose = require('mongoose');


var CartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	animals: {
		type: [mongoose.Schema.Types.ObjectId],
		ref:'Animal'
	}
});

mongoose.model('Cart', CartSchema);
