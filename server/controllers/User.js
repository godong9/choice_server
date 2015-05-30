var mongoose = require('mongoose');
var User = mongoose.model('User');
var RService = require('../services/Result');
var SessionService = require('../services/Session');
var async = require('async');

function UserCtrl() {

}

UserCtrl.getAllUsers = function (req, res) {
    User.getUsers({}, function(err, docs) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(docs));
    });
};

UserCtrl.getUser = function (req, res) {
    var errors, criteria;
    req.checkParams('id', 'Invalid value').notEmpty().isAlphanumeric();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(RService.ERROR(errors));
    criteria = { _id: req.params.id };
    User.getUser(criteria, function(err, doc) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(doc || {}));
    });
};

UserCtrl.saveUser = function (req, res) {
    var errors, user;
    req.checkBody('deviceId', 'Invalid value').notEmpty().isAlphanumeric();
    req.checkBody('name', 'Invalid value').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(RService.ERROR(errors));
    user = {
        deviceId: req.body.deviceId,
        name: req.body.name,
        profileUrl: req.body.profileUrl,
        gender: req.body.gender
    };

    User.saveUser(user, function(err, doc) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(doc || {}));
    });
};

UserCtrl.updateUser = function (req, res) {
    var errors, criteria, data;
    req.checkParams('id', 'Invalid value').notEmpty().isAlphanumeric();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(RService.ERROR(errors));
    criteria = { _id: req.params.id };
    data = req.body;

    User.updateUser(criteria, data, function(err, result) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(result));
    });
};


UserCtrl.login = function (req, res) {
    var errors, criteria;
    req.checkBody('deviceId', 'Invalid value').notEmpty().isAlphanumeric();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(RService.ERROR(errors));
    criteria = { deviceId: req.body.deviceId };
    User.getUser(criteria, function(err, doc) {
        if (err) return res.status(400).send(RService.ERROR(err));
        if (!doc) res.status(200).send(RService.ERROR("fail"));
        SessionService.registerSession(req, doc);
        res.status(200).send(RService.SUCCESS(doc));
    });
};

module.exports = UserCtrl;
