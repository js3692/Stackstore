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

CartSchema.methods.deleteOneItem = function(animalId) {
  var index = this.animals.indexOf(animalId);
  if (index > -1) this.animals.splice(index, 1);
  return this.save();
}

mongoose.model('Cart', CartSchema);
