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
mongoose.Promise = Promise;
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Animal = Promise.promisifyAll(mongoose.model('Animal'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Order = Promise.promisifyAll(mongoose.model('Order'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            isAdmin: true
        }
    ];

    return User.createAsync(users);

};

var seedAnimals = function () {

    var animals = [
        {
            name: 'Lemur',
            imageUrl: 'http://travlanders.com/class/wp-content/uploads/sites/8/2014/09/lemur-mom-baby.jpg',
            price: 3000,
            description: 'Has big eyes, from Madagascar, doesn\'t make for a good pet',
            rating: 2,
            conservationStatus: 'Endangered',
            category: ['mammal'],
            inventoryQuantity: 1
        },
        {
            name: 'Box Jellyfish',
            imageUrl: 'http://media.cirrusmedia.com.au/RD_Media_Library/RE_WEB_IMAGES/General/Box-jellyfish.jpg?width=300&height=300&mode=max',
            price: 2500,
            description: 'Very poisonous, not cuddly. Gelatinous.',
            rating: 1,
            conservationStatus: 'Near Threatened',
            category: ['aquatic'],
            inventoryQuantity: 1
        },
        {
            name: 'Bill Murray',
            imageUrl: 'http://www.fillmurray.com/g/300/300',
            price: 1400,
            description: 'Very poisonous, not cuddly. Gelatinous.',
            rating: 2.4,
            conservationStatus: 'Extinct in the Wild',
            category: ['life aquatic'],
            inventoryQuantity: 1
        },
        {
            name: 'Fill Murray',
            imageUrl: 'http://www.fillmurray.com/g/300/300',
            price: 1400,
            description: 'Very poisonous, not cuddly. Gelatinous.',
            rating: 2.4,
            conservationStatus: 'Extinct in the Wild',
            category: ['life aquatic'],
            inventoryQuantity: 1
        },
        {
            name: 'Phil Murray',
            imageUrl: 'http://www.fillmurray.com/g/300/300',
            price: 1400,
            description: 'Very poisonous, not cuddly. Gelatinous.',
            rating: 2.4,
            conservationStatus: 'Extinct in the Wild',
            category: ['life aquatic'],
            inventoryQuantity: 1
        },
        {
            name: 'Steve Zissou',
            imageUrl: 'http://www.fillmurray.com/g/300/300',
            price: 1400,
            description: 'Very poisonous, not cuddly. Gelatinous.',
            rating: 2.4,
            conservationStatus: 'Extinct in the Wild',
            category: ['life aquatic'],
            inventoryQuantity: 1
        },
        {
            name: 'Peter Venkman',
            imageUrl: 'http://www.fillmurray.com/g/300/300',
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
    content: 'This emu is subpar. He does not kick, as was advertised.',
    stars: 1,
    dangerLevel: 10
};


function seedReview(review) {
    return Review.createAsync(review)
}

connectToDb.then(function () {
//    var collectionNames = ['']
//    mongoose.connection.collections['collectionName'].drop( function(err) {
//        console.log('collection dropped');
//    });
    Animal.findAsync({}).then(function (animals) {
        if (animals.length === 0) {
            var usersAndAnimalsPromise = [
                seedUsers(),
                seedAnimals()
            ];
            return Promise.all(usersAndAnimalsPromise);
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).spread(function(users, animals) {
        review.animal = animals[0]._id;
        review.author = users[0]._id;
        return Order.create({
          user: users[0]._id,
          total: 20000,
          animals: [animals[0], animals[1]],
          date: new Date(),
          shippingAddr: "5 Hanover Square"
        }).then(function () {
            return Order.create({
                  user: users[1]._id,
                  total: 20000,
                  animals: [animals[0], animals[2]],
                  date: new Date(),
                  shippingAddr: "5 Hanover Square"
            })
        }).then(function() {
            return  Order.create({
                  user: users[0]._id,
                  total: 20000,
                  animals: [animals[0], animals[1], animals[2]],
                  date: new Date(),
                  shippingAddr: "5 Hanover Square"
            });
        }).then(function() {
            return seedReview(review)
        }).catch(function(err) {
            console.log(err);
        });
        
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
