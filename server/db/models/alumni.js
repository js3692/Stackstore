var mongoose = require('mongoose')
// var _ = require('lodash')
var School = require('');
var Schema = mongoose.Schema;

var AlumniSchema = new Schema({
  name: { type: String, required: true },
  picture: {},
  year: { type: Number, required: true},
  school: [{ type: Schema.Types.ObjectId, ref: 'School'}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  complete: { type: Boolean, required: true, default: false },
});

Alumni = mongoose.model('Alumni', AlumniSchema);

module.exports = Alumni;