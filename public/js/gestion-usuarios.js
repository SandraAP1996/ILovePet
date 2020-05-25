/*
|---------------
| GESTIONAR USUARIOS
|---------------
*/

$(function(){
    /*ACCIONES DE INICIO*/
    validarFormulario();
    rellenarTablaFiltro();
    $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').hide();

    /*VALIDAR FILTRO de la tabla*/
    $('#filtroPersona input').blur(function(){
        validarFormulario();
        rellenarTablaFiltro();
    });

    /*LIMPIAR FILTRO*/
    $('#filtroPersona button.reiniciar').click(function(){
        $('#filtroPersona')[0].reset();
        validarFormulario();
        rellenarTablaFiltro();
    });
    /*SELECCIONAR FILA de la tabla*/
    $('body').on('click','tbody tr',function(){
        $('.fichaBotones button.modificar').show();
        $('.fichaBotones button.eliminar').show();
        $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').hide();
        if($(this).hasClass('seleccionado') == false){
            var id=$(this).attr('class');
            $('tr').removeClass('seleccionado');    
            $(this).addClass('seleccionado');
            id=id.split('id');
            $('.fichaPersona').attr('id',id[1]);
            detallesPersona(id[1]);
        }
    });

    /*ELIMINAR USUARIO*/
    /*Tabla*/
    $('body').on('click','td.eliminar', function(){
        $("#eliminarModal").modal("show");
        $('#eliminarModal .modal-content').attr('id', $(this).parent().attr('class'));

    });
    /*Botón de Ficha*/
    $('.fichaBotones .eliminar').click(function(){
        $("#eliminarModal").modal("show");
        $('#eliminarModal .modal-content').attr('id', $('.fichaPersona').attr('id'));
    });
    /*FICHA*/
    $('.fichaTitulo .botones img').click(function(){
        $('.fichaPersona').css('display','none');
        $('.card').css('display','none');
        $('tbody tr').removeClass('seleccionado');
    });

    /*COMPROBAR LA ELIMINACION DEL MODAL*/
    $('#eliminarModal button.acepta').click(function(){
        eliminarPersona($('#eliminarModal .modal-content').attr('id').split('id')[1]);
    });
    /*NAV ADOPCION/ACOGIDA */
    if($('.card .active').text() == 'Animales' ){
        $('.card .donacionCards').hide();
    }else{
        $('.card .animalCards').hide();
    }

    /*ADOPCION/ACOGIDA BOTÓN*/
    $('li.animalBoton a, li.donacionBoton a').click(function(){
        $('.card a').removeClass('active');   
        $(this).addClass('active');

        if($('.card .active').text() == 'Animales' ){
            $('.card .animalCards').show("slow");
            $('.card .donacionCards').hide("slow");
        }else{
            $(' .card .animalCards').hide("slow");
            $('.card .donacionCards').show("slow");
        }
    });

    /*MODIFICAR PERSONA*/
    $('.fichaBotones button.modificar').click(function(){
        $(this).hide();
        $('.fichaBotones button.eliminar').hide();
        $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').show();
        modificarAFormulario();
    });

    /*CANCELAR MODIFICAR*/
    $('.fichaBotones button.cancelarModificar').click(function(){
        $('.fichaBotones button.modificar').show();
        $('.fichaBotones button.eliminar').show();
        $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').hide();
        detallesPersona($('.fichaPersona').attr('id').split('id')[1]);
    });

    /*GUARDAR MODIFICACIÓN*/
    $('form.formModificar').on('blur','input',function(){
        validarModificar($(this));
    });
    /*VALIDAR MODIFICACIÓN*/
    $('.fichaBotones .guardar').click(function(){
        validarModificar($('form.formModificar input'));
        modificarPersona();
    });

    /*MODAL INSERTAR USUARIO*/
    $('button.insertar').click(function(){
        $("#insertarModal").modal("show");
    });

    /*FORMULARIO INSERTAR*/
    $("#insertarModal form").on('submit', function(evt){
        evt.preventDefault();
        validaInsertar($("#insertarModal input"));
        insertarUsuario();
    });

    /*Comprobar INPUTS*/
    $("#insertarModal form input").blur(function(){
        validaInsertar($(this));
    });
    /*REINICIAR FORMULARIO*/
    $('#insertarModal form .cancelar').click(function(){
        $('#insertarModal form')[0].reset();
        $('#insertarModal form .error').removeClass('error');
        $('.form-group h6 span').text('');
    });

});
function insertarUsuario(){

    if($('#insertarModal input').hasClass('error') == false){
        $.ajax({
            url: "/gestion/usuarios/insertar",
            method: "POST",
            data: $('#formInsertarUsuario').serialize(),
            success: function(insertado){
                console.log(insertado);



                var msgError='';
                if(insertado == 1){
                    msgError+='Se ha añadido correctamente el usuario'; 
                    $('#informacionModal div.modal-content').addClass('correcto');
                    rellenarTablaFiltro();
                    detallesPersona($('.fichaPersona').attr('id').split('id')[1]);

                }else{
                    msgError+='No se ha añadido correctamente el usuario'; 
                    $('#informacionModal div.modal-content').addClass('incorrecto');
                }
                $('#informacionModal h4.modal-title').text('Insertar Usuario');

                $('#informacionModal div.card-body').text(msgError);

            }
        });
        rellenarTablaFiltro();
        $("#insertarModal").modal("hide");

        $("#informacionModal").modal("show");


    }
}

