$(document).ready(function(){ 

    /* Comprueba cuando se hace scroll para mostrar o ocultar el id 'scroll' */
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    /* Comprueba que se haya hecho click sobre el id 'scroll' y sube hasta el principio del body*/
    $('#scroll, #huella').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});