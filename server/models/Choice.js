var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async');

/**
 * Choice Schema
 */
var ChoiceSchema = new Schema({
    title: { type: String, required: true }, // 제목
    description: { type: String, default: '' }, // 설명
    tags: { type: Array, default: [] }, // 태그 목록
    item1: {  // 항목1 정보
        name: String, // 항목 이름
        image: String, // 이미지 URL
        voters: Array // 투표한 사람 ID 배열
    },
    item2: {  // 항목2 정보
        name: String, // 항목 이름
        image: String, // 이미지 URL
        voters: Array // 투표한 사람 ID 배열
    },
    item3: {  // 항목3 정보 (Optional)
        name: String, // 항목 이름
        image: String, // 이미지 URL
        voters: Array // 투표한 사람 ID 배열
    },
    finalResult: { type: String, default: '' }, // 최종 선택한 결과 (item1 or item2 or item3)
    voters: { type: Array, default: [] }, // 투표한 사람 전체 ID 배열
    writer: { type: String, required: true }, // 작성한 유저 ID
    popularity: { type: Number, default: 0 }, // 인기도
    updateTime: { type: Date, required: true }, // 업데이트된 시간
    createTime: { type: Date, required: true }, // 생성 시간

    // 서버에서 만들어서 내려줘야 하는 필드들
    isWriter: { type: Boolean }, // 작성자인지 여부
    isAlreadyVote: { type: Boolean } // 투표 여부 (true: 이미 투표, false: 투표 안함)

}, {collection: 'choices'});

/**
 * Model Methods
 */

ChoiceSchema.statics.getChoice = function (criteria, projection, options, callback) {
    if (arguments.length === 2) callback = projection;
    if (arguments.length === 3) callback = options;

    criteria = criteria || {};
    projection = (typeof projection === 'function') ? {} : projection;
    options = (typeof options === 'function') ? {} : options;

    this.findOne(criteria, projection, options, callback);
};

ChoiceSchema.statics.getChoices = function (criteria, projection, options, callback) {
    if (arguments.length === 2) callback = projection;
    if (arguments.length === 3) callback = options;
    criteria = criteria || {};
    projection = (typeof projection === 'function') ? {} : projection;
    options = (typeof options === 'function') ? {} : options;

    this.find(criteria, projection, options, callback);
};

ChoiceSchema.statics.saveChoice = function (doc, callback) {
    if (!doc) return;
    doc.createTime = doc.createTime ? doc.createTime : new Date();
    doc.updateTime = doc.updateTime ? doc.updateTime : new Date();

    this.create(doc, callback);
};

module.exports = mongoose.model('Choice', ChoiceSchema);