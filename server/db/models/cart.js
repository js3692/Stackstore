'use strict';

var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	animals: {
		type: [mongoose.Schema.Types.ObjectId],
		ref:'Animal'
	}
});

CartSchema.methods.deleteAnimalById = function(animalId) {
  this.animals.pull(animalId);
  return this.save();
};

CartSchema.methods.addItem = function(animalId, quantity) {
  for (var i = 0; i < quantity; i++) {
		this.animals.push(animalId);
  }
  return this.save();
};

mongoose.model('Cart', CartSchema);
