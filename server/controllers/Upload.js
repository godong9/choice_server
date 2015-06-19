'use strict';

var path = require('path');
var fs = require('fs');
var SessionService = require('../services/Session');
var RService = require('../services/Result');
var Busboy = require('busboy');

var FILE_UPLOAD_LIMIT_SIZE = 10 * 1024 * 1024;

function UploadCtrl() {

}

UploadCtrl.checkFileSize = function (req, res, next) {
    if (parseInt(req.headers['content-length']) > FILE_UPLOAD_LIMIT_SIZE) {
        return res.status(400).send(RService.ERROR("File size limit is 10mb"));
    } else {
        next();
    }
};

UploadCtrl.run = function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    var savedFileName, saveTo;

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        savedFileName = new Date().getTime() + "_" + filename;
        saveTo = path.join(__dirname, '../upload', savedFileName);
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        console.log("SAVE PATH:", saveTo);
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname);
    });
    busboy.on('finish', function () {
        res.set('Content-type', 'text/html; charset=utf-8');
        res.writeHead(200, { 'Connection': 'close' });
        res.write(JSON.stringify(savedFileName));
        res.end();
    });
    return req.pipe(busboy);
};


module.exports = UploadCtrl;


