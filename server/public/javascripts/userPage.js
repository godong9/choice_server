
(function main() {
    'use strict';

    function getUserData() {
        var userId = "558d60dc21c2b71531cc986a";
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
                    $('#user_profile img').attr('src', '/'+user.profileUrl);
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

