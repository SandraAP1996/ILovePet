$(function(){

    /*INICIO*/
    $('#ficha').hide();
    $('.animalCards').hide();
    $('.fichaAnimal').hide();

    /*BUSCAR CONTENIDO DE LA TABLA*/
    $("#inputPersona, #inputAnimal").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $('tbody.filtro'+$(this).attr('id').split('input')[1]+' tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    /*ACOGIDA/ADOPCION*/
    $('#ficha').on('click','button.adoptar, button.acoger',function(){
        var idPersona=$('.fichaPersona').attr('id').split('idPersona')[1];
        var idAnimal=$('.fichaAnimal .col-12').attr('id').split('idAnimal')[1];
        var tipo;
        if($(this).hasClass('adoptar') == true){
            tipo="adoptado";
        }else{
            tipo="acogida";
        }

        $.ajax({
            url: "/gestion/tramite/"+tipo+"/animal/"+idAnimal+"/persona/"+idPersona,
            method: "GET", 
            success: function(adoptar){
                var msgError='';
                if(adoptar == 1){
                    msgError+='Se ha añadido correctamente la '+tipo+''; 
                    $('#informacionModal div.modal-content').addClass('correcto');
                    actualizarDatos(idPersona);
                }else{
                    msgError+='No se ha añadido correctamente la '+tipo+''; 
                    $('#informacionModal div.modal-content').addClass('incorrecto');
                }
                $('#informacionModal h4.modal-title').text('Poner en Adopción/Acogida');
                $('#informacionModal div.card-body').text(msgError);
            }
        }); 
        $('.fichaAnimal .form-row div#idAnimal'+idAnimal).remove();
        $("#informacionModal").modal("show");
    });



    /*CANCELAR ACOGIDA / CANCELAR ADOPCION*/
    $('.animalCards').on('click','.cancelar',function(){

        $.ajax({
            url: "/gestion/tramite/cancelar/id/"+$(this).attr('id').split('cancelar')[1],
            method: "GET", 
            success: function(animal){
                var msgError='';

                if(animal == 1){
                    msgError+='Se ha eliminado correctamente la adopción/acogida'; 
                    $('#informacionModal div.modal-content').addClass('correcto');
                    actualizarDatos($('.fichaPersona').attr('id').split('idPersona')[1]);
                }else{
                    msgError+='No se ha eliminado correctamente la adopción/acogida'; 
                    $('#informacionModal div.modal-content').addClass('incorrecto');
                }
                $('#informacionModal h4.modal-title').text('Eliminado Adopción/Acogida');
                $('#informacionModal div.card-body').text(msgError);
            }
        }); 
        $("#informacionModal").modal("show");
    });


    /*SELECCIONAR TR*/
    $('tbody').on('click','tr',function(){

        if($(this).hasClass('persona')){
            $('tr').removeClass('seleccionado');
            $(this).addClass('seleccionado'); 
            $.ajax({
                url: "/gestion/tramite/persona/id/"+$(this).attr('id').split('persona')[1],
                method: "GET", 
                success: function(persona){

                    $('#ficha').show('slow');

                    $('.fichaPersona .fichaDescripcion').empty();
                    $('.fichaPersona .animalCards .form-row').empty();
                    $('.fichaPersona .fichaDescripcion').append('<p><span class="titulo">NIF</span>&nbsp&nbsp<span class="nif">'+persona.nif+'</span> </p><p><span class="titulo">Nombre</span>&nbsp&nbsp <span class="nombre">'+persona.nombre+' </span></p><hr><p><span class="titulo">Apellidos</span>&nbsp&nbsp <span class="apellidos">'+persona.apellidos+'</span></p><p><span class="titulo">Fecha Nacimiento</span>&nbsp&nbsp <span class="fecha">'+persona.fecha_nacimiento+'</span></p><hr><p><span class="titulo">Teléfono</span>&nbsp&nbsp<span class="telefono">'+persona.telefono+'</span></p><p><span class="titulo">Email</span>&nbsp&nbsp <span class="email">'+persona.email+'</span></p>');

                    $('.fichaPersona').attr('id','idPersona'+persona.id);


                    $('.filtroAnimal tr').removeClass('seleccionado');
                    if(persona.animal.length >=1){

                        for( var i in persona.animal){    
                            $('tr#animal'+persona.animal[i].id).addClass('seleccionado');

                            $('.fichaPersona .animalCards .form-row').append('<div class="col-5  card pl-3"><div class="d-flex"><span class="mr-auto"><p><span class="titulo">CHIP</span> '+persona.animal[i].chip+'</p></span><span class="situacion"> <button id="cancelar'+persona.animal[i].id+'" type="button" class="btn btn-sm cancelar '+persona.animal[i].situacion+'">Cancelar <span>'+persona.animal[i].situacion+'</span></button></span></div><p><span class="titulo">Nombre</span> '+persona.animal[i].nombre+'</p><p><span class="titulo">Situación/Estado</span>&nbsp '+persona.animal[i].situacion+'&nbsp&nbsp/&nbsp&nbsp'+persona.animal[i].estado+'</p><p><span class="titulo">Fecha</span> 654789321</p></div>');

                        }
                        $('.animalCards').show('slow');

                    }

                    if($('.fichaAnimal .form-row').find("div").length){
                        $('.fichaAnimal').show();

                    }
                }
            });  

        }else{
            if($(this).hasClass('seleccionadoNuevo') == false && $(this).hasClass('seleccionado') == false){
                $(this).addClass('seleccionadoNuevo');

                $.ajax({
                    url: "/gestion/tramite/animal/id/"+$(this).attr('id').split('animal')[1],
                    method: "GET", 
                    success: function(animal){
                        var botones;
                        if(animal.id_persona == null){
                            $('.fichaAnimal  .form-row').append('<div class="col-12 pr-0 mb-3 card" id="idAnimal'+animal.id+'"><div class="d-flex"><span class="mr-auto"><p><span class="titulo">NIF</span> '+animal.chip+'</p></span><span class="situacion"> <button type="button" class="btn btn-sm adoptar">ADOPTAR</button>&nbsp&nbsp<button type="button" class="btn btn-sm acoger">ACOGER</button></span></div><p><span class="titulo">Nombre</span> '+animal.nombre+'</p><p><span class="titulo">Situación/Estado</span> &nbsp'+animal.situacion+'&nbsp&nbsp/&nbsp&nbsp'+animal.estado+'</p></div>'); 

                        }else{
                            $(this).removeClass('seleccionadoNuevo');
                            $('tr#animal'+animal.id).removeClass('seleccionadoNuevo');
                        }
                    }
                });
                $('.fichaAnimal').show('slow');
            }else{
                $(this).removeClass('seleccionadoNuevo');
                $('.fichaAnimal #idAnimal'+$(this).attr('id').split('animal')[1]).remove();

            }            

        }


    });

    /*CANCELAR FICHA*/
    $('.fichaTitulo img').click(function(){
        $('#ficha').hide();
        $('.animalCards').hide();
        $('.fichaAnimal').hide();
        $('.filtroPersona tr').removeClass('seleccionado');
        $('.filtroAnimal tr').removeClass('seleccionado');
    });

});

function actualizarDatos(id){

    /*TABLA*/
    $.ajax({
        url: "/gestion/tramite/actualizar",
        method: "GET", 
        success: function(objeto){

            var clase='';
            /*PERSONAS*/
            $('tbody.filtroPersona').empty();
            for(var i in objeto['personas']){
                if(id == objeto['personas'][i].id){
                    clase='seleccionado';
                }else{
                    clase='';
                }
                $('tbody.filtroPersona').append('<tr id="persona'+objeto['personas'][i].id+'" class="persona '+clase+'"><td>'+objeto['personas'][i].nif+'</td><td>'+objeto['personas'][i].nombre+'</td><td>'+objeto['personas'][i].apellidos+'</td><td>'+objeto['personas'][i].telefono+'</td><td>'+objeto['personas'][i].email+'</td><td>'+objeto['personas'][i].animal['adoptado']+'</td><td>'+objeto['personas'][i].animal['acogida']+'</td></tr>');
            }

            /*ANIMALES*/
            $('tbody.filtroAnimal').empty();
            for(var i in objeto['animales']){
                if(id == objeto['animales'][i].id_persona){
                    clase='seleccionado';
                }else{
                    clase='';
                }
                $('tbody.filtroAnimal').append('<tr id="animal'+objeto['animales'][i].id+'" class="animal '+clase+'"><td>'+objeto['animales'][i].chip+'</td><td>'+objeto['animales'][i].nombre+'</td><td>'+objeto['animales'][i].situacion+'</td><td>'+objeto['animales'][i].estado+'</td></tr>');
            }
        }
    });

    /*FICHA*/
    $.ajax({
        url: "/gestion/tramite/persona/id/"+id,
        method: "GET", 
        success: function(persona){

            $('#ficha').show('slow');
            $('.fichaPersona .fichaDescripcion').empty();
            $('.fichaPersona .animalCards .form-row').empty();
            $('.fichaPersona .fichaDescripcion').append('<p><span class="titulo">NIF</span>&nbsp&nbsp<span class="nif">'+persona.nif+'</span> </p><p><span class="titulo">Nombre</span>&nbsp&nbsp <span class="nombre">'+persona.nombre+' </span></p><hr><p><span class="titulo">Apellidos</span>&nbsp&nbsp <span class="apellidos">'+persona.apellidos+'</span></p><p><span class="titulo">Fecha Nacimiento</span>&nbsp&nbsp <span class="fecha">'+persona.fecha_nacimiento+'</span></p><hr><p><span class="titulo">Teléfono</span>&nbsp&nbsp<span class="telefono">'+persona.telefono+'</span></p><p><span class="titulo">Email</span>&nbsp&nbsp <span class="email">'+persona.email+'</span></p>');
            $('.fichaPersona').attr('id','idPersona'+persona.id);

            $('.filtroAnimal tr').removeClass('seleccionado');
            if(persona.animal.length >=1){

                for( var i in persona.animal){    
                    $('tr#animal'+persona.animal[i].id).addClass('seleccionado');

                    $('.fichaPersona .animalCards .form-row').append('<div class="col-5  card pl-3"><div class="d-flex"><span class="mr-auto"><p><span class="titulo">CHIP</span> '+persona.animal[i].chip+'</p></span><span class="situacion"> <button id="cancelar'+persona.animal[i].id+'" type="button" class="btn btn-sm cancelar '+persona.animal[i].situacion+'">Cancelar <span>'+persona.animal[i].situacion+'</span></button></span></div><p><span class="titulo">Nombre</span> '+persona.animal[i].nombre+'</p><p><span class="titulo">Situación/Estado</span>&nbsp '+persona.animal[i].situacion+'&nbsp&nbsp/&nbsp&nbsp'+persona.animal[i].estado+'</p><p><span class="titulo">Fecha</span> 654789321</p></div>');

                }
                $('.animalCards').show('slow');
            }
            if($('.fichaAnimal .form-row').find("div").length){
                $('.fichaAnimal').show();
            }
        }
    });

}