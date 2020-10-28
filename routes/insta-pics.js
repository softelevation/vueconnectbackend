var express = require('express');
const { getPics } = require('../services/insta-pics');
var router = express.Router();

/* GET users listing. */
router.get('/:id', getPics);

module.exports = router;
