$(function() {

    /*COMPORBAR LOGUEO*/
    if($('#login').attr('title') == 'Perfil'){

        $.ajax({
            url: "/inicio/perfil",
            method: "GET",
            success: function(foto){
                if(foto != ''){ 
                    $('img.imgPerfil').attr('src','/img/'+foto[0].ruta+''+foto[0].titulo+'.'+foto[0].formato+'');   
                }
            }
        });
    }


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