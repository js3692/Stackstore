'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	items: {
		type: [{}]
	}
});

schema.methods.deleteItem = function (itemId) {
  this.items.pull(itemId);
  return this.save();
};

schema.methods.addItem = function (itemId) {
	this.items.push(itemId);
  return this.save();
};

mongoose.model('Cart', schema);