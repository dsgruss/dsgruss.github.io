/* Smooth scrolling implementation for interpage links */


$('a').click(function(){
        $('html, body').animate({
		scrollTop: $( $(this).attr('href') ).offset().top
		    }, 500);
        return false;
    });


/* Descramble email links */

$(document).ready(function() {
    $('.email1').each(function( index ) {
        emailstr = $(this).html().replace(/ at /g, '@').replace(/ dot /g, '.')
        $(this).html('<a href="mailto:' + emailstr + '">' + emailstr + '</a>')
    });
});