function validarModificar(inputs){

    for(var i=0;i<inputs.length;i++){

        /*NIF*/
        if($(inputs[i]).attr('name') == 'nif'){

            if($(inputs[i]).val().match(/^\d{8}[a-zA-Z]{1}$/)){
                $($(inputs[i])).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Debe ser un NIF valido.</small>')
            }

        }

        /*NOMBRE*/
        if($(inputs[i]).attr('name') == 'nombre'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();

            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');

            }

        }

        /*APELLIDOS*/
        if($(inputs[i]).attr('name') == 'apellidos'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,40}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 40.</small>');
            }

        }

        /*TELEFONO*/
        if($(inputs[i]).attr('name') == 'telefono'){

            if($(inputs[i]).val().match(/^[0-9]{9}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Solo permite 9 digitos.</small>');

            }

        }

        /*EMAIL*/
        if($(inputs[i]).attr('name') == 'email'){

            if($(inputs[i]).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();

            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Debe tener la sintaxis de correo x@x.x solo una longitud máxima 255.</small>');

            }

        }

        /*PROVINCIA*/
        if($(inputs[i]).attr('name') == 'provincia'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');
            }

        }

        /*LOCALIDAD*/
        if($(inputs[i]).attr('name') == 'localidad'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');

            }

        }
        /*CODIGO POSTAL*/
        if($(inputs[i]).attr('name') == 'postal'){

            if($(inputs[i]).val().match(/^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();

            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Solo permite 5 digitos.</small>');


            }

        }

        /*CALLE*/
        if($(inputs[i]).attr('name') == 'calle'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\/\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();

            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');

            }

        }

        /*NUMERO*/
        if($(inputs[i]).attr('name') == 'numero'){
            if($(inputs[i]).val().match(/^[0-9]{1,3}$/)){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();

            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Solo permite caracteres numericos, con un minimo de 1 digito y un máximo de 3.</small>');

            }
        }

        /*FECHA NACIMIENTO*/
        if($(inputs[i]).attr('name') == 'fecha'){

            fecha = $(inputs[i]).val();
            var hoy = new Date();
            var cumpleanos = new Date(fecha);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }
            if(edad >= 18){
                $(inputs[i]).removeClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
            }else{
                $(inputs[i]).addClass('error');
                $('span.'+$(inputs[i]).attr('name')+' small').remove();
                $('span.'+$(inputs[i]).attr('name')).append('<small># Debe ser mayor de edad.</small>');

            }

        }

    }
}


