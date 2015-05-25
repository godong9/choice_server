var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongooseUtil = require('./util/mongooseUtil'),
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

mongooseUtil.setStringId(UserSchema);

/**
 * Model Methods
 */

UserSchema.statics.getUser = function (criteria, projection, options, callback) {
    criteria = criteria || {};
    projection = projection || {};
    options = options || {};
    this.find(criteria, projection, options, function(err, docs) {
        console.log(docs);
        callback(err, docs);
        return;
    });
};

UserSchema.statics.saveUser = function (doc, callback) {

};



module.exports = mongoose.model('User', UserSchema);