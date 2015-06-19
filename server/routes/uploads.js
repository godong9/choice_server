var express = require('express');
var router = express.Router();
var uploadCtrl = require('../controllers/Upload');

/** POST file upload **/
router.post('/', uploadCtrl.checkFileSize, uploadCtrl.run);

module.exports = router;
