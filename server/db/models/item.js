'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	// Here, the animal is a snapshot of the animal at the time of the item's creation
	animal: {
		type: Object,
		set: takeSnapshot,
		required: true
	},
	quantity: {
		type: Number,
		default: 1
	}
});

function takeSnapshot (animal) {
	return animal.toObject();
}

schema.methods.incrQuant = function (quantity) {
	quantity = quantity || 1;
  this.quantity += quantity;
  return this.save();
};

schema.methods.decrQuant = function (quantity) {
	quantity = quantity || 1;
	this.quantity -= quantity;
  return this.save();
};

mongoose.model('Item', schema);