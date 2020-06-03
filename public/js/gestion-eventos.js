$(function(){

    /*OCULTAR ELEMENTOS*/
    $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').hide();
    $('.fichaFotos .eliminarFoto').hide();
    $('.fichaFotos .seleccionarFoto').hide();
    $('#ficha').hide();

    $('.msgTipo').text('Dirección nueva');
    $('.tipoExistente input').attr('disabled',false);
    $('.tipoExistente input').val('');

    /*RELLENAR LA TABLA CON EVENTOS*/
    rellenarTabla();

    /*ELIMINAR EVENTO*/
    /* Activar el modal eliminar/modificar evento/foto*/
    $('body').on('click','td.eliminar',function(){
        $("#eliminarModal").modal("show");
        $("#eliminarModal .modal-title").text("Eliminar Evento");
        $('#eliminarModal .modal-content').attr('id', $(this).parent().attr('id').split('id')[1]);
    });

    $('body').on('click','.fichaBotones button.eliminar', function(){
        $("#eliminarModal").modal("show");
        $("#eliminarModal .modal-title").text("Eliminar Evento");
        $('#eliminarModal .modal-content').attr('id', $('.fichaEvento').attr('id').split('id')[1]);
    });

    /*INSERTAR EVENTO*/
    $('#formEvento .insertar').click(function(){
        $('.msgTipo').text('Dirección nueva');
        $('.tipoExistente input').attr('disabled',false);
        $('.tipoExistente input').val('');
        var total_letras=255;
        var longitud = $('#insertarModal textarea[name="descripcion"]').val().length;
        var resto = total_letras - longitud;
        $('#insertarModal span.contador').html(resto+"/"+255);
        $('.recaudacion').hide();
        $('#insertarModal').modal('show');
        /*RELLENAR SELECT*/
        $.ajax({
            url: "/gestion/eventos/direcciones/",
            method: "GET",
            success: function(direcciones){
                $('#insertarModal .direccionesExistentes').empty();
                $('#insertarModal .direccionesExistentes').append('<option value="nada" selected></option>');

                for(var i=0;i<direcciones.length;i++){
                    var numero;
                    if(direcciones[i].numero == null){
                        numero='';
                    }else{
                        numero=', '+direcciones[i].numero;
                    }
                    $('#insertarModal .direccionesExistentes').append('<option value="'+direcciones[i].id+'" >'+direcciones[i].provincia+', '+direcciones[i].localidad+'&nbsp&nbsp&nbsp'+direcciones[i].calle+''+numero+'</option>');
                }
            }
        });
    });

    /*CONTROLAR LONGITUD TEXTAREAS Modificar Ficha*/
    $('.fichaDescripcion').on('keyup','textarea[name="descripcion"]',function() {
        var total_letras = 255;
        var longitud = $(this).val().length;
        var resto = total_letras - longitud;
        $('.fichaDescripcion span.contador').html(resto+"/"+255);
        if(resto <= 0){
            $('textarea[name="descripcion"]').attr("maxlength", 255);
        }
    });

    /*CONTROLAR LONGITUD TEXTAREAS Insertar Animal*/
    $('#insertarModal').on('keyup','textarea[name="descripcion"]',function() {
        var total_letras = 255;
        var longitud = $(this).val().length;
        var resto = total_letras - longitud;
        $('#insertarModal span.contador').html(resto+"/"+255);
        if(resto <= 0){
            $('textarea[name="descripcion"]').attr("maxlength", 255);
        }
    });

    /*SELECCIONAR DIRECCIÓN*/
    $('.direccionesExistentes').change(function(){
        if($(this).val() != 'nada'){
            $('.msgTipo').text('Dirección existente');
            $('.tipoExistente input').attr('disabled','disabled');

            /*Errores anteriores*/
            $('#formInsertar input[name="provincia"]').removeClass('error');
            $('#formInsertar small.provincia').remove();
            $('#formInsertar input[name="localidad"]').removeClass('error');
            $('#formInsertar small.localidad').remove();
            $('#formInsertar input[name="calle"]').removeClass('error');
            $('#formInsertar small.calle').remove();
            $('#formInsertar input[name="numero"]').removeClass('error');
            $('#formInsertar small.numero').remove();

            /*RELLENAR SELECT*/
            $.ajax({
                url: "/gestion/eventos/direcciones/detalles/"+$(this).val(),
                method: "GET",
                success: function(detalles){                    
                    var numero;
                    if(detalles[0].numero == null){
                        numero='';
                    }else{
                        numero=detalles[0].numero;
                    }
                    $('.tipoExistente input[name="provincia"]').val(detalles[0].provincia);
                    $('.tipoExistente input[name="localidad"]').val(detalles[0].localidad);
                    $('.tipoExistente input[name="calle"]').val(detalles[0].calle);
                    $('.tipoExistente input[name="numero"]').val(numero);

                }
            });
        }else{
            $('.msgTipo').text('Dirección nueva');
            $('.tipoExistente input').attr('disabled',false);
            $('.tipoExistente input').val('');
        }
    });

    /*VERIFICAR FORMULARIO INSERTAR*/
    $('#formInsertar').on('blur','input, textarea', function(){
        validarInsertar($(this));
    });

    $('#formInsertar .acepta').click(function(){
        validarInsertar($('#formInsertar input, textarea'));
        insertarEvento();
    });


    /*INSERTAR ALEATORIO*/
    $('.insertAleatorio').click(function(){
        $('#formInsertar input[name="foto"]').val('');
    });
    /*MODIFICAR EVENTO*/
    $('.fichaBotones button.modificar').click(function(){
        $(this).hide('slow');
        $('.fichaBotones button.eliminar').hide('slow');
        $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').show('slow');
        modoModificar();
    });
    /*CANCELAR MODIFICADO*/
    $('.fichaBotones button.cancelarModificar').click(function(){
        $('.fichaBotones button.modificar').show('slow');
        $('.fichaBotones button.eliminar').show('slow');
        $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').hide('slow');
        mostrarFicha($('.fichaEvento').attr('id').split('id')[1]);
    });

    /*VALIDAR MODIFICADO*/
    $('.formModifcar').on('blur','input, textarea', function(){
        validarModificar($(this));
    });
    $('.formModifcar .guardar').click(function(){
        validarModificar($('.formModifcar input, .formModifcar textarea'));
        modificarDatos();
    });

    /*COMPROBAR LA ELIMINACION DEL MODAL*/
    $('#eliminarModal button.acepta').click(function(){
        eliminarEvento($('#eliminarModal .modal-content').attr('id'));
    });

    /*CANCELAR FICHA*/
    $('.fichaEvento .fichaTitulo img').click(function(){
        $('tbody tr').removeClass('seleccionado'); 
        $('#ficha').hide('slow');
    });
    /*SELECCIONAR UNA FILA*/
    $('tbody').on('click', 'tr',function(){
        $('.fichaBotones button.modificar').show('slow');
        $('.fichaBotones button.eliminar').show('slow');
        $('.fichaBotones button.guardar, .fichaBotones button.cancelarModificar').hide('slow');
        $('tbody tr').removeClass('seleccionado'); 
        $(this).addClass('seleccionado');

        mostrarFicha($(this).attr('id').split('id')[1]);
    });


    /*BUSCAR CONTENIDO DE LA TABLA*/
    $("#filtroEvento").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $('tbody#tablaEventos tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    /*FOTOS*/



    /*SUBIR FOTO*/
    $('div.fichaFotos span.botones .subirFoto').click(function(){
        $(this).hide('slow');
        $('.fichaFotos .seleccionarFoto').show('slow');
        $('.fileValor').text('# No se ha seleccionado nada');

    });
    /*COMPROBAR QUE HA SUBIDO ALGO*/
    $('.insertarImagen input[name="foto"]').change(function(){
        if($('.insertarImagen input[name="foto"]').val() != ''){
            var img=$('.insertarImagen input[name="foto"]').val().split('\\');
            $('.fileValor').text( '# Imagen seleccionado '+img[2]);
        }
    });

    /*SUBIR LA FOTO*/
    $('.botonesInsertar .insertarFoto, .insertarImagen .aleatorio').click(function(){
        var img=$('.insertarImagen input[name="foto"]').val().split('\\');

        var msgError='';

        if($('.insertarImagen input[name="foto"]').val() != ''){

            $('#informacionModal div.modal-content').addClass('correcto');
            $('#informacionModal div.modal-content').removeClass('incorrecto');

            var formato=img[2].split('.');
            if(formato[1] != 'jpg' && formato[1] != 'JPG' && formato[1] != 'png' && formato[1] != 'PNG'){
                msgError+='El formato no es correcto, debe ser JPG o PNG'; 
                $('#informacionModal div.modal-content').addClass('incorrecto');
                $('#informacionModal div.modal-content').removeClass('correcto');
            }

        }else{
            msgError+='No se ha insertado ninguna imagen'; 
            $('#informacionModal div.modal-content').addClass('incorrecto');
            $('#informacionModal div.modal-content').removeClass('correcto');
        }

        $('#informacionModal h4.modal-title').text('Editar Foto');
        $('#informacionModal div.card-body').text(msgError);

        if(msgError != '' && $(this).hasClass('aleatorio') == false){
            $("#informacionModal").modal("show");
            $('.insertarImagen input[name="foto"]').val('');
            $('div.fichaFotos .seleccionarFoto .cancelarFoto').trigger('click');

        }else{
            var data = $('form.formFoto').serialize();
            data = new FormData($('form.formFoto')[0]);
            $.ajax({
                url: "/gestion/eventos/editar/foto/"+$('.fichaEvento').attr('id').split('id')[1],
                processData: false,
                contentType: false,
                type: "POST",
                data: data,
                success: function(modificado){
                    console.log(modificado);
                    var msgError='';

                    mostrarFicha($('.fichaEvento').attr('id').split('id')[1]);
                    rellenarTabla();
                    $('tr#id'+$('.fichaEvento').attr('id').split('id')[1]).addClass('seleccionado');

                    if(modificado == '1'){
                        msgError+='Se ha modificado correctamente la foto'; 
                        $('#informacionModal div.modal-content').addClass('correcto');
                        $('#informacionModal div.modal-content').removeClass('incorrecto');
                    }else{
                        msgError+='No se ha modificado correctamente la foto'; 
                        $('#informacionModal div.modal-content').removeClass('correcto');
                        $('#informacionModal div.modal-content').addClass('incorrecto');
                    }

                    $('input[name="foto"]').val('');
                    $('div.fichaFotos span.botones .subirFoto').show('slow');
                    $('.fichaFotos .seleccionarFoto').hide('slow');

                    $('#informacionModal h4.modal-title').text('Modificar Foto');

                    $('#informacionModal div.card-body').text(msgError);

                    $("#informacionModal").modal("show");



                }
            });

        }
    });
    /*CANCELAR FOTO*/
    $('div.fichaFotos .seleccionarFoto .cancelarFoto').click(function(){
        $('div.fichaFotos span.botones .subirFoto').show('slow');
        $('.fichaFotos .seleccionarFoto').hide('slow');
    });



});

/**
* INSERTAR EVENTO: Función que através de los datos del formulario de insertar, añade un nuevo evento
*
* @param void
* @return void
*/
function insertarEvento(){
    if($('#formInsertar input.error, textarea.error').length == 0){

        var data = $('#formInsertar').serialize();
        data = new FormData($('#formInsertar')[0]);

        $.ajax({
            url: "/gestion/eventos/insertar",
            processData: false,
            contentType: false,
            type: "POST",
            data: data,
            success: function(insertado){
                var msgError='';
                if(insertado ==1){
                    msgError+='Se ha insertado correctamente el evento'; 
                    $('#informacionModal div.modal-content').addClass('correcto');
                    $('#informacionModal div.modal-content').removeClass('incorrecto');

                }else{
                    msgError+='No se ha insertado correctamente el evento'; 
                    $('#informacionModal div.modal-content').removeClass('correcto');
                    $('#informacionModal div.modal-content').addClass('incorrecto');
                }
                $('#ficha').hide();
                rellenarTabla();
                $("#eliminarModal").modal("hide");
                $('#informacionModal h4.modal-title').text('Insertar Evento');
                $('#informacionModal div.card-body').text(msgError);

                $('#insertarModal').modal('hide');
                $("#informacionModal").modal("show");
            }
        });


    }
}
/**
* VALIDAR FORMULARIO: Función para validar los datos del formulario insertar evento
*
* @param objeto $elemento
* @return void
*/
function validarInsertar(elemento){
    var inputs=elemento;
    for(var i=0;i<inputs.length;i++){

        /*NOMBRE*/
        if($(inputs[i]).attr('name') == 'nombre'){
            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $(inputs[i]).addClass('error');
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># No se permite caracteres númericos, y un máximo de 25 caracteres con un minimo de 3.</small>');
            }
        }

        /*FECHA*/
        if($(inputs[i]).attr('name') == 'fecha'){
            var hoy = new Date();
            var fechaFormulario = new Date($(inputs[i]).val());

            /*Comprueba que no se haya insertado una fecha futura*/
            if (hoy > fechaFormulario){
                $('.recaudacion').show();
            }else{
                $('.recaudacion').hide();
                $('.recaudacion input').val('');
            }

            if($(inputs[i]).val() != ''){
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># No puede estar el campo vacio</small>');
            }
        }

        /*RECAUDACION*/
        if($(inputs[i]).attr('name') == 'recaudacion'){
            if($(inputs[i]).val().match(/^[0-9]{0,11}$/)){
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();

            }else{
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite caracteres numericos, con un minimo de 0 digito y un máximo de 11.</small>');

            }


        }


        /*HORA INICIO*/
        if($(inputs[i]).attr('name') == 'inicio'){

            var hora1 = $(inputs[i]).val().split(":");
            hora1= parseInt(hora1[0])*60+parseInt(hora1[1]);

            var hora2 = $('#formInsertar input[name="fin"]').val().split(":");
            hora2= parseInt(hora2[0])*60+parseInt(hora2[1]);

            if(hora1 > hora2 || hora1 == hora2 ){
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># La hora de inicio no puede ser después o igual a la de finalizar</small>');
            }else{
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }

            /*COMPROBAR LA HORA FIN*/

            var hora1 = $('#formInsertar input[name="fin"]').val().split(":");
            hora1= parseInt(hora1[0])*60+parseInt(hora1[1]);

            var hora2 = $('#formInsertar input[name="inicio"]').val().split(":");
            hora2= parseInt(hora2[0])*60+parseInt(hora2[1]);

            if(hora1 < hora2 || hora1 == hora2 ){
                $('#formInsertar input[name="fin"]').addClass('error');
                $('#formInsertar small.fin').remove();
                $($('#formInsertar input[name="fin"]')).parent().append('<small class="fin error"># La hora de finalizacion no puede ser antes o igual a la de inicio</small>');
            }else{
                $('#formInsertar input[name="fin"]').removeClass('error');
                $('#formInsertar small.fin').remove();
            }

        }

        /*HORA FIN*/
        if($(inputs[i]).attr('name') == 'fin'){

            var hora1 = $(inputs[i]).val().split(":");
            hora1= parseInt(hora1[0])*60+parseInt(hora1[1]);

            var hora2 = $('#formInsertar input[name="inicio"]').val().split(":");
            hora2= parseInt(hora2[0])*60+parseInt(hora2[1]);

            if(hora1 < hora2 || hora1 == hora2 ){
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># La hora de finalizacion no puede ser antes o igual a la de inicio</small>');
            }else{
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }

            /*COMPROBAR LA HORA INICIO*/

            var hora1 = $('#formInsertar input[name="inicio"]').val().split(":");
            hora1= parseInt(hora1[0])*60+parseInt(hora1[1]);

            var hora2 = $('#formInsertar input[name="fin"]').val().split(":");
            hora2= parseInt(hora2[0])*60+parseInt(hora2[1]);

            if(hora1 > hora2 || hora1 == hora2 ){
                $('#formInsertar input[name="inicio"]').addClass('error');
                $('#formInsertar small.inicio').remove();
                $('#formInsertar input[name="inicio"]').parent().append('<small class="inicio error"># La hora de inicio no puede ser después o igual a la de finalizar</small>');
            }else{
                $('#formInsertar input[name="inicio"]').removeClass('error');
                $('#formInsertar small.inicio').remove();
            }

        }
        /*AFORO*/
        if($(inputs[i]).attr('name') == 'aforo'){
            if($(inputs[i]).val().match(/^[0-9]{0,11}$/)){
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();

                if($(inputs[i]).val() == ''){
                    $(inputs[i]).val('0');   
                }

            }else{
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo se permite caracteres númericos con un mínimo de 0 y máximo de 11.</small>');

            }

        }
        /*DESCRIPCIÓN*/
        if($(inputs[i]).attr('name') == 'descripcion'){
            if($(inputs[i]).val() == '' || $(inputs[i]).val().length > 500){
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo se permite un tamaño de 2</small>');
            }else{
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }
        }

        /*PROVINCIA*/
        if($(inputs[i]).attr('name') == 'provincia'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');
            }

        }

        /*LOCALIDAD*/
        if($(inputs[i]).attr('name') == 'localidad'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');
            }

        }

        /*CALLE*/
        if($(inputs[i]).attr('name') == 'calle'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\/\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');
            }
        }

        /*NUMERO*/
        if($(inputs[i]).attr('name') == 'numero'){
            if($(inputs[i]).val().match(/^[0-9]{0,3}$/)){
                $(inputs[i]).removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();

            }else{
                $(inputs[i]).addClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite caracteres numericos, con un minimo de 0 digito y un máximo de 3.</small>');

            }
        }

        if($(inputs[i]).attr('name') == 'foto'){
            if($(inputs[i]).val() != ''){
                var img=$(inputs[i]).val().split('\\');
                var formato = img[2].split('.');
                if(formato[1] != 'jpg' && formato[1] != 'JPG' && formato[1] != 'png' && formato[1] != 'PNG'){
                    $('#formInsertar .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                    $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                    $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo admite los formatos JPG y PNG.</small>');

                }else{
                    $('#formInsertar .form-group input[name='+$(inputs[i]).attr("name")+']').removeClass('error');
                    $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
                }

            }else{
                $('#formInsertar .form-group input[name='+$(inputs[i]).attr("name")+']').removeClass('error');
                $('#formInsertar small.'+$(inputs[i]).attr('name')).remove();
            }
        }
    }
}

