/*
|---------------
| GESTIONAR ANIMALES
|---------------
*/

$(function(){  

    $('#filtroAnimal select[name="raza"]').empty();
    $('#filtroAnimal select[name="raza"]').append('<option value="todo"></option>');

    validarFormulario();
    buscarPorFiltro();
    /*Comprobar cuando se escribe algo en los inputs*/
    $('#filtroAnimal input').blur(function(){
        validarFormulario();
        buscarPorFiltro();
    });
    $('#filtroAnimal select').change(function(){
        validarFormulario();
        buscarPorFiltro();
    });

    /*Reiniciar el Formulario*/
    $('#filtroAnimal button.reiniciar').click(function(){
        $('#filtroAnimal')[0].reset();
        validarFormulario();
        buscarPorFiltro();
    });

    /*Añadir los detalles del animal*/
    $('body').on('click','tbody tr',function(){        
        $('tr').removeClass('seleccionado');    
        $(this).addClass('seleccionado');
        var id=$(this).attr('class');
        id=id.split('id');
        detallesAnimal(id[1]);
    });

    /* ACTIVAR EL MODAL ELIMINAR ANIMAL/FOTO */
    /*ELIMINAR ANIMAL*/
    $('body').on('click','td.eliminar',function(){
        $("#eliminarModal").modal("show");
        $("#eliminarModal .modal-title").text("Eliminar Animal");
        $("#eliminarModal button.acepta").addClass("animal");
        $('#eliminarModal .modal-content').attr('id', $(this).parent().attr('class'));
    });

    $('body').on('click','.fichaBotones button.eliminar', function(){
        $("#eliminarModal").modal("show");
        $("#eliminarModal .modal-title").text("Eliminar Animal");
        $("#eliminarModal button.acepta").addClass("animal");
        $('#eliminarModal .modal-content').attr('id', $(this).attr('id'));

    });
    /*ELIMINAR FOTO*/
    $('button.eliminarFoto').click(function(){
        $("#eliminarModal").modal("show");
        $("#eliminarModal .modal-title").text("Eliminar Foto");
        $('#eliminarModal .modal-content').attr('id', $(this).parent().attr('class'));
        $("#eliminarModal button.acepta").addClass("foto");
    });

    /* INSERTAR ANIMAL */
    $('#filtroAnimal button.insertar').click(function(){
        $("#insertarModal").modal("show");

    });

    /*FORMULARIO INSERTAR*/
    $("#insertarModal form").on('submit', function(evt){
        evt.preventDefault();
        validaInsertar('boton');
        insertarBD();
    });

    /*REINICIAR FORMULARIO*/
    $('#insertarModal form .cancelar').click(function(){
        $('#insertarModal form')[0].reset();
        $('#insertarModal form .error').removeClass('error');
        $('.form-group h6 span').text('');


    });


    $("#insertarModal form input").blur(function(){
        validaInsertar('input',$(this));
    });
    $("#insertarModal form select").change(function(){
        validaInsertar('select',$(this));
    });

    $("#insertarModal form textarea").blur(function(){
        validaInsertar('textarea',$(this));
    });



    /*COMPROBAR LA ELIMINACION DEL MODAL*/
    $('#eliminarModal button.acepta').click(function(){
        if($(this).hasClass('animal') == true){
            $(this).removeClass('animal');
            eliminarAnimal($('#eliminarModal .modal-content').attr('id').split('id')[1]);
        }else{
            $(this).removeClass('foto');
            eliminarFoto($('div.galeria img.seleccionado').attr('id').split('foto')[1]);
        }

    });


    /*Comprobar el click que se le ha hecho a las imagenes de la galeria*/
    $('div.galeria').on('click','img',function(){

        if($('div.galeria img.seleccionado').length == 1 && $(this).hasClass('seleccionado') == true){
            $(this).toggleClass('seleccionado');
        }else{
            $('div.galeria img').removeClass('seleccionado');
            $(this).addClass('seleccionado');
        }

        if($(this).hasClass('seleccionado') == true){
            $('span.botones button.eliminarFoto').css('visibility','visible');
            $('span.botones button.subirFoto').css('visibility','hidden');
        }else{
            $('span.botones button.eliminarFoto').css('visibility','hidden');
            $('span.botones button.subirFoto').css('visibility','visible');
        }
    });

    /*Comprobar si hace click en Cancelar Ficha Animal*/
    $('div.fichaTitulo img').click(function(){
        $('div.fichaAnimal').css('display','none');
        $('tr').removeClass('seleccionado'); 
    });
    /*SUBIR FOTO*/
    $('div.fichaFotos span.botones .subirFoto').click(function(){
        $(this).css('display','none');
       $('.fichaFotos .seleccionarFoto').css('display','block');
    });
    /*CANCELAR FOTO*/
    $('div.fichaFotos .seleccionarFoto .cancelarFoto').click(function(){
        $('div.fichaFotos span.botones .subirFoto').css('display','block');
        $('.fichaFotos .seleccionarFoto').css('display','none');
    });

});