/**
* MODIFICAR USUARIO: Función que hace una petición ajax, si todos los inputs son correctos
*
* @param void
* @return void
*/
function modificarPersona(){

    if($('form.formModificar input').hasClass('error') == false){
        $.ajax({
            url: "/gestion/usuarios/modificar/id/"+$('.fichaPersona').attr('id').split('id')[1],
            method: "POST",
            data: $('form.formModificar').serialize(),
            success: function(modificado){
                console.log(modificado);
                var msgError='';
                if(modificado == 1){
                    msgError+='Se ha modificado correctamente el usuario'; 
                    $('#informacionModal div.modal-content').addClass('correcto');
                    rellenarTablaFiltro();
                    detallesPersona($('.fichaPersona').attr('id').split('id')[1]);
                }else{
                    msgError+='No se ha modificado correctamente el usuario'; 
                    $('#informacionModal div.modal-content').addClass('incorrecto');
                }
                $('#informacionModal h4.modal-title').text('Modificar Usuario');

                $('#informacionModal div.card-body').text(msgError);
            }
        });
        $('.fichaBotones button.modificar').show();
        $('.fichaBotones button.eliminar').show();
        $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').hide();
        $("#informacionModal").modal("show");

    }
}

/**
* VALIDAR A FORMULARIO: Función que valida el formulario, haciendo blur o click
*
* @param Objeto inputs
* @return void
*/
function validaInsertar(inputs){

    for(var i=0;i<inputs.length;i++){

        /*NIF*/
        if($(inputs[i]).attr('name') == 'nif'){

            if($(inputs[i]).val().match(/^\d{8}[a-zA-Z]{1}$/)){
                $($(inputs[i])).removeClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

            }else{
                $(inputs[i]).addClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text(' *');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Debe ser un NIF valido.</small>');
            }

        }

        /*NOMBRE*/
        if($(inputs[i]).attr('name') == 'nombre'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

            }else{
                $(inputs[i]).addClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text(' *');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');
            }

        }

        /*APELLIDOS*/
        if($(inputs[i]).attr('name') == 'apellidos'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,40}$/)){
                $(inputs[i]).removeClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

            }else{
                $(inputs[i]).addClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text(' *');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 40.</small>');

            }

        }

        /*TELEFONO*/
        if($(inputs[i]).attr('name') == 'telefono'){

            if($(inputs[i]).val().match(/^[0-9]{9}$/)){
                $(inputs[i]).removeClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();


            }else{
                $(inputs[i]).addClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text(' *');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();
                $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Solo permite 9 digitos.</small>');

            }

        }

        /*EMAIL*/
        if($(inputs[i]).attr('name') == 'email'){

            if($(inputs[i]).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)){
                $(inputs[i]).removeClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();


            }else{
                $(inputs[i]).addClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text(' *');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();
                $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Debe tener la sintaxis de correo x@x.x solo una longitud máxima 255.</small>');

            }

        }

        /*FECHA NACIMIENTO*/
        if($(inputs[i]).attr('name') == 'fecha'){

            fecha = $(inputs[i]).val();
            var hoy = new Date();
            var cumpleanos = new Date(fecha);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }
            if(edad >= 18){
                $(inputs[i]).removeClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();
            }else{
                $(inputs[i]).addClass('error');
                $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text(' *');
                $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();
                $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Debe ser mayor de edad.</small>');

            }

        }

        /*PROVINCIA*/
        if($(inputs[i]).attr('name') == 'provincia'){
            if($(inputs[i]).val() != ''){
                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                    $(inputs[i]).removeClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                }else{
                    $(inputs[i]).addClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                    $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');

                }
            }else{
                $(inputs[i]).removeClass('error');

            }
        }

        /*LOCALIDAD*/
        if($(inputs[i]).attr('name') == 'localidad'){
            if($(inputs[i]).val() != ''){

                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]{3,25}$/)){
                    $(inputs[i]).removeClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                }else{
                    $(inputs[i]).addClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                    $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');

                }
            }else{
                $(inputs[i]).removeClass('error');

            }
        }
        /*CODIGO POSTAL*/
        if($(inputs[i]).attr('name') == 'postal'){
            if($(inputs[i]).val() != ''){

                if($(inputs[i]).val().match(/^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/)){
                    $(inputs[i]).removeClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                }else{
                    $(inputs[i]).addClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                    $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Solo permite 5 digitos.</small>');

                }
            }else{
                $(inputs[i]).removeClass('error');

            }
        }

        /*CALLE*/
        if($(inputs[i]).attr('name') == 'calle'){
            if($(inputs[i]).val() != ''){

                if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\/\s]{3,25}$/)){
                    $(inputs[i]).removeClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                }else{
                    $(inputs[i]).addClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                    $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');


                }
            }else{
                $(inputs[i]).removeClass('error');

            }
        }

        /*NUMERO*/
        if($(inputs[i]).attr('name') == 'numero'){
            if($(inputs[i]).val() != ''){

                if($(inputs[i]).val().match(/^[0-9]{1,3}$/)){
                    $(inputs[i]).removeClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                }else{
                    $(inputs[i]).addClass('error');
                    $('input[name="'+$(inputs[i]).attr("name")+'"] + small').remove();

                    $('h6.'+$(inputs[i]).attr("name")+'Error').parent().append('<small># Solo permite caracteres numericos, con un minimo de 1 digito y un máximo de 3.</small>');
                }
            }else{
                $(inputs[i]).removeClass('error');

            }
        }
    }
}

