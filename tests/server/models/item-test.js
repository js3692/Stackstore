var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;


// Require in all models.
require('../../../server/db/models');

var Animal = mongoose.model('Animal');
var Item = mongoose.model('Item');

describe('Item model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Item).to.be.a('function');
    });

    describe('Instance methods: ', function () {

      var item;
      
      beforeEach('create an item', function() {
        return Animal.create({
            name: "Bill Murray",
            category: ["human", "murray", "mammal"],
            price: 11.99,
            description: "I like to eat fried chicken",
            rating: 2,
            inventoryQuantity: 1
          })
          .then(function (bill) {
            return Item.create({
                animal: bill,
                quantity: 2
              });
          }).then(function (newItem) {
            item = newItem;
          });
      });

      afterEach('delete the item for next test', function () {
        return Item.remove({}).then(function () { Animal.remove({}); });
      });
      
      it('decrQuant should decrement by the quantity specified', function() {
        return item.decrQuant(2)
          .then(function(updatedItem) {
            expect(updatedItem.animal.name).to.equal("Bill Murray");
            expect(updatedItem.quantity).to.equal(0);
        });
      });

      it('incrQuant should increment by the quantity specified', function() {
        return item.incrQuant()
          .then(function(updatedItem) {
            expect(updatedItem.animal.name).to.equal("Bill Murray");
            expect(updatedItem.quantity).to.equal(3);
        });
      });
      
    });
});