/**
* INSERTAR DATOS: Función para insertar los parametros
*
* @param void
* @return void
*/
function insertarBD(){

    if($('#insertarModal form .error').length == 0){
        $.ajax({
            url: "/gestion/animales/insertar",
            method: "PUT",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: $('#insertarModal form').serialize(),
            success: function(insertado){
                console.log(insertado);
                //                var msgError='';
                //                if(insertado.length == 1){
                //                    msgError+='Se ha insertado correctamente el animal'; 
                //                    buscarPorFiltro();
                //                    $('#informacionModal div.modal-content').addClass('correcto');
                //
                //                }else{
                //                    msgError+='No se ha insertado correctamente el animal'; 
                //                    $('#informacionModal div.modal-content').addClass('incorrecto');
                //                }
                //                $('#informacionModal h4.modal-title').text('Insertar Animal');
                //
                //                $('#informacionModal div.card-body').text(msgError);
            }

        });  

    }
    //    $("#informacionModal").modal("show");
    //    $("#insertarModal").modal("hide");

}  






/**
* VALIDAR DATOS: Función que valida los datos del formulario
*
* @param string modo
* @param string elemento
* @return void
*/
function validaInsertar(modo,elemento){

    if(modo == 'boton'){
        var inputs=$('#insertarModal form input');
        var selects=$('#insertarModal form select');
    }

    if(modo == 'input'){
        var inputs=elemento;
    }
    if(modo == 'select'){
        var selects=elemento;
    }

    var msg='';

    //    $('ul.msgError').empty();

    /*INPUTS Validación*/
    if(modo == 'input' || modo == 'boton'){
        for(var i=0;i<inputs.length;i++){

            /*CHIP*/
            if($(inputs[i]).attr('name') == 'chip'){
                if($(inputs[i]).val() == ''){
                    $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                    $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                }else{
                    if($(inputs[i]).val().match(/^[0-9]+$/) && 11 >= $(inputs[i]).val().length){
                        $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').removeClass('error');
                        $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                        $('ul.msgError li.'+$(inputs[i]).attr("name")).remove();
                    }else{
                        if( $('ul.msgError li.'+$(inputs[i]).attr("name")).length == 0){
                            $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                            $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                            msg+='<li class="chip">El campo '+$(inputs[i]).attr('name')+' no puede contener letras ni espacios y tiene que tener un maximo de 11 caracteres</li>';
                        }
                    }
                }
            }
            /*NOMBRE*/
            if($(inputs[i]).attr('name') == 'nombre' ){
                if($(inputs[i]).val() == ''){
                    $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                    $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                }else{
                    if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/) && 25 >= $(inputs[i]).val().length && $(inputs[i]).val() != ''){
                        $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').removeClass('error');
                        $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                        $('ul.msgError li.'+$(inputs[i]).attr("name")+'').remove();


                    }else{
                        if( $('ul.msgError li.'+$(inputs[i]).attr("name")).length == 0){

                            $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                            $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                            msg+='<li class="'+$(inputs[i]).attr('name')+'" >El campo '+$(inputs[i]).attr('name')+' no puede contener numeros y tiene que tener un maximo de 25 caracteres</li>';
                        }
                    }
                }
            }
            /*RAZA*/
            if($(inputs[i]).attr('name') == 'raza'){

                if($(inputs[i]).val() == ''){
                    $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                    $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                }else{
                    if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/) && 40 >= $(inputs[i]).val().length && $(inputs[i]).val() != ''){
                        $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').removeClass('error');
                        $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                        $('ul.msgError li.'+$(inputs[i]).attr("name")+'').remove();


                    }else{
                        if( $('ul.msgError li.'+$(inputs[i]).attr("name")).length == 0){
                            $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                            $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                            msg+='<li class="'+$(inputs[i]).attr('name')+'">El campo '+$(inputs[i]).attr('name')+' no puede contener numeros y tiene que tener un maximo de 40 caracteres</li>';
                        }
                    }
                }
            }
            /*FECHA*/
            if($(inputs[i]).attr('name') == 'fecha'){

                if($(inputs[i]).val() == ''){
                    $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                    $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                }else{
                    var hoy = new Date();
                    var fechaFormulario = new Date($(inputs[i]).val());

                    /*Comprueba que no se haya insertado una fecha futura*/
                    if (hoy > fechaFormulario){
                        $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').removeClass('error');
                        $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                        $('ul.msgError li.'+$(inputs[i]).attr("name")+'').remove();

                    }else{
                        if( $('ul.msgError li.'+$(inputs[i]).attr("name")).length == 0){
                            $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                            $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                            msg+='<li class="'+$(inputs[i]).attr('name')+'">El campo '+$(inputs[i]).attr('name')+' nacimiento no puede ser días futuros</li>';
                        }
                    }
                }
            }

            /*SEXO*/
            if($(inputs[i]).attr('name') == 'sexo'){

                if($('input:radio[name=sexo]:checked').val() != null){
                    $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').removeClass('error');
                    $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('');
                }else{
                    $('#insertarModal .form-group input[name='+$(inputs[i]).attr("name")+']').addClass('error');
                    $('.form-group .'+$(inputs[i]).attr("name")+'Error span').text('*');
                }
            }

            /*FOTO*/
            if($(inputs[i]).attr('name') == 'foto'){
                //                console.log($(inputs[i]).val());
            }

        }
    }

    /*SELECTS Validación*/
    if(modo == 'select' || modo == 'boton'){
        for(var i=0;i<selects.length;i++){

            if($(selects[i]).val() == 'todo'){
                $('#insertarModal .form-group select[name='+$(selects[i]).attr("name")+']').addClass('error');
                $('.form-group .'+$(selects[i]).attr("name")+'Error span').text('*');
            }else{
                $('#insertarModal .form-group select[name='+$(selects[i]).attr("name")+']').removeClass('error');
                $('.form-group .'+$(selects[i]).attr("name")+'Error span').text('');
            }
        }
    }

    /*TEXTAREA Validación*/
    if(modo == 'textarea' || modo == 'boton'){
        if($('#insertarModal .form-group textarea').val() == ''){
            $('#insertarModal .form-group textarea').addClass('error');
            $('.form-group .descripcionError span').text('*');
        }else{
            $('#insertarModal .form-group textarea').removeClass('error');
            $('.form-group .descripcionError span').text('');
        }
    }
    $('ul.msgError').append(msg);
}

