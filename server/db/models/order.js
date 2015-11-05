'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	animals: {
		// Each object will be a snapshot of the
		// animal document at the time of the purchase.
		// For example,
		// {
		//	_id: "39393393933939339393",
		//	name: "John the Alaskan snow leopard",
		//	imageUrl: "www.google.com/billmurray",
		//	price: 20000,
		//	description: "Pet me if you can",
		//	category: ["Dangerous", "Very rare"],
		//	countryCoude: ['US'],
		//	conservationStatus: "Endangered",
		//	rating: 3
		// }
		type: [Object],
		required: true
	},
  total: {
    type: Number,
    required: true
  },
  date: {
		type: Date,
		required: true
  },
  shippingAddr: {
		type: String
  }
});

schema.statics.getAllOrders = function(userId) {
	return this.find({ user: userId }).sort({ date: -1 }).exec();
};

mongoose.model('Order', schema);