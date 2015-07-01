(function main() {
    'use strict';

    function init() {
        setTimeout(function(){
            console.log("index:1");
            $('#game_img').attr('src', '/images/eyes-02.png');
            setTimeout(function(){
                console.log("index:2");
                $('#game_img').attr('src', '/images/eyes-03.png');
                setTimeout(function(){
                    console.log("index:3");
                    $('#game_img').attr('src', '/images/eyes-04.png');
                }, 1000);
            }, 1000);
        }, 1000);
    }

    init();
}());

