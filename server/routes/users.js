var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger('routes/users');
var userCtrl = require('../controllers/User');


/**
 * GET All users
 */
router.get('/all', userCtrl.getAllUsers);

/**
 * POST Save user
 */
router.post('/save', userCtrl.saveUser);

/**
 * POST User login
 */
router.post('/login', userCtrl.login);


module.exports = router;