/**
* MODIFICA A FORMULARIO: Función que modifica la fichaPersona para que sea un formulario
*
* @param void
* @return void
*/
function modificarAFormulario(){
    var nif=$('.fichaDescripcion span.nif').text();
    var nombre=$('.fichaDescripcion span.nombre').text();
    var apellidos=$('.fichaDescripcion span.apellidos').text();
    var fecha=$('.fichaDescripcion span.fecha').text();
    var telefono=$('.fichaDescripcion span.telefono').text();
    var email=$('.fichaDescripcion span.email').text();
    var provincia=$('.fichaDescripcion span.provincia').text();
    var localidad=$('.fichaDescripcion span.localidad').text();
    var calle=$('.fichaDescripcion span.calle').text();
    var postal=$('.fichaDescripcion span.postal').text();
    var numero=$('.fichaDescripcion span.numero').text();

    /*DETALLES*/
    $('.fichaDescripcion span.nif').html('<input type="text" class="form-control w-50" name="nif" value="'+nif+'">');
    $('.fichaDescripcion span.nombre').html('<input type="text" class="form-control w-50" name="nombre" value="'+nombre+'">');
    $('.fichaDescripcion span.apellidos').html('<input type="text" class="form-control w-50" name="apellidos" value="'+apellidos+'">');
    $('.fichaDescripcion span.fecha').html('<input type="date" class="form-control w-50" name="fecha" value="'+fecha+'">');
    $('.fichaDescripcion span.telefono').html('<input type="text" class="form-control w-50" name="telefono" value="'+telefono+'">');
    $('.fichaDescripcion span.email').html('<input type="email" class="form-control w-50" name="email" value="'+email+'">');


    /*DIRECCIÓN*/
    if(provincia != ''){
        $('.fichaDescripcion span.provincia').html('<input type="text" class="form-control w-50" name="provincia" value="'+provincia+'">');
        $('.fichaDescripcion span.localidad').html('<input type="text" class="form-control w-50" name="localidad" value="'+localidad+'">');
        $('.fichaDescripcion span.calle').html('<input type="text" class="form-control w-50" name="calle" value="'+calle+'">');
        $('.fichaDescripcion span.postal').html('<input type="text" class="form-control w-50" name="postal" value="'+postal+'">');
        $('.fichaDescripcion span.numero').html('<input type="text" class="form-control w-50" name="numero" value="'+numero+'">');
    }else{
        $('div.fichaPersona .fichaDescripcion').append('<hr><p><span class="titulo">Provincia</span>&nbsp&nbsp <span class="provincia"><input type="text" class="form-control w-50" name="provincia" value=""></span></p><p><span class="titulo">Localidad</span>&nbsp&nbsp <span class="localidad"><input type="text" class="form-control w-50" name="localidad" value=""></span></p><p><span class="titulo">Calle</span>&nbsp&nbsp <span class="calle"><input type="text" class="form-control w-50" name="calle" value=""></span></p><p><span class="titulo">C.Postal</span>&nbsp&nbsp <span class="postal"><input type="text" class="form-control w-50" name="postal" value=""></span></p><p><span class="titulo">Numero</span>&nbsp&nbsp <span class="numero"><input type="text" class="form-control w-50" name="numero" value=""></span></p>');
    }
}