/**
* ELIMINAR ANIMAL: Función que con una peticón ajax elimina el animal de BD
*
* @param int id
* @return void
*/
function eliminarAnimal(id){
    $.ajax({
        url: "/gestion/animales/eliminar/id/"+id,
        method: "GET", 
        success: function(eliminado){
            var msgError='';
            /*Comprobar si se ha eliminado correctamente y crear el mensaje de respuesta*/
            if(eliminado.length == 0){
                msgError+='Se ha eliminado correctamente el animal'; 
                buscarPorFiltro();
                $('#informacionModal div.modal-content').addClass('correcto');

                /*Eliminar la seleccion del animal eliminado*/
                $('div.fichaAnimal').css('display','none');
                $('tbody tr').toggleClass('seleccionado'); /*MODIFICADO*/
            }else{
                msgError+='No se ha eliminado correctamente el animal'; 
                $('#informacionModal div.modal-content').addClass('incorrecto');
            }
            $('#informacionModal h4.modal-title').text('Eliminar Animal');

            $('#informacionModal div.card-body').text(msgError);
        }
    });  
    $("#informacionModal").modal("show");
    $("#eliminarModal").modal("hide");
}

/**
* ELIMINAR FOTO: Función que con una peticón ajax elimina la foto con el id que se le haya pasado
*
* @param int id
* @return void
*/
function eliminarFoto(id){
    $.ajax({
        url: "/gestion/animales/eliminar/foto/"+id,
        method: "GET", 
        success: function(eliminado){
            console.log($('tr.seleccionado').attr('class').split(' ')[0].split('id')[1]);
            detallesAnimal($('tr.seleccionado').attr('class').split(' ')[0].split('id')[1]);


            var msgError='';
            /*Comprobar si se ha eliminado correctamente y crear el mensaje de respuesta*/
            if(eliminado.length == 0){
                msgError+='Se ha eliminado correctamente la foto'; 
                $('#informacionModal div.modal-content').addClass('correcto');

                /*Eliminar la seleccion del animal eliminado*/
                $('div.fichaAnimal').css('display','none');
                $('tbody tr').toggleClass('seleccionado'); /*MODIFICADO*/
            }else{
                msgError+='No se ha eliminado correctamente la foto'; 
                $('#informacionModal div.modal-content').addClass('incorrecto');
            }

            $('#informacionModal h4.modal-title').text('Eliminar Foto');
            $('#informacionModal div.card-body').text(msgError);
        }
    });  
    $("#informacionModal").modal("show");
    $("#eliminarModal").modal("hide");


}



