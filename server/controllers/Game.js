var mongoose = require('mongoose');
var log4js = require('log4js');
var logger = log4js.getLogger('controllers/Game');
var async = require('async');

function GameCtrl() {

}

GameCtrl.getGamePage = function (req, res) {
    res.render('gamePage.ejs');
};

module.exports = GameCtrl;
