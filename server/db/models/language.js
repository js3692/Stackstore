'use strict';
var mongoose = require('mongoose');

var languageSchema = new mongoose.Schema({
    language: { 
        type: String,
        required: true        
    }
});

mongoose.model('Language', languageSchema);