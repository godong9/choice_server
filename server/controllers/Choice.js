var mongoose = require('mongoose');
var Choice = mongoose.model('Choice');
var log4js = require('log4js');
var logger = log4js.getLogger('controllers/Choice');
var RService = require('../services/Result');
var SessionService = require('../services/Session');
var async = require('async');

function ChoiceCtrl() {

}

ChoiceCtrl.getChoice = function (req, res) {
    var errors, criteria;
    req.checkParams('id', 'Invalid value').notEmpty().isAlphanumeric();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(RService.ERROR(errors));
    criteria = { _id: req.params.id };

    Choice.getChoice(criteria, function(err, doc) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(doc));
    });
};

ChoiceCtrl.getChoices = function (req, res) {
    var criteria = {};
    var projection = {};
    var options = {
        sort: { updateTime: -1 }, // 기본은 업데이트 기준 내림차순 정렬
        skip: 0, // 기본 0부터 시작
        limit: 20 // 처음에 20개 가져옴
    };

    if (req.query.tags) criteria.tags = req.query.tags; // 태그 있을 때 태그로 쿼리
    if (req.query.sortBy && req.query.sortBy === "latest") options.sort = { updateTime: -1 };
    if (req.query.sortBy && req.query.sortBy === "popular") options.sort = { popularity: -1 };
    if (req.query.start) options.skip = req.query.start;
    if (req.query.rows) options.limit = req.query.rows;

    Choice.getChoices(criteria, projection, options, function(err, docs) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(docs));
    });
};

ChoiceCtrl.saveChoice = function (req, res) {
    var errors, choice;
    req.checkBody('item1.name', 'Invalid value').notEmpty();
    req.checkBody('item2.name', 'Invalid value').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(RService.ERROR(errors));
    choice = {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        item1: req.body.item1,
        item2: req.body.item2,
        item3: req.body.item3
    };
    logger.debug("Save choice: ", choice);

    Choice.saveChoice(choice, function(err, doc) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(doc || {}));
    });
};


module.exports = ChoiceCtrl;
