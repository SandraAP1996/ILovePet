/*
|---------------
| GESTIONAR USUARIOS
|---------------
*/

$(function(){
    /*ACCIONES DE INICIO*/
    validarFormulario();
    rellenarTablaFiltro();

    /*VALIDAR FILTRO de la tabla*/
    $('#filtroPersona input').blur(function(){
        validarFormulario();
        rellenarTablaFiltro();
    });

    /*SELECCIONAR FILA de la tabla*/
    $('body').on('click','tbody tr',function(){
        if($(this).hasClass('seleccionado') == false){
            var id=$(this).attr('class');
            $('tr').removeClass('seleccionado');    
            $(this).addClass('seleccionado');
            id=id.split('id');
            $('.fichaPersona').attr('id',id[1]);
            detallesPersona(id[1]);
        }
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

});



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
                $('div.fichaPersona').css('display','block');
                $('.card').css('display','block');
                $('div.fichaPersona .fichaDescripcion').empty();

                $('div.fichaPersona .fichaDescripcion').append('<p><span class="titulo">NIF</span>&nbsp&nbsp<span class="chip">'+persona[0].nif+'</span> </p><p><span class="titulo">Nombre</span>&nbsp&nbsp <span class="nombre">'+persona[0].nombre+' </span></p><hr><p><span class="titulo">Apellidos</span>&nbsp&nbsp <span class="apellidos">'+persona[0].apellidos+'</span></p><p><span class="titulo">Fecha Nacimiento</span>&nbsp&nbsp <span class="fecha">'+persona[0].fecha_nacimiento+'</span></p><hr><p><span class="titulo">Teléfono</span>&nbsp&nbsp<span class="telefono">'+persona[0].telefono+'</span></p><p><span class="titulo">Email</span>&nbsp&nbsp <span class="email">'+persona[0].email+'</span> </p>');


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
                                console.log('entras¿?');
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
                            $('.donacionCards').append('<h5 class="card-title">Donación</h5><p class="card-text"><span>Cantidad </span>'+persona[0].donacion[i].cantidad+' €</p><p class="card-text"><span>Fecha de donación </span>'+persona[0].donacion[i].created_at+'</p>')
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