/**
* DETALLES ANIMALES: Función que saca la información del animal que tenga el id pasado
*
* @param int id
* @return void
*/
function detallesAnimal(id){

    if($('div.fichaFotos div.d-flex img').hasClass('seleccionado') == true){
        $('span.botones button.eliminarFoto').css('visibility','visible');
        $('span.botones button.subirFoto').css('visibility','hidden');
    }else{
        $('span.botones button.eliminarFoto').css('visibility','hidden');
        $('span.botones button.subirFoto').css('visibility','visible');
    }
    $.ajax({
        url: "/gestion/animales/id/"+id,
        method: "GET", 
        success: function(animal){
            /*FICHA ANIMAL*/
            if(animal.length == 1){
                /*Visualizar la ficha de animal*/
                $('div.fichaAnimal').css('display','block');
                $('div.fichaAnimal .fichaDescripcion').empty();
                $('div.fichaAnimal .fichaDescripcion').append('<p><span>Chip</span>&nbsp&nbsp '+animal[0].chip+' </p><p><span>Nombre</span>&nbsp&nbsp '+animal[0].nombre+' </p><p><span>Edad</span>&nbsp&nbsp ('+animal[0].edad+') </p><p><span>Fecha de nacimiento</span>&nbsp&nbsp '+animal[0].fecha_nacimiento+' </p><p><span>Raza</span>&nbsp&nbsp '+animal[0].raza+'</p><p><span>Sexo</span>&nbsp&nbsp '+animal[0].sexo+' </p><p><span>Talla</span>&nbsp&nbsp'+animal[0].talla+' </p><p><span>Descripción</span> <br>'+animal[0].descripcion+' </p>');

                $('button.eliminar').removeAttr('id');
                $('button.eliminar').attr('id','id'+animal[0].id);
                $('div.fichaAnimal .fichaFotos div.galeria').empty();

                if(animal[0].img.length == 0){
                    $('div.fichaAnimal .fichaFotos div.galeria').append('<span>#No hay fotos de este animal</span>');
                }else{

                    for(var i=0;i<animal[0].img.length;i++){
                        var clase='';
                        if(animal[0].img[i].principal == 1){
                            $('div.fichaAnimal .fichaFotos div.galeria').append('<span><img id="foto'+animal[0].img[i].id+'" class="principal" src="/img/'+animal[0].img[i].ruta+''+animal[0].img[i].titulo+'.'+animal[0].img[i].formato+'" alt="'+animal[0].img[i].titulo+'"></span>');                    
                        }else{
                            $('div.fichaAnimal .fichaFotos div.galeria').append('<img id="foto'+animal[0].img[i].id+'"  src="/img/'+animal[0].img[i].ruta+''+animal[0].img[i].titulo+'.'+animal[0].img[i].formato+'" alt="'+animal[0].img[i].titulo+'">'); 
                        }
                    }
                }

            }


        }});
}

