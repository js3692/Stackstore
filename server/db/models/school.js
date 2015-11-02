'use strict';
var mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    schoolAdmin: {
        type: mongoose.Schema.Types.ObjectId, ref: 'schoolAdmin'
    },
    images: { 
      type: [String]
    }
});


mongoose.model('School', schoolSchema);