'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/members', require('./members'));
router.use('/animals', require('./animals'));
router.use('/cart', require('./animals'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});