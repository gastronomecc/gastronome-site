$(document).ready(function() {

    $('input[type=email]').on("focus", function(){
        $(".error--message--email").css({"visbility" : "hidden"});
    });
    $('input[type=email]').on("blur", function(){
        $(".error--message--email").css({"visbility" : "visible"});
    });

    $('input[type=password]').on("focus", function(){
        $(".error--message--password").css({"visibility" : "hidden"});
    });
    $('input[type=password]').on("blur", function(){
        $(".error--message--password").css({"visbility" : "visible"});
    });
});