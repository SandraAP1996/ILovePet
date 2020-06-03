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
    /*VALIDAR LOGIN*/

    $('strong').each(function(){
        console.log('error1');
        if($(this).html() != ''){
            console.log('error2');
            $('#login').trigger('click');
        }
    });
    
    
    
    
//    $('#formLogin input').blur(function(){
//        validarLogin($(this)); 
//    });
//
//
//    $('#formLogin .iniciar').click(function(event){
//        event.preventDefault();
//        validarLogin($('#formLogin input')); 
//    });

    //Hash::check('plain-text', $hashedPassword)

//    function validarLogin(inputs){
//        for(var i=0;i<inputs.length;i++){
//
//            /*EMAIL*/
//            if($(inputs[i]).attr('name')== 'email'){
//
//                if($(inputs[i]).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)){
//                    var email=$(inputs[i]).val();
//                    $.ajax({
//                        url: "/usuario/email/"+email,
//                        method: "GET", 
//                        success: function(verificado){
//                            if(verificado.length == 0){
//                                $('#formLogin input[name="email"]').addClass('is-invalid');
//                                $('#formLogin span.email').remove();        
//                                $('#formLogin input[name="email"]').parent().append('<span class="email error"># Ya existe ese email.</span>');
//                            }else{
//                                $('#formLogin input[name="email"]').removeClass('is-invalid');
//                                $('span.email').remove();
//                            }
//                        }
//                    });
//                    /*PETICIN AJAX*/
//                }else{
//                    $('#formLogin span.email').addClass('is-invalid');
//                    $('#formLogin span.email').remove();        
//                    $('#formLogin input[name="email"]').parent().append('<span class="email error"># Debe tener la sintaxis de correo x@x.x solo una longitud máxima 255.</span>');
//                }
//            }
//            /*CONTRASEÑA*/
//            if($(inputs[i]).attr('name')== 'password'){
//                if($('#formLogin').find('span.email').length == 0){
//                    
//                    if($(inputs[i]).val().match(/^([a-zA-Z0-9]{8,35})/)){
//                        var email=$(inputs[i]).val();
//                        $.ajax({
//                            url: "/usuario/validar/",
//                            data: $("#formLogin").serialize(),
//                            method: "GET", 
//                            success: function(verificado){
//                                console.log(verificado);
//                                if(verificado.length == 0){
//                                    $('#formLogin span.password').addClass('is-invalid');
//                                    $('span.password').remove();        
//                                    $('input[name="password"]').parent().append('<span class="password error"># Ya existe ese email.</span>');
//                                }else{
//                                    $($('#formLogin span.password')).removeClass('is-invalid');
//                                    $('span.password').remove();
//                                }
//                            }
//                        });
//                        /*PETICIN AJAX*/
//                    }else{
//                        $('#formLogin span.password').addClass('is-invalid');
//                        $('span.password').remove();        
//                        $('input[name="password"]').parent().append('<span class="password error"># Debe tener la sintaxis de correo x@x.x solo una longitud máxima 255.</span>');
//                    }
//                }
//
//
//
//
//            }
//
//
//
//        }
//
//    }




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