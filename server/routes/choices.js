var express = require('express');
var router = express.Router();
var choiceCtrl = require('../controllers/Choice');

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

router.get('/id/:id', choiceCtrl.getChoice);

router.post('/', choiceCtrl.saveChoice);


module.exports = router;
