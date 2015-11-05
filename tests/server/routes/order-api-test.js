// // Instantiate all models
// var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// require('../../../server/db/models');
// var Order = mongoose.model('Order');

// var expect = require('chai').expect;
// var sinon = require('sinon');

// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var supertest = require('supertest');
// var app = require('../../../server/app');

// describe('Order Route: ', function () {
  
//   var baseUrl = '/api/order/';

//   beforeEach('Establish DB connection', function (done) {
//       if (mongoose.connection.db) return done();
//       mongoose.connect(dbURI, done);
//   });

//   afterEach('Clear test database', function (done) {
//       clearDB(done);
//   });

//   describe('User has a cart full of animals and attempts to check out', function () {
//     var loggedInAgent;

//     var userInfo = {
//       email: 'joe@gmail.com',
//       password: 'shoopdawoop'
//     };

//     var user;

//     beforeEach('Create a user', function (done) {
//       User.create(userInfo, done);
//     });

//     beforeEach('Create loggedIn user agent and authenticate', function (done) {
//       loggedInAgent = supertest.agent(app);
//       loggedInAgent.post('/login').send(userInfo).end(function (err, res) {
//         if(err) done(err);
//         user = res.body;
//         done();
//       });
//     });

//     it('and if req.session.cart does NOT exist yet, new cart should be created', function (done) {
//       loggedInAgent
//         .get(baseUrl)
//         .expect(200)
//         .end(function (err, res) {
//           if (err) done(err);
//           expect(res.body).to.contain.all.keys(['_id', 'animals']);
//           expect(res.body.user._id).to.equal(user._id);
//           done();
//         });
//     });

//     it('and if req.session.cart DOES exist, cart is not initialized AGAIN', function (done) {
//       loggedInAgent.get(baseUrl).expect(200).end(function (err, res) {
//         if (err) done(err);
//         var cart = res.body;
//         loggedInAgent
//           .get(baseUrl)
//           .expect(200)
//           .end(function (err, res) {
//             if (err) done(err);
//             expect(res.body._id).to.equal(cart._id);
//             done();
//           });
//       });
//     });

//   });

//   describe('When user is Admin', function () {

//     var loggedInAgent;

//     var userInfo = {
//       email: 'joe@gmail.com',
//       password: 'shoopdawoop'
//     };

//     var user;

//     beforeEach('Create a user', function (done) {
//       User.create(userInfo, done);
//     });

//     beforeEach('Create loggedIn user agent and authenticate', function (done) {
//       loggedInAgent = supertest.agent(app);
//       loggedInAgent.post('/login').send(userInfo).end(function (err, res) {
//         if(err) done(err);
//         user = res.body;
//         done();
//       });
//     });

//     it('Admin should be able to see all orders', function (done) {
//       loggedInAgent
//         .get(baseUrl)
//         .expect(200)
//         .end(function (err, res) {
//           if (err) done(err);
//           expect(res.body).to.contain.all.keys(['_id', 'animals']);
//           expect(res.body.user._id).to.equal(user._id);
//           done();
//         });
//     });

//     it('Admin should be able to change order statuses', function (done) {
//       loggedInAgent.get(baseUrl).expect(200).end(function (err, res) {
//         if (err) done(err);
//         var cart = res.body;
//         loggedInAgent
//           .get(baseUrl)
//           .expect(200)
//           .end(function (err, res) {
//             if (err) done(err);
//             expect(res.body._id).to.equal(cart._id);
//             done();
//           });
//       });
//     });
//   });
    
// });
