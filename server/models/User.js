var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async');

/**
 * User Schema
 */
var UserSchema = new Schema({
    deviceId: { type: String, required: true }, // 디바이스 고유 ID
    name: { type: String, required: true }, // 닉네임
    profileUrl: { type: String, default: '' }, // 프로필 이미지 주소
    gender: { type: Number },	// 1:male, 2:female
    createTime: { type: Date, required: true } //생성 시간
}, {collection: 'users'});

/**
 * Model Methods
 */

UserSchema.statics.getUser = function (criteria, projection, options, callback) {
    if (arguments.length === 2) callback = projection;
    if (arguments.length === 3) callback = options;

    criteria = criteria || {};
    projection = (typeof projection === 'function') ? {} : projection;
    options = (typeof options === 'function') ? {} : options;

    this.findOne(criteria, projection, options, callback);
};

UserSchema.statics.getUsers = function (criteria, projection, options, callback) {
    if (arguments.length === 2) callback = projection;
    if (arguments.length === 3) callback = options;
    criteria = criteria || {};
    projection = (typeof projection === 'function') ? {} : projection;
    options = (typeof options === 'function') ? {} : options;

    this.find(criteria, projection, options, callback);
};

UserSchema.statics.saveUser = function (doc, callback) {
    if (!doc) return;
    doc.createTime = doc.createTime ? doc.createTime : new Date();

    this.create(doc, callback);
};

UserSchema.statics.updateUser = function (criteria, data, callback) {
    if (!criteria || !data) return;

    this.update(criteria, data, callback);
};

module.exports = mongoose.model('User', UserSchema);