/**
* ELIMINAR PERSONA: Función que elimina a la persona a partir del id
*
* @param int id
* @return void
*/
function eliminarPersona(id){
    $.ajax({
        url: "/gestion/usuarios/eliminar/id/"+id,
        method: "GET", 
        success: function(eliminado){
            var msgError='';
            /*Comprobar si se ha eliminado correctamente y crear el mensaje de respuesta*/
            if(eliminado.length == 0){
                msgError+='Se ha eliminado correctamente el usuario'; 
                rellenarTablaFiltro();
                $('#informacionModal div.modal-content').addClass('correcto');

                /*Eliminar la seleccion del animal eliminado*/
                $('.fichaPersona').css('display','none');
                $('.card').css('display','none');
                $('tbody tr').toggleClass('seleccionado'); /*MODIFICADO*/
            }else{
                msgError+='No se ha eliminado correctamente el usuario'; 
                $('#informacionModal div.modal-content').addClass('incorrecto');
            }
            $('#informacionModal h4.modal-title').text('Eliminar Persona');

            $('#informacionModal div.card-body').text(msgError);
        }
    });  
    $("#informacionModal").modal("show");
    $("#eliminarModal").modal("hide");}

/**
* RELLENAR FICHA PERSONA: Función que saca los datos de los usuarios a partir de su id, y lo rellena en la Ficha
*
* @param int id
* @return void
*/

