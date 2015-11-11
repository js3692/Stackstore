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
var Item = Promise.promisifyAll(mongoose.model('Item'));

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
        },
        {
            email: 'asdpoiqwe@gmail.com',
            password: 'password',
            isAdmin: true
        },
        {
            email: 'abhujle7@gmail.com',
            password: '1234',
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
            inventoryQuantity: 5
        },
        {
            name: 'Bill Murray',
            imageUrl: 'http://www.fillmurray.com/g/300/300',
            price: 1400,
            description: 'Very poisonous, not cuddly. Gelatinous.',
            rating: 2.4,
            conservationStatus: 'Extinct in the Wild',
            category: ['life aquatic'],
            inventoryQuantity: 9
        },
        {
            name: 'Humphead Wrasse',
            imageUrl: 'https://c402277.ssl.cf1.rackcdn.com/photos/1765/images/story_full_width/Humphead_Wrasse_8.13.2012_Revised_Hero_Image_HI_111751.jpg?1345602611',
            price: 4000,
            description: 'Six feet long, prominent bulge on forehead, lifespan exceeding 30 years.',
            rating: 3.7,
            conservationStatus: 'Endangered',
            category: ['life aquatic'],
            inventoryQuantity: 2
        },
        {
            name: 'Bonobo',
            imageUrl: 'https://c402277.ssl.cf1.rackcdn.com/photos/1121/images/portrait_small/bonobos_7.31.2012_poaching_HI_106087.jpg?1345586459',
            price: 1400,
            description: 'Peaceful, matriarchal, settle conflict through sex.',
            rating: 4.1,
            conservationStatus: 'Endangered',
            category: ['mammal'],
            inventoryQuantity: 3
        },
        {
            name: 'Amur Leopard',
            imageUrl: 'https://c402277.ssl.cf1.rackcdn.com/photos/1046/images/story_carousel/Amur_Leopard_01_7.30.2012_Camera_Traps.jpg?1345536335',
            price: 1400,
            description: 'Can run at speeds of up to 37 miles per hour and leap more than 19 feet horizontally and 10 feet vertically.',
            rating: 4.5,
            conservationStatus: 'Critically Endangered',
            category: ['mammal'],
            inventoryQuantity: 9
        },
         {
            name: 'Giant Panda',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG/284px-Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG',
            price: 6500,
            description: 'Eats between 26 to 84 pounds of bamboo a day, peaceful nature',
            rating: 4.8,
            conservationStatus: 'Endangered',
            category: ['mammal'],
            inventoryQuantity: 6
        },
         {
            name: 'Sumatran Rhino',
            imageUrl: 'https://c402277.ssl.cf1.rackcdn.com/photos/1410/images/story_full_width/Rhinos_Main_8.6.2012_Stengthening_Law_Enforcement_HI_112396.jpg?1345544478',
            price: 8000,
            description: 'Only six substantial populations in the wild, marks territory through scraping soil with feet, likes mud baths.',
            rating: 4.4,
            conservationStatus: 'Critically Endangered',
            category: ['mammal'],
            inventoryQuantity: 4
        },
         {
            name: 'Polar Bear',
            imageUrl: 'https://c402277.ssl.cf1.rackcdn.com/photos/1252/images/story_full_width/PolarBear-1600x1200px.jpg?1345540824',
            price: 7600,
            description: 'Talented swimmers, diet includes ringed and bearded seals, and Coca Cola.',
            rating: 4.5,
            conservationStatus: 'Vulnerable',
            category: ['marine mammal'],
            inventoryQuantity: 3
        },
         {
            name: 'Sperm Whale',
            imageUrl: 'http://cdn.images.express.co.uk/img/dynamic/128/590x/secondary/131825.jpg',
            price: 1400,
            description: 'Largest of the toothed whales, enjoys a diet of wooden puppets who think they are real boys',
            rating: 4.5,
            conservationStatus: 'Critically Endangered',
            category: ['marine mammal'],
            inventoryQuantity: 1
        },
        {
            name: 'African Lion',
            imageUrl: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTVPExpLlAk2hI2RaF5CLWgzraNt5TyMwBMjksGer0ffHwHB7J_',
            price: 9500,
            description: 'King of the Jungle, timeless and classic, this animal will make a great edition to any collection.',
            rating: 4.8,
            conservationStatus: 'Vulnerable',
            category: ['mammal'],
            inventoryQuantity: 4
        },
        {
            name: 'Swiss Turtle',
            imageUrl: 'http://animalwonder.com/wp-content/uploads/2014/09/Sea_Turtle_506f386b36187.jpg',
            price: 80.99,
            description: "I'm a turtle from Switzerland. It's pretty hilly out here. Take me to a nice, sunnier place.",
            rating: 5,
            conservationStatus: 'Endangered',
            category: ['mammal'],
            inventoryQuantity: 3
        },
        {
            name: 'BiPolar Bear',
            imageUrl: 'http://storage.torontosun.com/v1/dynamic_resize/id/31727795/?size=400x400&site=blogs&authtoken=3ef318efc0d861959b4b4c43bdd7f1d6&quality=90',
            price: 80.99,
            description: "I'm a bi-polar bear. My mood swings from very angry to very happy in an instant.",
            rating: 2.1,
            conservationStatus: 'Vulnerable',
            category: ['bear'],
            inventoryQuantity: 6
        },
        {
            name: 'NYC Rat',
            imageUrl: 'http://www.usefulslug.com/wp-content/uploads/2011/03/RatSmall.jpg',
            price: 1.99,
            description: "I'm a rat. I live in the dungeons. I'm easy to raise because I can feed myself.",
            rating: 1.1,
            conservationStatus: 'Vulnerable',
            category: ['rat'],
            inventoryQuantity: 9999999999
        },
        {
            name: 'Fat Horse',
            imageUrl: 'http://isyourgirlfriendahorse.com/carousel-horse-1.jpg',
            price: 80.99,
            description: "I like to run around a lot in my spare time. But I also eat a lot.",
            rating: 2.1,
            conservationStatus: 'Vulnerable',
            category: ['bear'],
            inventoryQuantity: 6
        },
        {
            name: 'Pantless Bear',
            imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/72/d1/c1/72d1c14fe303efe8053d028a04421d40.jpg',
            price: 40.99,
            description: "I usually wear a shirt, but never wear pants. I like honey.",
            rating: 2.1,
            conservationStatus: 'Endangered',
            category: ['bear'],
            inventoryQuantity: 19
        }
    ];

    return Animal.createAsync(animals);

};

