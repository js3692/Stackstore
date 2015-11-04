'use strict';

var mongoose = require('mongoose');

// GTND: will this be used for order history too?

var CartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	animals: [{
    quantity: Number,
    price: Number,
    animal:{
  		type: [mongoose.Schema.Types.ObjectId],
  		ref:'Animal'
    }
	}]
});

// GTND: maybe .pull? or _.pull? (ok don't do this then)
CartSchema.methods.deleteOneItem = function(animalId) {
  var index = this.animals.indexOf(animalId);
  if (index > -1) this.animals.splice(index, 1);
  return this.save();
};

// GTND: probably better to have the object in the array have a quantity
CartSchema.methods.addItem = function(animalId, quantity) {
  for (var i = 0; i < quantity; i++) {
		this.animals.push(animalId);
  }
  return this.save();
};

mongoose.model('Cart', CartSchema);
