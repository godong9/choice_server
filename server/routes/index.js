var express = require('express');
var router = express.Router();

/**
 * Test index
 */
router.get('/landing', function(req, res) {
  res.render('index.ejs', { title: 'Express' });
});

module.exports = router;
