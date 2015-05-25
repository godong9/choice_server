var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');

function UserCtrl() {

}

UserCtrl.getAllUsers = function (req, res) {
    var errors;
    req.checkQuery('test', 'Must be true').notEmpty().isIn(["true"]);
    errors = req.validationErrors();
    if (errors) {
        res.status(400).send(errors);
        return;
    }
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

};

module.exports = UserCtrl;