/**
* FILTRAR ANIMALES: Función que valida los datos de los inputs
*
* @param void
* @return void
*/

function buscarPorFiltro(){
    $('tbody').empty();
    if($('input').hasClass( "error" ) != true){

        $.ajax({
            url: "/gestion/animales/buscar",
            method: "GET",
            data: $("form#filtroAnimal").serialize(), 
            success: function(animales){

                if(animales.length == 0){

                }else{
                    for(var i in animales){
                        var fotos=animales[i].img.length;
                        $('tbody').append('<tr class="id'+animales[i].id+'"><th scope="row" class="chip">'+animales[i].chip+'</th><td class="nombre">'+animales[i].nombre+'</td><td class="nacimiento">'+animales[i].fecha_nacimiento+'</td><td class="raza">'+animales[i].raza+'</td><td class="talla">'+animales[i].talla+'</td><td class="estado"><span class="'+animales[i].estado+'">'+animales[i].estado+'</span></td><td class="situacion">'+animales[i].situacion+'</td> <td class="fotos">'+fotos+'</td><td class="eliminar"><img class="papelera" src="/img/web/icons/papelera.svg" alt="papelera" title="Eliminar" ></td></tr>');
                    }

                    /*Rellenar el select*/
                    if(animales[0].razas.length >= $('select[name="raza"] option').length){
                        for(var i in animales[0].razas){
                            $('#filtroAnimal select[name="raza"]').append('<option value="'+animales[0].razas[i].raza+'">'+animales[0].razas[i].raza+'</option>');

                        }
                    }

                }

            }
        });
    }

}


/**
* VALIDAR: Función que valida los datos de los inputs
*
* @param void
* @return void
*/
function validarFormulario(){

    /*Inputs*/
    chip=$('#filtroAnimal input[name="chip"]').val();
    nombre=$('#filtroAnimal input[name="nombre"]').val();

    /*Vaciar los mensajes de error*/
    $('input').removeClass('error');
    $('ul.error').empty();


    /*Valida que el chip no contega letras y no super los 11 caracteres*/
    if(chip != ""){

        letra=false;
        letras="abcdefghyjklmnñopqrstuvwxyz";
        chip = chip.toLowerCase();
        for(i=0; i<chip.length; i++){
            if (letras.indexOf(chip.charAt(i),0)!=-1){
                letra=true;
            }
        }


        if(chip.length >11 || letra == true){
            $('ul.error').append('<li class="chip">El chip introducido no es un campo valido</li><ul class="chip"><li>Solo numeros</li><li>11 digitos</li></ul>');
            $('input[name="chip"]').addClass('error');

        }
    }

    /*Valida que el nombre no contega numeros y no super los 20 caracteres*/
    if(nombre != ""){
        numero=false;

        numeros="123456789";
        nombre = nombre.toLowerCase();
        for(i=0; i<nombre.length; i++){
            if (numeros.indexOf(nombre.charAt(i),0)!=-1){
                numero=true;
            }
        }

        if(nombre.length >20 || numero == true){
            $('ul.error').append('<li class="nombre">El nombre introducido no es un campo valido</li><ul class="nombre"><li>Solo letras</li><li>20 caracteres</li></ul>');
            $('input[name="nombre"]').addClass('error');
        }
    }
}
