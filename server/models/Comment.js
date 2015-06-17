var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async');

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    choiceId: { type: String, required: true }, // 댓글 달려있는 선택 ID
    content: { type: String, required: true }, // 댓글 내용
    writer: { type: String, required: true }, // 작성한 유저 ID
    likeCount: { type: Number, default: 0 }, // 공감 카운트
    unlikeCount: { type: Number, default: 0 }, // 비공감 카운트
    likers: { type: Array, default: [] }, // 공감한 사람 전체 ID 배열
    unlikers: { type: Array, default: [] }, // 비공감한 사람 전체 ID 배열
    updateTime: { type: Date, required: true }, // 업데이트된 시간
    createTime: { type: Date, required: true }, // 생성 시간

    // 서버에서 만들어서 내려줘야 하는 필드들
    isWriter: { type: Boolean }, // 작성자인지 여부
    isAlreadyLike: { type: Boolean }, // 공감 여부
    isAlreadyUnlike: { type: Boolean } // 비공감 여부

}, {collection: 'comments'});

/**
 * Model Methods
 */

CommentSchema.statics.getComments = function (criteria, projection, options, callback) {
    if (arguments.length === 2) callback = projection;
    if (arguments.length === 3) callback = options;
    criteria = criteria || {};
    projection = (typeof projection === 'function') ? {} : projection;
    options = (typeof options === 'function') ? {} : options;

    this.find(criteria, projection, options, callback);
};

CommentSchema.statics.saveComment = function (doc, callback) {
    if (!doc) return callback("Doc is empty!");
    doc.createTime = doc.createTime ? doc.createTime : new Date();
    doc.updateTime = doc.updateTime ? doc.updateTime : new Date();

    this.create(doc, callback);
};

CommentSchema.statics.likeComment = function (criteria, user, callback) {
    var self = this;
    if (!user || !user._id) return callback("User is empty!");

    this.findOne(criteria, function(err, doc) {
        if (err || !doc) {
            return callback(err || "Doc is empty!");
        }
        if (doc.likers.indexOf(user._id) > -1) {
            return callback("Already like!");
        }
        self.update(criteria, { $push: { likers: user._id }, $inc: { likeCount: 1 } }, callback);
    });
};

CommentSchema.statics.unlikeComment = function (criteria, user, callback) {
    var self = this;
    if (!user || !user._id) return callback("User is empty!");

    this.findOne(criteria, function(err, doc) {
        if (err || !doc) {
            return callback(err || "Doc is empty!");
        }
        if (doc.unlikers.indexOf(user._id) > -1) {
            return callback("Already unlike!");
        }
        self.update(criteria, { $push: { unlikers: user._id }, $inc: { unlikeCount: 1 } }, callback);
    });
};


CommentSchema.statics.deleteComment = function (criteria, user, callback) {
    var self = this;
    if (!user || !user._id) return callback("User is empty!");

    this.findOne(criteria, function(err, doc) {
        if (err || !doc) {
            return callback(err || "Doc is empty!");
        }
        if (doc.writer !== user._id) {
            return callback("Permission Denied!");
        }
        self.remove(criteria, callback);
    });
};

module.exports = mongoose.model('Comment', CommentSchema);