var review = {
    content: 'This emu is subpar. He does not kick, as was advertised.',
    stars: 3,
    dangerLevel: 10
};
function seedReview (review) {
    return Review.createAsync(review);
}

function seedItems (animals) {
    var items = [
        {
            animal: animals[0],
            quantity: 1
        },
        {
            animal: animals[1],
            quantity: 2
        },
        {
            animal: animals[2],
            quantity: 3
        }
    ];
    return Item.createAsync(items);
}

connectToDb.then(function (db) {
    //    var collectionNames = ['']
    //    mongoose.connection.collections['collectionName'].drop( function(err) {
    //        console.log('collection dropped');
    //    });
    return db.db.dropDatabase();
})
.then(function () {
    console.log(chalk.magenta('database dropped'));
    var users, itemOne, itemTwo, itemThree;
    Animal.findAsync({}).then(function (animals) {
        var usersAndAnimalsPromise = [
            seedUsers(),
            seedAnimals()
        ];
        return Promise.all(usersAndAnimalsPromise);
    })
    .spread(function(newUsers, animals) {
        users = newUsers;
        review.animal = animals[0]._id;
        review.author = users[0]._id;
        return seedItems(animals);
    })
    .then(function (items) {
        itemOne = items[0];
        itemTwo = items[1];
        itemThree = items[2];
        return Order.create({
            user: users[1]._id,
            items: [itemOne._id],
            date: new Date(2015, 10, 7, 3, 24, 0),
            shippingAddr: "5 Hanover Square",
            status: "Processing"
        });
    })
    .then(function () {
        return Order.create({
            user: users[1]._id,
            items: [itemTwo._id],
            date: new Date(2015, 10, 8, 3, 24, 0),
            shippingAddr: "5 Hanover Square",
            status: "Created"
        });
    })
    .then(function() {
        return Order.create({
            user: users[1]._id,
            items: [itemThree._id],
            date: new Date(2015, 10, 9, 3, 24, 0),
            shippingAddr: "5 Hanover Square",
            status: "Completed"
        });
    })
    .then(function() {
        return seedReview(review);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});