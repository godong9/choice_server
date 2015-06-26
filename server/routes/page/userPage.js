var express = require('express');
var router = express.Router();
var userCtrl = require('../../controllers/User');


router.get('/', userCtrl.getUserPage);

module.exports = router;