function detallesPersona(id){
    $.ajax({
        url: "/gestion/usuarios/id/"+id,
        method: "GET", 
        success: function(persona){
            if(persona.length == 1){
                $('.fichaPersona').attr('id','id'+persona[0].id);
                $('div.fichaPersona').css('display','block');
                $('.card').css('display','block');
                $('div.fichaPersona .fichaDescripcion').empty();

                var direccion='';

                if(persona[0].direccion.length == 1){
                    direccion='<hr><p><span class="titulo">Provincia</span>&nbsp&nbsp <span class="provincia">'+persona[0].direccion[0].provincia+'</span></p><p><span class="titulo">Localidad</span>&nbsp&nbsp <span class="localidad">'+persona[0].direccion[0].localidad+'</span></p><p><span class="titulo">Calle</span>&nbsp&nbsp <span class="calle">'+persona[0].direccion[0].calle+'</span></p><p><span class="titulo">C.Postal</span>&nbsp&nbsp <span class="postal">'+persona[0].direccion[0].cod_postal+'</span></p><p><span class="titulo">Numero</span>&nbsp&nbsp <span class="numero">'+persona[0].direccion[0].numero+'</span></p>';
                }



                $('div.fichaPersona .fichaDescripcion').append('<p><span class="titulo">NIF</span>&nbsp&nbsp<span class="nif">'+persona[0].nif+'</span> </p><p><span class="titulo">Nombre</span>&nbsp&nbsp <span class="nombre">'+persona[0].nombre+' </span></p><hr><p><span class="titulo">Apellidos</span>&nbsp&nbsp <span class="apellidos">'+persona[0].apellidos+'</span></p><p><span class="titulo">Fecha Nacimiento</span>&nbsp&nbsp <span class="fecha">'+persona[0].fecha_nacimiento+'</span></p><hr><p><span class="titulo">Teléfono</span>&nbsp&nbsp<span class="telefono">'+persona[0].telefono+'</span></p><p><span class="titulo">Email</span>&nbsp&nbsp <span class="email">'+persona[0].email+'</span></p>'+direccion);


                if(persona[0].animal['acogida'].length >=1 || persona[0].animal['adoptado'].length >=1 || persona[0].donacion.length >=1){

                    if($('.card .active').text() == 'Animales' ){
                        $('.animalCards .row .card').show();
                        $('.card .donacionCards').hide("slow");
                    }else{
                        $('.animalCards .row .card').show();
                        $('.card .donacionCards').show("slow");
                    }

                    $('.animalCards .row .card').show();
                    $('.card .animalBoton').show();
                    /*ANIMALES*/
                    if(persona[0].animal['acogida'].length >=1 || persona[0].animal['adoptado'].length >=1){

                        $('.card .donacionBoton a').removeClass('active');
                        $('.card .animalBoton a').addClass('active');



                        $('.animalCards .row').empty();
                        /*ADOPTADO*/
                        if(persona[0].animal['adoptado'].length >=1){

                            $('.animalCards .row').empty();
                            for(var i in persona[0].animal['adoptado']){
                                /*Tarjeta de Animales*/
                                $('.animalCards .row').append('<div class="col-md-6"><div class="card"><div class="form-row"><div class="col-2"><img src="/img/'+persona[0].animal['adoptado'][i].ruta+''+persona[0].animal['adoptado'][i].titulo+'.'+persona[0].animal['adoptado'][i].formato+'" alt="animal" class="img-fluid"></div><div class="col-10"><div class="d-flex"><span class="mr-auto"> <h3>'+persona[0].animal['adoptado'][i].nombre+'</h3></span> <span class="situacion"><h5>'+persona[0].animal['adoptado'][i].situacion+'</h5></span></div><p>'+persona[0].animal['adoptado'][i].edad+'</p><p>'+persona[0].animal['adoptado'][i].descripcion+'</p></div></div></div></div>');
                            }

                        }

                        /*ACOGIDA*/
                        if(persona[0].animal['acogida'].length >=1){

                            for(var i in persona[0].animal['acogida']){
                                /*Tarjeta de Animales*/
                                $('.animalCards .row').append('<div class="col-md-6"><div class="card"><div class="form-row"><div class="col-2"><img src="/img/'+persona[0].animal['acogida'][i].ruta+''+persona[0].animal['acogida'][i].titulo+'.'+persona[0].animal['acogida'][i].formato+'" alt="animal" class="img-fluid"></div><div class="col-10"><div class="d-flex"><span class="mr-auto"> <h3>'+persona[0].animal['acogida'][i].nombre+'</h3></span> <span class="situacion"><h5>'+persona[0].animal['acogida'][i].situacion+'</h5></span></div><p>'+persona[0].animal['acogida'][i].edad+'</p><p>'+persona[0].animal['acogida'][i].descripcion+'</p></div></div></div></div>');

                            }
                        }
                        $('.animalCards .row .card').show("slow");

                    }else{
                        $('.card .animalBoton').hide();
                        $('.card').removeClass('active');
                        $(' .donacionBoton a').addClass('active');
                        $('.donacionCards').show("slow");

                    }

                    /*DONACIONES*/
                    if(persona[0].donacion.length >=1){

                        $('.card .donacionBoton').show();
                        $('.card .donacionCards').empty();
                        for(var i in persona[0].donacion){
                            $('.donacionCards').append('<div class="col-md-4"><h5 class="card-title">Donación</h5><p class="card-text"><span>Cantidad </span>'+persona[0].donacion[i].cantidad+' €</p><p class="card-text"><span>Fecha de donación </span>'+persona[0].donacion[i].created_at+'</p></div>')
                        }
                    }else{
                        $('.card .donacionCards').hide("slow");
                        $('.card .donacionBoton').hide();
                    }

                    if($('.card .active').text() == 'Animales' ){
                        $('.card .animalCards').show("slow");
                        $('.card .donacionCards').hide("slow");
                    }else{
                        $(' .card .animalCards').hide("slow");
                        $('.card .donacionCards').show("slow");
                    }
                }else{
                    $('.card').css('display','none');       
                }
            }
        }
    });
}



/**
* RELLENAR TABLA: Función que saca los datos de los usuarios a partir de la validación para rellenar la tabla
*
* @param void
* @return void
*/

