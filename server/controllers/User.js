var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');

function UserCtrl() {

}

UserCtrl.getAllUsers = function (req, res) {
    User.getUser({}, {}, {}, function(err, docs) {
       res.send(docs);
    });
};

UserCtrl.saveUser = function (req, res) {
    User.saveUser(req.body, function(err, doc) {
        res.send(doc);
    });
};

UserCtrl.login = function (req, res) {
    // TODO: 로그인 코드 처리해야함!
};

module.exports = UserCtrl;
