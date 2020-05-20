/*
|---------------
| PÉRFIL PERSONA
|---------------
*/

$(function(){
    $('button.guardar').hide();
    $('button.cancelar').hide();

    if($('.perfilPersona .card .active').text() == 'Animales' ){
        $('.perfilPersona .card .donacionCards').hide();
    }else{
        $('.perfilPersona .card .animalCards').hide();
    }

    /*Controlar la información recibida*/
    $('li.animalBoton a, li.donacionBoton a').click(function(){
        $('.perfilPersona .card a').removeClass('active');   
        $(this).addClass('active');

        if($('.perfilPersona .card .active').text() == 'Animales' ){
            $('.perfilPersona .card .animalCards').show("slow");
            $('.perfilPersona .card .donacionCards').hide("slow");
        }else{
            $('.perfilPersona .card .animalCards').hide("slow");
            $('.perfilPersona .card .donacionCards').show("slow");
        }
    });

    /*MODO MODIFICAR: Cambiar a modo editar datos*/
    $('div.detalles img.editar').click(function(){
        $('button.guardar').show();
        $('button.cancelar').show();
        $(this).hide();

        $('.perfilPersona input').prop('disabled',false);


    });
    /*CANCELAR MODO MODIFICAR: Cambiar a modo vista*/
    $('span.botonesModificar .cancelar').click(function(){
        //        $('button.guardar').hide();
        //        $('button.cancelar').hide();
        //        $('div.detalles img.editar').show();
        //        $('.perfilPersona input').prop('disabled',true);
        location.reload();
    });

    $('form.formDetalles input').blur(function(){
        validarForm('blur',$(this));
    });   

    $('span.botonesModificar .guardar').click(function(){
        validarForm('boton','nada');
    });
});


function validarForm(modo,elemento){

    if(modo == 'blur'){
        var inputs=elemento;
    }else if(modo == 'boton'){
        var inputs=$('form.formDetalles input');
    }

    for(var i=0;i<inputs.length;i++){
        /*NOMBRE*/
        if($(inputs[i]).attr('name') == 'nombre'){
            if($(inputs[i]).val() == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/) && 25 >= $(inputs[i]).val().length){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');

                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# No se permite caracteres numericos y solo una longitud de 25');
                }
            }
        }

        /*APELLIDOS*/
        if($(inputs[i]).attr('name') == 'apellidos'){
            if($(inputs[i]).val() == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/) && 30 >= $(inputs[i]).val().length){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');

                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# No se permite caracteres numericos y solo una longitud de 30');
                }
            }
        }

        /*EMAIL*/
        if($(inputs[i]).attr('name') == 'email'){
            if($(inputs[i]).val() == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/) && 255 >= $(inputs[i]).val().length){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');

                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# Debe tener la sintaxis de correo x@x.x solo una longitud máxima 255');
                }
            }
        }
        /*TELÉFONO*/
        if($(inputs[i]).attr('name') == 'telefono'){
            if($(inputs[i]).val() == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[0-9]+$/) && 9 == $(inputs[i]).val().length){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');

                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# Solo se admite caracteres numericos y una logitud de 9');
                }
            }
        }
        /*PROVINCIA*/
        if($(inputs[i]).attr('name') == 'provincia'){
            
            if($(inputs[i]).value == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/) && 25 >= $(inputs[i]).val().length){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');
                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# Solo se admite caracteres numericos y una logitud de 9');
                }
            }
        }
        
        
        /*LOCALIDAD*/
        if($(inputs[i]).attr('name') == 'localidad'){
            
            if($(inputs[i]).value == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/) && 25 >= $(inputs[i]).val().length){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');
                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# Solo se admite caracteres numericos y una logitud de 9');
                }
            }
        }




    }


}

