var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird')
mongoose.Promise = Promise;


// Require in all models.
require('../../../server/db/models');

var Cart = mongoose.model('Cart');
var User = mongoose.model('User');
var Animal = mongoose.model('Animal');

describe('Cart model', function () {
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });
  
    var userAndAnimalsPromises = [
      User.create({ 
        email: 'batman@gmail.com',
        password: 'robin' 
      }),
      Animal.create({
        name: "lemur",
        category: ["mammal", "madagascar"]
      }),
      Animal.create({
          name: "Phil Murray",
          category: ["human", "murray", "mammal"]
      })
    ];


    it('should exist', function () {
        expect(Cart).to.be.a('function');
    });
  
    var createUser = function () {
        return User.create({ email: 'batman@gmail.com', password: 'robin' });
    };

    describe('on creation', function () {

      var cart, 
          lemurId,
          philId;
      
      beforeEach('create a cart', function(){
        return Promise.all(userAndAnimalsPromises)
          .spread(function(user, lemur, phil) {
            lemurId = lemur._id;
            philId = phil._id;
            return Cart.create({ 
              user: user._id,
              animals: [lemur._id, phil._id]
            })
        }).then(function(newCart){
           cart = newCart;
        });
      });
      
      it('deletes one item from the cart', function() {
        return cart.deleteOneItem(lemurId)
          .then(function(updatedCart) {
            expect(updatedCart.animals.length).to.equal(1);
            expect(updatedCart.animals[0]).to.equal(philId);
        });
      });
      
    })
});


