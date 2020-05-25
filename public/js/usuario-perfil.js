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

    /*VERIFICAR CON BLUR*/
    $('form.formDetalles input').blur(function(){
        validarForm('blur',$(this));
    });   
    /*VERIFICAR CON EL BOTON GUARDAR / MODIFICAR LOS DATOS */
    $('span.botonesModificar .guardar').click(function(){
        validarForm('boton','nada');
        modificarPerfil();
    });

});

/**
* MODIFICAR PERFIL: Función que comprueba que no haya habido errores
*
* @param  void
* @return void
*/

function modificarPerfil(){

    if($('form.formDetalles input').hasClass('errorInput') == false){

        var data = $('form.formDetalles').serialize();
        data = new FormData($('form.formDetalles')[0]);
        var msgError='';

        $.ajax({
            url: "/usuario/perfil/modificar",
            processData: false,
            contentType: false,
            type: "POST",
            data: data,
            success: function(modificado){
                console.log(modificado);

                //                if(modificado.direccion.length == 1 && modificado.persona == true ){
                //                    $('button.guardar').hide();
                //                    $('button.cancelar').hide();
                //                    $('div.detalles img.editar').show();
                //                    $('.perfilPersona input').prop('disabled',true);
                //                    $('#informacionModal div.modal-content').addClass('correcto');
                //                    $('#informacionModal div.modal-content').removeClass('incorrecto');
                //                    msgError+='Se ha modificado correctamente el perfil'; 
                //                }else{
                //                    msgError+='No se ha modificado ningún campo de perfil'; 
                //                    $('#informacionModal div.modal-content').addClass('incorrecto');
                //                    $('#informacionModal div.modal-content').removeClass('correcto');
                //
                //                }

                $('#informacionModal h4.modal-title').text('Modificar Perfil');
                $('#informacionModal div.card-body').text(msgError);

                $("#informacionModal").modal("show");

            }
        }).fail( function() {
            msgError+='No se ha modificado ningún campo de perfil'; 
            $('#informacionModal div.modal-content').addClass('incorrecto');
            $('#informacionModal div.modal-content').removeClass('correcto');
            $('#informacionModal h4.modal-title').text('Modificar Perfil');
            $('#informacionModal div.card-body').text(msgError);

            $("#informacionModal").modal("show");
        });





    }
}


/**
* VALIDAR FORMULARIO .formDetalles: Función que comprueba la validación de los inputs en el formulario
*
* @param  string  modo
* @param  objeto  elemento
* @return void
*/
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
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');

                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# No se admite caracteres numéricos y una logitud mínima de 3 caracteres, y máxima de 25 caracteres.');
                }
            }
        }

        /*APELLIDOS*/
        if($(inputs[i]).attr('name') == 'apellidos'){
            if($(inputs[i]).val() == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{5,40}$/)){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');

                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# No se admite caracteres numéricos y una logitud mínima de 10 caracteres, y máxima de 40 caracteres.');
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
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# Debe tener la sintaxis de correo x@x.x solo una longitud máxima 255.');
                }
            }
        }
        /*TELÉFONO*/
        if($(inputs[i]).attr('name') == 'telefono'){
            if($(inputs[i]).val() == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[0-9]{9}$/)){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');

                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# Solo se admite caracteres numéricos y una logitud de 9.');
                }
            }
        }
        /*PROVINCIA*/
        if($(inputs[i]).attr('name') == 'provincia'){

            if($(inputs[i]).value == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');
                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# No se admite caracteres numéricos y una logitud mínima de 3 caracteres, y máxima de 25 caracteres.');
                }
            }
        }

        /*LOCALIDAD*/
        if($(inputs[i]).attr('name') == 'localidad'){

            if($(inputs[i]).value == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]{3,25}$/)){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('');
                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('.form-row .'+$(inputs[i]).attr("name")+' small ').text('# No se admite caracteres numéricos y una logitud mínima de 3 caracteres, y máxima de 25 caracteres.');
                }
            }
        }

        /*CODIGO POSTAL*/
        if($(inputs[i]).attr('name') == 'postal'){
            if($(inputs[i]).value == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/)){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('ul.error li.'+$(inputs[i]).attr("name")).remove();
                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('ul.error').append('<li class="'+$(inputs[i]).attr("name")+'"><small> C.Postal # Solo se admiten caracteres numéricos y una logitud mínima de 1 digito, y máxima de 3 digitos.</small></li>')
                }
            }
        }

        /*CALLE*/
        if($(inputs[i]).attr('name') == 'calle'){
            if($(inputs[i]).value == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\/\s]{3,25}$/)){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('ul.error li.'+$(inputs[i]).attr("name")).remove();
                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('ul.error').append('<li class="'+$(inputs[i]).attr("name")+'"><small>Dirección: # No se admite caracteres numéricos y una logitud mínima de 3 caracteres, y máxima de 25 caracteres.</small></li>')
                }
            }
        }

        /*NÚMERO*/
        if($(inputs[i]).attr('name') == 'numero'){
            if($(inputs[i]).value == ''){
                $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
            }else{
                if($(inputs[i]).val().match(/^[0-9]{1,3}$/)){
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').removeClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('');
                    $('ul.error li.'+$(inputs[i]).attr("name")).remove();
                }else{
                    $('form.formDetalles input[name='+$(inputs[i]).attr("name")+']').addClass("errorInput");
                    $('.form-row .'+$(inputs[i]).attr("name")+' span').text('*');
                    $('ul.error').append('<li class="'+$(inputs[i]).attr("name")+'"><small>Dirección: # Solo se admiten caracteres numéricos y una logitud mínima de 1 digito, y máxima de 3 digitos.</small></li>')
                }
            }
        }
    }
}

