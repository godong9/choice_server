
(function main() {
    'use strict';

    function getUserData() {
        var userId = "5562ce4b2b3c19cf0b91905c";
        $.ajax({
            url: '/ajax/user/id/'+userId,
            type: 'GET',
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("Server error");
            },
            success: function successHandler(result, status, xhr) {
                if (result && result.resultCode === 0) {
                    var user = result.data;
                    $('#user_name').text(user.name);
                    $('#user_profile img').attr('src', user.profileUrl);
                } else {
                    alert("Error");
                }
            }
        });
    }

    function init() {
        getUserData();
    }

    init();
}());

