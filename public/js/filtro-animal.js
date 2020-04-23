/*
|---------------
| BUSCAR ANIMALES CON FILTRO - GENERAL
|---------------
*/
$(function(){

    /* Control de Select al cargar la página*/
    rellenarSelect($( "#filtroAnimal .tipoAnimal" ).val());
    /* Control de Select seleccionar otra opción*/
    $("#filtroAnimal .tipoAnimal").blur(function(){ 
        rellenarSelect($( "#filtroAnimal .tipoAnimal" ).val());
    });
    $("#filtroAnimal .especieAnimal").blur(function(){ 
        navBuscador($( "#filtroAnimal .tipoAnimal" ).val(),$("#filtroAnimal .tipoAnimal" ).val());
    });

    /*Navegador de Busqueda*/
    navBuscador($( "#filtroAnimal .tipoAnimal" ).val(),$("#filtroAnimal .tipoAnimal" ).val());

    $('span#borrar').on('click',function(){
        console.log('opcion');
    });
});

/**
* Función para cambiar el navegador de busqueda a partir de lo seleccionado.
*
* @param  string  tipo
* @param  string  especie
* @return void
*/
function borrarNavBuscador(opcion){
    console.log(opcion);
}




/**
* Función para cambiar el navegador de busqueda a partir de lo seleccionado.
*
* @param  string  tipo
* @param  string  especie
* @return void
*/
function navBuscador(tipo, especie){
    /**/
    var tipo=$("#filtroAnimal .tipoAnimal option:selected").text();
    var especie=$("#filtroAnimal .especieAnimal option:selected").text();

    $(".contenidoFiltro .tipo,.contenidoFiltro .especie").empty();

    if(tipo=='Todos'){
        $(".contenidoFiltro .tipo").append('<span class="todos">'+tipo+' </span>');
    }else{
        $(".contenidoFiltro .tipo").append('<span class="'+tipo+'">'+tipo+' </span><img id="foto" src="/img/web/icons/cruz.svg">');

    }

    if(especie=='Todos'){
        $(".contenidoFiltro .especie").append('<span class="todos">'+especie+' </span>');
    }else{
        $(".contenidoFiltro .especie").append('<span class="'+especie+'">'+especie+' </span><span id="borrar"><img id="foto" src="/img/web/icons/cruz.svg"></span>');
    }
}


/**
* Función que rellena el select con la clase 'especieAnimal' con options según lo que tenga seleccionado el select con la clase 'tipoAnimal'.
*
* @param  string  tipo
* @return void
*/
function rellenarSelect(tipo){
    navBuscador($( "#filtroAnimal .tipoAnimal" ).val(),$("#filtroAnimal .tipoAnimal" ).val());
    $("#filtroAnimal .especieAnimal").empty();
    switch(tipo){
        case '0':
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pajaros</option><option value='roedor'>Roedores</option><option value='equino'>Equinos</option><option value='venado'>Venados</option><option value='reptil'>Reptiles</option>"); break;
        case '1':  
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pajaros</option><option value='roedor'>Roedores</option>"); break;
        case '2':  
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='equino'>Equinos</option><option value='venado'>Venados</option>"); break;
        case '3':  
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='pajaro'>Pajaros</option><option value='roedor'>Roedores</option><option value='reptil'>Reptiles</option>"); break;
        default: 
            console.log('no entra .especieAnimal');
            $("#filtroAnimal .especieAnimal").append("<option value='todo'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pajaros</option><option value='roedor'>Roedores</option><option value='equino'>Equinos</option><option value='venado'>Venados</option><option value='reptil'>Reptiles</option>");
    }
}