/**
* FICHA EVENTO: Función que muestra la ficha de Evento seleccionado, con todos los datos sacados de ajax
*
* @param int id
* @return void
*/

function mostrarFicha(id){
    $.ajax({
        url: "/gestion/eventos/id/"+id,
        method: "GET",
        success: function(evento){
            /*Vencimiento*/
            var vencimiento;
            var clase;
            if(evento[0].caducidad == false){
                vencimiento='Próximo';
                clase='proximo';
                msg='';
            }else{
                vencimiento='Pasado';
                clase='pasado';
            }
            /*AFORO*/
            var aforo;
            if(evento[0].aforo == null){
                aforo=0;
            }else{
                aforo=evento[0].aforo;
            }
            var numero;
            /*NUMERO*/
            if(evento[0].numero == null){
                numero='';
            }else{
                numero=evento[0].numero;
            }

            var donacion;
            if(evento[0].donacion.length == 0){
                donacion='';
            }else{
                donacion='<p><span class="titulo">Recaudación</span>&nbsp&nbsp<span class="recaudacionVal">'+evento[0].donacion[0].cantidad+'€</span></p>';
            }


            $('.fichaEvento').attr('id','id'+evento[0].id);
            $('.fichaEvento .fichaDescripcion').empty();

            $('.fichaEvento .fichaDescripcion').append('<p><span class="titulo">Nombre</span>&nbsp&nbsp<span class="nombre">'+evento[0].nombre+'</span></p><hr><p><span class="titulo">Fecha</span>&nbsp&nbsp<span class="fecha">'+evento[0].fecha+'</span></p><p><span class="titulo">Hora inicio</span>&nbsp&nbsp<span class="inicio">'+evento[0].hora_inicio+'</span></p><p><span class="titulo">Hora fin</span>&nbsp&nbsp<span class="fin">'+evento[0].hora_fin+'</span></p><hr><p><span class="titulo">Aforo</span>&nbsp&nbsp<span class="aforo">'+aforo+'</span><br></p><p><span class="titulo">Estado</span>&nbsp&nbsp<span class="'+clase+' estado">'+vencimiento+'</span></p><span class="donacion">'+donacion+'</span><p><span class="titulo">Descripción</span><br><span class="descripcion">'+evento[0].descripcion+'</span></p><hr><div class="direccion"><p><span class="titulo">Provincia</span>&nbsp&nbsp<span class="provincia">'+evento[0].provincia+'</span></p><p><span class="titulo">Localidad</span>&nbsp&nbsp<span class="localidad">'+evento[0].localidad+'</span></p><p><span class="titulo">Calle</span>&nbsp&nbsp<span class="calle">'+evento[0].calle+'</span></p><p><span class="titulo">Numero</span>&nbsp&nbsp<span class="numero">'+numero+'</span></div></p>');

            $('#ficha').show('slow');

            $('div.fichaEvento .fichaFotos div.galeria').empty();
            if(evento[0].foto.length == 0){
                $('div.fichaEvento .fichaFotos div.galeria').append('<span>#No hay fotos de este evento</span>');
            }else{
                $('div.fichaEvento .fichaFotos div.galeria').append('<span><img id="foto'+evento[0].foto[0].id+'" class="principal" src="/img/'+evento[0].foto[0].ruta+''+evento[0].foto[0].titulo+'.'+evento[0].foto[0].formato+'" alt="'+evento[0].foto[0].titulo+'"></span>');
            }
        }
    });
}
/**
* MODIFICAR EVENTO: Función que pasando por una petición ajax el formulario de modificación cambia los datos del evento
*
* @param void
* @return void
*/
function modificarDatos(){
    if($('.fichaDescripcion small.error').length == 0){

        $.ajax({
            url: "/gestion/eventos/modificar/id/"+$('.fichaEvento').attr('id').split('id')[1],
            method: "POST",
            data: $('form.formModifcar').serialize(),
            success: function(modificado){
                var msgError='';
                if(modificado ==1){
                    msgError+='Se ha modificado correctamente el evento'; 
                    $('#informacionModal div.modal-content').addClass('correcto');
                    $('#informacionModal div.modal-content').removeClass('incorrecto');

                }else{
                    msgError+='No se ha modificado correctamente el evento'; 
                    $('#informacionModal div.modal-content').removeClass('correcto');
                    $('#informacionModal div.modal-content').addClass('incorrecto');
                }
                $('#ficha').hide();
                rellenarTabla();
                mostrarFicha($('.fichaEvento').attr('id').split('id')[1]);
                $('#informacionModal h4.modal-title').text('Modificar Evento');
                $('#informacionModal div.card-body').text(msgError);

                $("#informacionModal").modal("show");
                $('button.cancelarModificar').trigger('click');
            }
        });
    }
}