function rellenarTablaFiltro(){

    if($('#filtroPersona input').hasClass('error') == false){
        $('tbody').empty();

        $.ajax({
            url: "/gestion/usuarios/buscar",
            method: "GET",
            data: $("#filtroPersona").serialize(), 
            success: function(usuarios){
                if(usuarios.length == 0){
                    /*PONER UN ERROR*/
                }else{
                    for(var i in usuarios){
                        $('tbody').append('<tr class="id'+usuarios[i].id+'"><th scope="row" class="nif">'+usuarios[i].nif+'</th><td class="nombre">'+usuarios[i].nombre+'</td><td class="apellidos">'+usuarios[i].apellidos+'</td><td class="fecha">'+usuarios[i].fecha_nacimiento+'</td><td class="telefono">'+usuarios[i].telefono+'</td><td class="email"><span>'+usuarios[i].email+'</span></td><td class="acogida">'+usuarios[i].animal['acogida']+'</td> <td class="adopcion">'+usuarios[i].animal['adoptado']+'</td><td class="donacion">'+usuarios[i].donacion+'</td><td class="eliminar"><img class="papelera" src="/img/web/icons/papelera.svg" alt="papelera" title="Eliminar" ></td></tr>');
                    }
                }
            }
        });
    }
}

/**
* VALIDAR FILTRO: Función que comprueba los campos para filtrar
*
* @param void
* @return void
*/

function validarFormulario(){

    /*INPUTS*/
    nif=$('#filtroPersona input[name="nif"]');
    nombre=$('#filtroPersona input[name="nombre"]');
    apellidos=$('#filtroPersona input[name="apellidos"]');
    email=$('#filtroPersona input[name="email"]');
    telefono=$('#filtroPersona input[name="telefono"]');

    /*NIF*/
    if(nif.val() != ""){
        if(nif.val().match(/^\d{8}[a-zA-Z]{1}$/)){
            nif.removeClass('error');
            $('#filtroPersona .nif small').text('');
        }else{
            nif.addClass('error');
            $('#filtroPersona .nif small').text('# Debe ser un NIF valido.');
        }
    }else{
        nif.removeClass('error');
        $('#filtroPersona .nif small').text('');
    }

    /*NOMBRE*/
    if(nombre.val() != ""){
        if(nombre.val().match(/^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
            nombre.removeClass('error');
            $('#filtroPersona .nombre small').text('');
        }else{
            nombre.addClass('error');
            $('#filtroPersona .nombre small').text('# No se permiten números, de una longitud mínima de 3 y máxima de 25.');
        }
    }else{
        nombre.removeClass('error');
        $('#filtroPersona .nombre small').text('');
    }

    /*APELLIDOS*/
    if(apellidos.val() != ""){
        if(apellidos.val().match(/^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,35}$/)){
            apellidos.removeClass('error');
            $('#filtroPersona .apellidos small').text('');
        }else{
            apellidos.addClass('error');
            $('#filtroPersona .apellidos small').text('# No se permiten números, de una longitud mínima de 3 y máxima de 35.');
        }
    }else{
        apellidos.removeClass('error');
        $('#filtroPersona .apellidos small').text('');
    }

    /*TELEFONO*/
    if(telefono.val() != ""){
        if(telefono.val().match(/^[0-9]{9}$/)){
            telefono.removeClass('error');
            $('#filtroPersona .telefono small').text('');
        }else{
            telefono.addClass('error');
            $('#filtroPersona .telefono small').text('# Solo se permiten números, de una longitud de 9 digitos.');
        }
    }else{
        telefono.removeClass('error');
        $('#filtroPersona .telefono small').text('');
    }

    /*EMAIL*/
    if(email.val() != ""){
        if(email.val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)){
            email.removeClass('error');
            $('#filtroPersona .email small').text('');
        }else{
            email.addClass('error');
            $('#filtroPersona .email small').text('# Solo se permiten el siguiente patrón ejemplo@gmail.com');
        }
    }else{
        email.removeClass('error');
        $('#filtroPersona .email small').text('');
    }

}


