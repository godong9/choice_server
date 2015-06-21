var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/User');

/**
 * ---------
 * ## **GET All users**
 *  - 테스트 위해 모든 유저 목록 가져오는 API
 *
 * ### URL: /ajax/user/all
 * ### TYPE: GET
 *
 * @example
 *  REQUEST
 *   - GET /ajax/user/all
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"5562ce4b2b3c19cf0b91905c","userId":"abc","name":"aa","createTime":"2015-05-25T07:24:59.174Z","profileUrl":"","__v":0},{"_id":"5562ceb322430cde0b1bc280","userId":"abc","name":"aa","createTime":"2015-05-25T07:26:43.118Z","profileUrl":"","__v":0},{"_id":"5562cf583ac8c7e90bc76550","userId":"abc","name":"aa","createTime":"2015-05-25T07:29:28.739Z","profileUrl":"","__v":0},{"_id":"5562cf76fdd5cbed0b7f9022","userId":"abc","name":"aa","createTime":"2015-05-25T07:29:58.038Z","profileUrl":"","__v":0},{"_id":"5562d01fe0b90f040c1b13b2","userId":"abc","name":"aa","createTime":"2015-05-25T07:32:47.127Z","profileUrl":"","__v":0},{"_id":"5562d05f6bef4f0e0c0c474e","userId":"abc","name":"aa","createTime":"2015-05-25T07:33:51.647Z","profileUrl":"","__v":0}]}
 *
 */
router.get('/all', userCtrl.getAllUsers);

/**
 * ---------
 * ## **GET User by id**
 *  - id로 유저 정보 가져오는 API
 *
 * ### URL: /ajax/user/id/:id
 * ### TYPE: GET
 *
 * @example
 *  REQUEST
 *   - GET /ajax/user/id/5562ce4b2b3c19cf0b91905c
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"_id":"5562ce4b2b3c19cf0b91905c","userId":"abc","name":"aa","createTime":"2015-05-25T07:24:59.174Z","profileUrl":"","__v":0}}
 *
 */
router.get('/id/:id', userCtrl.getUser);

/**
 * ---------
 * ## **POST Save user**
 *  - 유저 추가하는 API
 *
 * ### URL: /ajax/user/save
 * ### TYPE: POST
 *
 * @param {String} userId - 유저 ID
 * @param {String} name - 닉네임
 * @param {String} [profileUrl] - 프로필 Url
 *
 * @example
 *  REQUEST
 *   - POST /ajax/user/save
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"__v":0,"userId":"a1b2c3","name":"test","createTime":"2015-05-30T06:03:30.541Z","_id":"556952b2e004fb830256666d"}}
 *
 */
router.post('/save', userCtrl.saveUser);

/**
 * ---------
 * ## **PUT Update user**
 *  - 유저 정보 업데이트 하는 API
 *
 * ### URL: /ajax/user/update/id/:id
 * ### TYPE: PUT
 *
 * @param {String} [name] - 닉네임
 * @param {String} [profileUrl] - 프로필 이미지 주소
 *
 * @example
 *  REQUEST
 *   - PUT /ajax/user/update/id/5562ce4b2b3c19cf0b91905c
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"ok":1,"nModified":1,"n":1}}
 *
 */
router.put('/update/id/:id', userCtrl.updateUser);


/**
 * ---------
 * ## **POST User login**
 *  - 유저 로그인 API
 *
 * ### URL: /ajax/user/login
 * ### TYPE: POST
 *
 * @param {String} userId - 유저 ID
 *
 * @example
 *  REQUEST
 *   - POST /ajax/user/login
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"_id":"556952b2e004fb830256666d","userId":"a1b2c3","name":"test","createTime":"2015-05-30T06:03:30.541Z","__v":0}}
 */
router.post('/login', userCtrl.login);


module.exports = router;