/**
* RELLENAR TABLA: Función que saca todos los eventos y los añade a la tabla
*
* @param void
* @return void
*/
function rellenarTabla(){
    $.ajax({
        url: "/inicio/eventos",
        method: "GET",
        success: function(eventos){
            $('#tablaEventos').empty();
            var vencimiento;
            for(var i in eventos){

                /*AFORO*/
                var aforo;
                if(eventos[i].aforo == null){
                    aforo='No hay aforo';
                }else{
                    aforo=eventos[i].aforo;
                }

                /*HORAS*/
                var inicio;
                var fin;

                inicio=eventos[i].hora_inicio.split(':');
                inicio=inicio[0]+':'+inicio[1];

                fin=eventos[i].hora_fin.split(':');
                fin=fin[0]+':'+fin[1];


                if(eventos[i].caducidad == false){
                    vencimiento="Próximo";
                    venClase="proximo";
                }else{
                    vencimiento="Pasado";
                    venClase="pasado";
                }
                $('#tablaEventos').append('<tr id="id'+eventos[i].id+'"><td>'+eventos[i].nombre+'</td><td>'+eventos[i].fecha+'</td><td>'+inicio+'</td><td>'+fin+'</td><td><span  class="'+venClase+'">'+vencimiento+'</span></td><td>'+aforo+'</td><td class="eliminar"><img class="papelera" src="/img/web/icons/papelera.svg" alt="papelera" title="Eliminar"></td></tr>');
            }
        }
    });
}
/**
* VALIDAR DATOS: Función para modificar los parametros del evento seleccionado
*
* @param void
* @return void
*/
function validarModificar(elemento){

    var inputs=elemento;
    for(var i=0;i<inputs.length;i++){

        /*NOMBRE*/
        if($(inputs[i]).attr('name') == 'nombre'){
            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $(inputs[i]).addClass('error');
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># No se permite caracteres númericos, y un máximo de 25 caracteres con un minimo de 3.</small>');
            }
        }

        /*FECHA*/
        if($(inputs[i]).attr('name') == 'fecha'){
            if($(inputs[i]).val() != ''){
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();

                var hoy = new Date();
                var fechaFormulario = new Date($(inputs[i]).val());

                /*Comprueba que no se haya insertado una fecha futura*/
                if (hoy > fechaFormulario){
                    $('span.donacion').show();
                    if($('span.donacion').find("span").length == 0 ){
                        $('span.donacion').empty();
                        $('span.donacion').append('<p><span class="titulo">Recaudación</span>&nbsp&nbsp<span class="recaudacionVal"><input class="form-control w-50" type="text" name="recaudacion" value=""></span></p>');
                    }
                    $('span.estado').removeClass('proximo');
                    $('span.estado').addClass('pasado');
                    $('span.estado').text('Pasado');

                }else{
                    $('span.estado').removeClass('pasado');
                    $('span.estado').addClass('proximo');
                    $('span.estado').text('Próximo');
                    $('input[name="recaudacion"]').removeClass('error');
                    $('.formModifcar small.recaudacion').remove();
                    $('span.donacion').empty();
                    $('span.donacion').hide();
                }
            }else{

                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># No puede estar el campo vacio</small>');
            }
        }
        /*RECAUDAR*/
        if($(inputs[i]).attr('name') == 'recaudacion'){
            if($(inputs[i]).val().match(/^[0-9]{0,11}$/)){
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();

            }else{
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite caracteres numericos, con un minimo de 0 digito y un máximo de 11.</small>');

            }
        }




        /*HORA INICIO*/
        if($(inputs[i]).attr('name') == 'inicio'){

            var hora1 = $(inputs[i]).val().split(":");
            hora1= parseInt(hora1[0])*60+parseInt(hora1[1]);

            var hora2 = $('.formModifcar input[name="fin"]').val().split(":");
            hora2= parseInt(hora2[0])*60+parseInt(hora2[1]);

            if(hora1 > hora2 || hora1 == hora2 ){
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># La hora de inicio no puede ser después o igual a la de finalizar</small>');
            }else{
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
            }

            /*COMPROBAR LA HORA FIN*/
            var hora1 = $('.formModifcar input[name="fin"]').val().split(":");
            hora1= parseInt(hora1[0])*60+parseInt(hora1[1]);

            var hora2 = $('.formModifcar input[name="inicio"]').val().split(":");
            hora2= parseInt(hora2[0])*60+parseInt(hora2[1]);

            if(hora1 < hora2 || hora1 == hora2 ){
                $('.formModifcar input[name="fin"]').addClass('error');
                $('.formModifcar small.fin').remove();
                $($('.formModifcar input[name="fin"]')).parent().append('<small class="fin error"># La hora de finalizacion no puede ser antes o igual a la de inicio</small>');
            }else{
                $('.formModifcar input[name="fin"]').removeClass('error');
                $('.formModifcar small.fin').remove();
            }

        }

        /*HORA FIN*/
        if($(inputs[i]).attr('name') == 'fin'){

            var hora1 = $(inputs[i]).val().split(":");
            hora1= parseInt(hora1[0])*60+parseInt(hora1[1]);

            var hora2 = $('.formModifcar input[name="inicio"]').val().split(":");
            hora2= parseInt(hora2[0])*60+parseInt(hora2[1]);

            if(hora1 < hora2 || hora1 == hora2 ){
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># La hora de finalizacion no puede ser antes o igual a la de inicio</small>');
            }else{
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
            }

            /*COMPROBAR LA HORA INICIO*/

            var hora1 = $('.formModifcar input[name="inicio"]').val().split(":");
            hora1= parseInt(hora1[0])*60+parseInt(hora1[1]);

            var hora2 = $('.formModifcar input[name="fin"]').val().split(":");
            hora2= parseInt(hora2[0])*60+parseInt(hora2[1]);

            if(hora1 > hora2 || hora1 == hora2 ){
                $('.formModifcar input[name="inicio"]').addClass('error');
                $('.formModifcar small.inicio').remove();
                $('.formModifcar input[name="inicio"]').parent().append('<small class="inicio error"># La hora de inicio no puede ser después o igual a la de finalizar</small>');
            }else{
                $('.formModifcar input[name="inicio"]').removeClass('error');
                $('.formModifcar small.inicio').remove();
            }

        }
        /*AFORO*/
        if($(inputs[i]).attr('name') == 'aforo'){
            if($(inputs[i]).val().match(/^[0-9]{0,11}$/)){
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();

                if($(inputs[i]).val() == ''){
                    $(inputs[i]).val('0');   
                }

            }else{
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo se permite caracteres númericos con un mínimo de 0 y máximo de 11.</small>');

            }

        }
        /*DESCRIPCIÓN*/
        if($(inputs[i]).attr('name') == 'descripcion'){
            if($(inputs[i]).val() == '' || $(inputs[i]).val().length > 500){
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># La hora de finalizacion no puede ser antes o igual a la de inicio</small>');
            }else{
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
            }
        }

        /*PROVINCIA*/
        if($(inputs[i]).attr('name') == 'provincia'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');
            }

        }

        /*LOCALIDAD*/
        if($(inputs[i]).attr('name') == 'localidad'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');
            }

        }

        /*CALLE*/
        if($(inputs[i]).attr('name') == 'calle'){

            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\/\s]{3,25}$/)){
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</small>');
            }
        }

        /*NUMERO*/
        if($(inputs[i]).attr('name') == 'numero'){
            if($(inputs[i]).val().match(/^[0-9]{0,3}$/)){
                $(inputs[i]).removeClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();

            }else{
                $(inputs[i]).addClass('error');
                $('.formModifcar small.'+$(inputs[i]).attr('name')).remove();
                $($(inputs[i])).parent().append('<small class="'+$(inputs[i]).attr('name')+' error"># Solo permite caracteres numericos, con un minimo de 0 digito y un máximo de 3.</small>');

            }
        }



    }

}

