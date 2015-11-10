'use strict';

var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var Promise = require('bluebird');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	status: {
		type: String,
		enum: ['Created', 'Processing', 'Cancelled', 'Completed']
	},
	items: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item'
	}],
  date: {
		type: Date,
		required: true
  },
  shippingAddr: {
		type: String,
		required: true
  },
  total: {
    type: Number,
    default: 0,
    get: convertFormatToDollars
  }
});

schema.pre('save', function (next) {
	var self = this;
	Promise.map(self.items, function(itemId) {
		return Item.findById(itemId).then(function (item) {
			self.total = (self.total * 100) + (item.animal.price * item.quantity);
		});
	})
	.then(function () {
		next();
	}).catch(next);
});

function convertFormatToDollars (totalInCents) {
    return (totalInCents/100).toFixed(2);
}

schema.statics.getAllOrders = function(userId) {
	return this.find({ user: userId }).sort({ date: -1 }).exec();
};

mongoose.model('Order', schema);