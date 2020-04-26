/*
|---------------
| BUSCAR ANIMALES CON FILTRO - GENERAL
|---------------
*/
$(function(){

    /*** INICIO ***/

    /* Control de Select al cargar la página*/
    rellenarSelect($( "#filtroAnimal .tipoAnimal" ).val());
    /*Navegador de Busqueda*/
    navBuscador($( "#filtroAnimal .tipoAnimal" ).val(),$("#filtroAnimal .tipoAnimal" ).val(),$('input:radio[name=sexo]:checked').val(),$("#filtroAnimal .tallaAnimal" ).val(),$("#filtroAnimal .edadAnimal" ).val(), $("#filtroAnimal .estadoAnimal" ).val());


    /*EVENTOS*/
    $("#filtroAnimal .tipoAnimal").blur(function(){
        rellenarSelect($( "#filtroAnimal .tipoAnimal" ).val());
    });
    /* Control de Select seleccionar otra opción*/
    $("#filtroAnimal select, #filtroAnimal input:radio[name=sexo]").blur(function(){
        navBuscador($( "#filtroAnimal .tipoAnimal" ).val(),$("#filtroAnimal .especieAnimal" ).val(),$('input:radio[name=sexo]:checked').val(),$("#filtroAnimal .tallaAnimal" ).val(),$("#filtroAnimal .edadAnimal" ).val(), $("#filtroAnimal .estadoAnimal" ).val());
    });

    /* Controlar el click de los botones del NavBuscador*/
    $('body').on('click', 'ul.navBusqueda img', function(){
        borrarNavBuscador($(this).attr('class'));
    });

});

/**
* BORRAR NAVBUSCADOR: Función para borrar la opcion seleccionada en el navBuscador
*
* @param  string  opcion
* @return void
*/
function borrarNavBuscador(opcion){

    var clase= opcion.split('borrar');
    $('span.'+clase[1]).parent().remove();

    if(clase[1] == 'sexo'){
        $('input:radio[name="sexo"]').filter('[value="Todos"]').prop( 'checked', true );
    }else{
        clase=clase[1]+'Animal';
        $('.'+clase).prop('selectedIndex',0);
        if(clase == 'especieAnimal'){
            rellenarSelect($("#filtroAnimal .tipoAnimal").val());
        }

    }


}


/**
* CREAR NAVBUSCADOR: Función para cambiar el navegador de busqueda a partir de lo seleccionado.
*
* @param  string  tipo
* @param  string  especie
* @return void
*/
function navBuscador(tipo, especie, sexo, talla, edad, estado){

    var arrayBuscador = new Array();

    arrayBuscador['tipo'] = $("#filtroAnimal .tipoAnimal option:selected").text();
    arrayBuscador['especie'] = $("#filtroAnimal .especieAnimal option:selected").text();
    arrayBuscador['sexo'] = $('input:radio[name=sexo]:checked').val();
    arrayBuscador['talla'] = $("#filtroAnimal .tallaAnimal option:selected").text();
    arrayBuscador['edad'] = $("#filtroAnimal .edadAnimal option:selected").text();
    arrayBuscador['estado'] = $("#filtroAnimal .estadoAnimal option:selected").text();    
    /*Vaciar el NavBuscador*/
    for(nombre in arrayBuscador){
        $(".contenidoFiltro ."+nombre+"").remove();

        if(arrayBuscador[nombre] != 'Todos'){
            $(".contenidoFiltro ul.navBusqueda").append('<li class="breadcrumb-item '+nombre+'"><span class="'+nombre+'">'+arrayBuscador[nombre]+' </span><img class="borrar'+nombre+'" src="/img/web/icons/cruz.svg"></li>');
        }
    }
}


/**
* RELLENAR SELECT TIPO: Función que rellena el select con la clase 'especieAnimal' con options según lo que tenga seleccionado el select con la clase 'tipoAnimal'.
*
* @param  string  tipo
* @return void
*/
function rellenarSelect(tipo){
    $("#filtroAnimal .especieAnimal").empty();
    switch(tipo){
        case '0':
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pájaros</option><option value='roedor'>Roedores</option><option value='equino'>Equinos</option><option value='venado'>Venados</option><option value='reptil'>Reptiles</option>"); break;
        case '1':  
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pájaros</option><option value='roedor'>Roedores</option>"); break;
        case '2':  
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='equino'>Equinos</option><option value='venado'>Venados</option>"); break;
        case '3':  
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='pajaro'>Pájaros</option><option value='roedor'>Roedores</option><option value='reptil'>Reptiles</option>"); break;
        default: 
            console.log('no entra .especieAnimal');
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pájaros</option><option value='roedor'>Roedores</option><option value='equino'>Equinos</option><option value='venado'>Venados</option><option value='reptil'>Reptiles</option>");
    }
}