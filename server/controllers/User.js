var mongoose = require('mongoose');
var User = mongoose.model('User');

function UserCtrl() {

}

UserCtrl.getUsers = function (req, res) {
    User.getUser({}, {}, {}, function(err, docs) {
       res.send(docs);
    });
};


module.exports = UserCtrl;
