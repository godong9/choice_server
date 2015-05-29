var mongoose = require('mongoose');
var User = mongoose.model('User');
var RService = require('../services/Result');
var async = require('async');

function UserCtrl() {

}

UserCtrl.getAllUsers = function (req, res) {
    var errors;
    req.checkQuery('admin', 'Permission denied').notEmpty().isIn(["true"]);
    errors = req.validationErrors();
    if (errors) {
        res.status(400).send(RService.ERROR(errors));
        return;
    }
    User.getUsers({}, function(err, docs) {
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
        if (errors) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(doc || {}));
    });
};

UserCtrl.saveUser = function (req, res) {
    var errors, user;
    req.checkBody('deviceId', 'Invalid value').notEmpty();
    req.checkBody('name', 'Invalid value').notEmpty();
    user = {
        deviceId: req.body.deviceId,
        name: req.body.name,
        profileUrl: req.body.profileUrl,
        gender: req.body.gender
    };

    User.saveUser(user, function(err, doc) {
        if (errors) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(doc || {}));
    });
};

UserCtrl.login = function (req, res) {
    // TODO: 디바이스 ID 받아서 가입 안되어 실패 리턴. 가입 되어 있으면 유저 데이터로 세션 등록 후 유저 정보 내려줌!

};

module.exports = UserCtrl;
