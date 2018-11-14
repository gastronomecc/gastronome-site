/* Nav bar scrolling */
$(document).ready(function() {
    $(window).scroll(function () {
        if ($(document).scrollTop() > 10) {
            $('nav').addClass('change');
        }
        else {
            $('nav').removeClass('change');
        }
    });
});
