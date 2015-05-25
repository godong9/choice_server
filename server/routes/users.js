var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger('routes/users');


/* POST user login */
router.post('/login', function(req, res) {
    logger.debug("req.body", req.body);
    res.send('respond with a resource');
});


module.exports = router;
