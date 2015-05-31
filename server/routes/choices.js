var express = require('express');
var router = express.Router();
var choiceCtrl = require('../controllers/Choice');


/**
 * ---------
 * ## **GET choice**
 *  - 선택 항목 자세한 정보 가져오는 API
 *
 * ### URL: /ajax/choice
 * ### TYPE: GET
 *
 * @example
 *  REQUEST
 *   - GET
 *  RESPONSE
 *   -
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
 * @param {String} [req.query.tags] - 검색할 태그
 * @param {String} [req.query.sortBy] - 정렬 기준 (latest: 최신순(Default), popular: 인기순)
 * @param {String} [req.query.start] - 시작 위치. 0(Default)
 * @param {String} [req.query.rows] - 가져올 개수. 20(Default)
 *
 * @example
 *  REQUEST
 *   - GET /ajax/choice/list
 *  RESPONSE
 *   -
 *
 */
router.get('/list', choiceCtrl.getChoices);

/**
 * ---------
 * ## **POST choice**
 *  - 선택 항목 저장하는 API
 *
 * ### URL: /ajax/choice
 * ### TYPE: POST
 *
 * @param {String} req.body.title - 제목
 * @param {String} [req.body.description] - 자세한 내용
 * @param {Array} [req.body.tags] - 태그 목록
 * @param {JSONObject} req.body.item1 - 아이템1에 해당하는 정보
 * @param {String} req.body.item1.name - 아이템1 이름
 * @param {String} [req.body.item1.image] - 아이템1 이미지 URL
 * @param {JSONObject} req.body.item2 - 아이템2에 해당하는 정보
 * @param {String} req.body.item2.name - 아이템2 이름
 * @param {String} [req.body.item2.image] - 아이템2 이미지 URL
 * @param {JSONObject} [req.body.item3] - 아이템3에 해당하는 정보
 * @param {String} [req.body.item3.name] - 아이템3 이름
 * @param {String} [req.body.item3.image] - 아이템3 이미지 URL
 *
 * @example
 *  REQUEST
 *   - POST /ajax/choice
 *  RESPONSE
 *   - 
 *
 */
router.post('/', choiceCtrl.saveChoice);


module.exports = router;
