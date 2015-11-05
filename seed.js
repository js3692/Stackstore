/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
//var User = Promise.promisifyAll(mongoose.model('User'));
var Animal = Promise.promisifyAll(mongoose.model('Animal'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

//var seedUsers = function () {
//
//    var users = [
//        {
//            email: 'testing@fsa.com',
//            password: 'password'
//        },
//        {
//            email: 'obama@gmail.com',
//            password: 'potus'
//        }
//    ];
//
//    return User.createAsync(users);
//
//};

var seedAnimals = function () {

    var animals = [
        {
            name: 'Lemur',
            imageUrl: 'http://www.annenbergradio.org/sites/default/files/uploads/images/370/lemur2.jpg?1424828573',
            price: 3000,
            description: 'Has big eyes, from Madagascar, doesn\'t make for a good pet',
            rating: 2,
            conservationStatus: 'Endangered',
            category: ['mammal'],
            inventoryQuantity: 1
        },
        {
            name: 'Box Jellyfish',
            imageUrl: 'http://i.livescience.com/images/i/000/034/425/original/boxjelly.jpg?1355348969',
            price: 2500,
            description: 'Very poisonous, not cuddly. Gelatinous.',
            rating: 1,
            conservationStatus: 'Near Threatened',
            category: ['aquatic'],
            inventoryQuantity: 1
        },
        {
            name: 'Bill Murray',
            imageUrl: 'http://www.fillmurray.com/g/200/300',
            price: 1400,
            description: 'Very poisonous, not cuddly. Gelatinous.',
            rating: 2.4,
            conservationStatus: 'Extinct in the Wild',
            category: ['life aquatic'],
            inventoryQuantity: 1
        }
        
    ];

    return Animal.createAsync(animals);

};

var review = {
    content: 'this is a review',
    stars: 1,
    dangerLevel: 10
};

function seedReview(review) {
    return Review.createAsync(review)
}

connectToDb.then(function () {
    Animal.findAsync({}).then(function (animals) {
        if (animals.length === 0) {
            return seedAnimals();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function(animals) {
        review.animal = animals[0]._id;
        return seedReview(review);
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
