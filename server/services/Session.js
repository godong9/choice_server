function SessionService() {

}

SessionService.hasSession = function (req) {
    //TODO: 테스트 위한 코드. 삭제해야함.
    return true;

    //return (typeof req.session !== "undefined" && typeof req.session._id !== "undefined");
};

SessionService.getSession = function (req) {
    var data = {
        _id: req.session._id,
        deviceId: req.session.deviceId,
        name: req.session.name,
        profileUrl: req.session.profileUrl
    };

    return data;
};

SessionService.getSessionUserId = function (req) {
    //TODO: 테스트 위한 코드. 삭제해야함.
    return "556952b2e004fb830256666d";

    //return req.session._id;
};


SessionService.registerSession = function (req, user) {
    req.session._id = user._id;
    req.session.deviceId = user.deviceId;
    req.session.name = user.name;
    req.session.profileUrl = user.profileUrl;
};

SessionService.removeSession = function (req) {
    req.session.destroy();
};


module.exports = SessionService;


