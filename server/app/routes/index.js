'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/members', require('./members'));
router.use('/animals', require('./animals'));
router.use('/cart', require('./cart'));
router.use('/users', require('./users'));
router.use('/order', require('./order'));
router.use('/recommendations', require('./recommendations'));
router.use('/reviews', require('./reviews'));
router.use('/items', require('./items'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
	res.status(404).end();
});