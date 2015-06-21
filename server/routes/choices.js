var express = require('express');
var router = express.Router();
var choiceCtrl = require('../controllers/Choice');

/**
 * ---------
 * ## **GET choice**
 *  - 선택 항목 자세한 정보 가져오는 API
 *
 * ### URL: /ajax/choice/id/:id
 * ### TYPE: GET
 *
 * @returns {Number} resultCode - 0 (SUCCESS), 1 (FAILURE)
 * @returns {String} resultMsg - 결과 메시지
 * @returns {JSONObject} data - 결과 데이터
 *
 * @example
 *  REQUEST
 *   - GET /ajax/choice/id/556a7981a24305fc0abec558
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"isAlreadyVote":false,"isWriter":false,"_id":"556a7981a24305fc0abec558","title":"야식 뭐먹?","writer":"556952b2e004fb830256666d","createTime":"2015-05-31T03:01:21.269Z","updateTime":"2015-05-31T03:01:21.269Z","popularity":0,"voters":[],"finalResult":"","tags":["야식","치킨","피자"],"description":"야식 뭐먹을까?","__v":0,"item3":{"voters":[]},"item2":{"name":"피자","voters":[]},"item1":{"name":"치킨","voters":[]}}}
 */
router.get('/id/:id', choiceCtrl.getChoice);

/**
 * ---------
 * ## **GET choices**
 *  - 선택 목록 가져오는 API
 *
 * ### URL: /ajax/choice/list
 * ### TYPE: GET
 *
 * @param {String} [tags] - 검색할 태그
 * @param {String} [writer] - 작성한 사람 ID
 * @param {String} [sortBy] - 정렬 기준 (latest: 최신순(Default), popular: 인기순)
 * @param {String} [start] - 시작 위치. 0(Default)
 * @param {String} [rows] - 가져올 개수. 20(Default)
 *
 * @example
 *  REQUEST
 *   - GET /ajax/choice/list
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"556a7981a24305fc0abec558","title":"야식 뭐먹?","writer":"556952b2e004fb830256666d","createTime":"2015-05-31T03:01:21.269Z","updateTime":"2015-05-31T03:01:21.269Z","popularity":0,"voters":[],"finalResult":"","tags":["야식","치킨","피자"],"description":"야식 뭐먹을까?","__v":0,"item3":{"voters":[]},"item2":{"name":"피자","voters":[]},"item1":{"name":"치킨","voters":[]}}]}
 *
 */
router.get('/list', choiceCtrl.getChoices);

/**
 * ---------
 * ## **POST choice**
 *  - 선택 항목 저장하는 API
 *
 * ### URL: /ajax/choice/save
 * ### TYPE: POST
 *
 * @param {String} title - 제목
 * @param {String} [description] - 자세한 내용
 * @param {Array} [tags] - 태그 목록
 * @param {JSONObject} item1 - 아이템1에 해당하는 정보
 * @param {String} item1.name - 아이템1 이름
 * @param {String} [item1.image] - 아이템1 이미지 URL
 * @param {JSONObject} item2 - 아이템2에 해당하는 정보
 * @param {String} item2.name - 아이템2 이름
 * @param {String} [item2.image] - 아이템2 이미지 URL
 * @param {JSONObject} [item3] - 아이템3에 해당하는 정보
 * @param {String} [item3.name] - 아이템3 이름
 * @param {String} [item3.image] - 아이템3 이미지 URL
 *
 * @example
 *  REQUEST
 *   - POST /ajax/choice/save
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"__v":0,"title":"야식 뭐먹?","writer":"556952b2e004fb830256666d","createTime":"2015-05-31T03:01:21.269Z","updateTime":"2015-05-31T03:01:21.269Z","_id":"556a7981a24305fc0abec558","popularity":0,"voters":[],"finalResult":"","item3":{"voters":[]},"item2":{"name":"피자","voters":[]},"item1":{"name":"치킨","voters":[]},"tags":["야식","치킨","피자"],"description":"야식 뭐먹을까?"}}
 *
 */
router.post('/save', choiceCtrl.saveChoice);

/**
 * ---------
 * ## **PUT choice**
 *  - 투표하는 API
 *
 * ### URL: /ajax/choice/vote/id/:id
 * ### TYPE: PUT
 *
 * @param {String} voteItem - 투표한 아이템 (item1 or item2 or item3)
 *
 * @example
 *  REQUEST
 *   - POST /ajax/choice/save
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"ok":1,"nModified":1,"n":1}}
 *
 */
router.put('/vote/id/:id', choiceCtrl.voteChoice);

/**
 * ---------
 * ## **PUT choice**
 *  - 선택 항목 수정하는 API
 *
 * ### URL: /ajax/choice/update/id/:id
 * ### TYPE: PUT
 *
 * @param {String} [title] - 제목
 * @param {String} [description] - 자세한 내용
 * @param {Array} [tags] - 태그 목록
 *
 * @example
 *  REQUEST
 *   - PUT /ajax/choice/update/id/556a7981a24305fc0abec558
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"ok":1,"nModified":1,"n":1}}
 *
 */
router.put('/update/id/:id', choiceCtrl.updateChoice);


module.exports = router;
