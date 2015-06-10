var express = require('express');
var router = express.Router();
var commentCtrl = require('../controllers/Comment');

/**
 * ---------
 * ## **GET comments**
 *  - 댓글 목록 가져오는 API
 *
 * ### URL: /ajax/comment/list
 * ### TYPE: GET
 *
 * @param {String} [choiceId] - 댓글을 달려있는 선택 항목 ID
 * @param {String} [writer] - 작성한 사람 ID
 * @param {String} [start] - 시작 위치. 0(Default)
 * @param {String} [rows] - 가져올 개수. 20(Default)
 *
 * @example
 *  REQUEST
 *   - GET /ajax/comment/list?choiceId=556a7981a24305fc0abec558
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"55782cc6f89a41e104e96cdc","choiceId":"556a7981a24305fc0abec558","content":"댓글 테스트","writer":"556952b2e004fb830256666d","createTime":"2015-06-10T12:25:42.278Z","updateTime":"2015-06-10T12:25:42.278Z","unlikers":[],"likers":[],"unlikeCount":0,"likeCount":0,"__v":0}]}
 *
 */
router.get('/list', commentCtrl.getComments);

/**
 * ---------
 * ## **POST comment**
 *  - 댓글 저장하는 API
 *
 * ### URL: /ajax/comment/save
 * ### TYPE: POST
 *
 * @param {String} choiceId - 댓글을 추가할 선택 항목 ID
 * @param {String} content - 댓글 내용
 * @param {String} writer - 작성한 사람 ID
 *
 * @example
 *  REQUEST
 *   - POST /ajax/comment/save
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"__v":0,"choiceId":"556a7981a24305fc0abec558","content":"댓글 테스트","writer":"556952b2e004fb830256666d","createTime":"2015-06-10T12:25:42.278Z","updateTime":"2015-06-10T12:25:42.278Z","_id":"55782cc6f89a41e104e96cdc","unlikers":[],"likers":[],"unlikeCount":0,"likeCount":0}}
 *
 */
router.post('/save', commentCtrl.saveComment);


module.exports = router;