/**
* MODIFICAR DATOS: Función para modificar los parametros del evento seleccionado
*
* @param void
* @return void
*/
function modoModificar(){

    var nombre=$('.fichaDescripcion span.nombre').text();
    var fecha=$('.fichaDescripcion span.fecha').text();
    var inicio=$('.fichaDescripcion span.inicio').text();
    var fin=$('.fichaDescripcion span.fin').text();
    var aforo=$('.fichaDescripcion span.aforo').text();
    var descripcion=$('.fichaDescripcion span.descripcion').text();
    var recaudacion=$('.fichaDescripcion span.recaudacionVal').text().split('€')[0];
    var estado=$('.fichaDescripcion span.estado').text();

    if(estado == 'Pasado'){
        var posicion=$('.fichaDescripcion hr')[0];
        $(posicion).after('<small class="aviso m-2 p-2">IMPORTANTE Estas modificando una fecha pasada</small>');
    }else{
        var posicion=$('.fichaDescripcion hr')[0];
        $(posicion).remove();
    }

    var posicion=$('.fichaDescripcion hr')[1];
    $(posicion).after('<small class="aviso ml-2 mb-2 p-2">AVISO Para poner sin limite, se representa con 0</small>');

    var provincia=$('.fichaDescripcion span.provincia').text();
    var localidad=$('.fichaDescripcion span.localidad').text();
    var calle=$('.fichaDescripcion span.calle').text();
    var numero=$('.fichaDescripcion span.numero').text();
    if(recaudacion != ''){
        $('.fichaDescripcion span.recaudacionVal').html('<input class="form-control w-50" type="text" name="recaudacion" value="'+recaudacion+'">');
    }

    if(estado == 'Pasado'){
        //        $('span.donacion').empty();
        //        $('span.donacion').append('<p><span class="titulo">Recaudación</span>&nbsp&nbsp<span class="recaudacionVal"><input class="form-control w-50" type="text" name="recaudacion" value="0"></span></p>');
    }


    $('.fichaDescripcion span.nombre').html('<input class="form-control w-50" type="text" name="nombre" value="'+nombre+'">');


    $('.fichaDescripcion span.fecha').html('<input class="form-control w-50" type="date" name="fecha" value="'+fecha+'">');

    $('.fichaDescripcion span.inicio').html('<input class="form-control w-50" type="time" name="inicio" value="'+inicio+'">');

    $('.fichaDescripcion span.fin').html('<input class="form-control w-50" type="time" name="fin" value="'+fin+'">');

    $('.fichaDescripcion span.aforo').html('<input class="form-control w-50" type="text" name="aforo" value="'+aforo+'">');

    $('.fichaDescripcion span.descripcion').html('<textarea class="form-control w-100" name="descripcion">'+descripcion+'</textarea>');

    $('.fichaDescripcion span.descripcion').parent().append('<span class="contador"></span>');
    var total_letras=255;
    var longitud = $('.fichaDescripcion textarea[name="descripcion"]').val().length;
    var resto = total_letras - longitud;
    $('.fichaDescripcion span.contador').html(resto+"/"+255);


    $('.fichaDescripcion span.provincia').html('<input class="form-control w-50" type="text" name="provincia" value="'+provincia+'">');

    $('.fichaDescripcion span.localidad').html('<input class="form-control w-50" type="text" name="localidad" value="'+localidad+'">');
    $('.fichaDescripcion span.calle').html('<input class="form-control w-50" type="text" name="calle" value="'+calle+'">');

    $('.fichaDescripcion span.numero').html('<input class="form-control w-50" type="text" name="numero" value="'+numero+'">');

}


/**
* ELIMINAR EVENTO: Función que pasando el parametro id por una petición ajax borra el evento
*
* @param int id
* @return void
*/
function eliminarEvento(id){
    $.ajax({
        url: "/gestion/eventos/eliminar/id/"+id,
        method: "GET",
        success: function(eliminado){
            var msgError='';
            if(eliminado == ''){
                msgError+='Se ha eliminado correctamente el evento'; 
                $('#informacionModal div.modal-content').addClass('correcto');
                $('#informacionModal div.modal-content').removeClass('incorrecto');
            }else{
                msgError+='No se ha eliminado correctamente el evento'; 
                $('#informacionModal div.modal-content').removeClass('correcto');
                $('#informacionModal div.modal-content').addClass('incorrecto');
            }
            $('#ficha').hide();
            rellenarTabla();
            $("#eliminarModal").modal("hide");
            $('#informacionModal h4.modal-title').text('Eliminar Evento');
            $('#informacionModal div.card-body').text(msgError);
            $("#informacionModal").modal("show");

        }
    });
}