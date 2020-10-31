var express = require('express');
const { getPics,save, getAll } = require('../services/insta-pics');
var router = express.Router();

/* GET users listing. */
// router.get('/:id', getPics);

router.post('/',save)

router.get('/',getAll)




module.exports = router;
