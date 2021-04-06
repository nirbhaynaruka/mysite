$(document).ready(function () {
    var eT = 0;
    $('li').hide().each(function () {
        $(this).delay(eT).fadeIn('fast');
        eT += 600;
    });
    $('li').click(function () {
        $('li').stop(true, true).fadeIn();
    });
});