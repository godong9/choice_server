var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var log4js = require('log4js');
var logger = log4js.getLogger('controllers/Comment');
var RService = require('../services/Result');
var SessionService = require('../services/Session');
var async = require('async');
var _ = require('underscore');

function CommentCtrl() {

}

CommentCtrl.getComments = function (req, res) {
    var criteria = {};
    var projection = {};
    var options = {
        sort: { updateTime: -1 }, // 기본은 업데이트 기준 내림차순 정렬
        skip: 0, // 기본 0부터 시작
        limit: 20 // 처음에 20개 가져옴
    };

    if (req.query.choiceId) criteria.choiceId = req.query.choiceId;
    if (req.query.writer) criteria.writer = req.query.writer;
    if (req.query.sortBy && req.query.sortBy === "latest") options.sort = { updateTime: -1 };
    if (req.query.sortBy && req.query.sortBy === "popular") options.sort = { popularity: -1 };
    if (req.query.start) options.skip = req.query.start;
    if (req.query.rows) options.limit = req.query.rows;

    Comment.getComments(criteria, projection, options, function(err, docs) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(docs));
    });
};

CommentCtrl.saveComment = function (req, res) {
    var errors, comment;
    req.checkBody('choiceId', 'Invalid value').notEmpty();
    req.checkBody('content', 'Invalid value').notEmpty();
    req.checkBody('writer', 'Invalid value').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(RService.ERROR(errors));
    comment = {
        choiceId: req.body.choiceId,
        content: req.body.content,
        writer: req.body.writer
    };
    logger.debug("Save comment: ", comment);

    Comment.saveComment(comment, function(err, doc) {
        if (err) return res.status(400).send(RService.ERROR(err));
        res.status(200).send(RService.SUCCESS(doc || {}));
    });
};


module.exports = CommentCtrl;
