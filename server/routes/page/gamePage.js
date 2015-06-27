var express = require('express');
var router = express.Router();
var gameCtrl = require('../../controllers/Game');


router.get('/', gameCtrl.getGamePage);

module.exports = router;
