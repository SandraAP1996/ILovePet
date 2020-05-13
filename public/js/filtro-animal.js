/*
|---------------
| BUSCAR ANIMALES CON FILTRO - GENERAL
|---------------
*/
$(function(){    

    /* Control de Select al cargar la página*/
    rellenarSelect($( "#filtroAnimal .tipoAnimal" ).val());

    /*Cargar el filtrado*/
    cambiarFormulario($('#inicioCampo').text(),$('#inicioFiltro').text());

    /*Navegador de Busqueda*/
    navBuscador($( "#filtroAnimal .tipoAnimal" ).val(),$("#filtroAnimal .tipoAnimal" ).val(),$('input:radio[name=sexo]:checked').val(),$("#filtroAnimal .tallaAnimal" ).val(),$("#filtroAnimal .edadAnimal" ).val(), $("#filtroAnimal .estadoAnimal" ).val());

    /*Buscar por Filtrado*/
    buscarPorFiltro(1);

    /*EVENTOS*/

    $("#filtroAnimal .tipoAnimal").change(function(){
        rellenarSelect($( "#filtroAnimal .tipoAnimal" ).val());
        buscarPorFiltro(1);
    });
    /* Control de Select seleccionar otra opción*/
    $("#filtroAnimal select, #filtroAnimal input:radio[name=sexo]").change(function(){
        navBuscador($( "#filtroAnimal .tipoAnimal" ).val(),$("#filtroAnimal .especieAnimal" ).val(),$('input:radio[name=sexo]:checked').val(),$("#filtroAnimal .tallaAnimal" ).val(),$("#filtroAnimal .edadAnimal" ).val(), $("#filtroAnimal .estadoAnimal" ).val());
        buscarPorFiltro(1);
    });

    /* Controlar el click de los botones del NavBuscador*/
    $('body').on('click', 'ul.navBusqueda img', function(){
        borrarNavBuscador($(this).attr('class'));
        buscarPorFiltro(1);
    });
    /*Reiniciar el Formulario*/
    $('button').click(function(){
        $('ul.navBusqueda').empty();
        $('ul.navBusqueda').append('<li class="breadcrumb-item active"><span>Adopción</span></li>');
        $('#filtroAnimal')[0].reset();
        buscarPorFiltro(1);
    });

    /*PAGINACIÓN*/
    $('ul.pagination').on('click','li.page-item', function(){

        console.log($(this).hasClass('anterior'));
        if($(this).hasClass('anterior') || $(this).hasClass('siguiente')){
            console.log($('li.seleccionado').attr('id'));
        }else{
            $(this).addClass('seleccionado');
        }

    });

});

/**
* FILTAR: Función que hace una petición Ajax a partir de lo que hemos filtrado
*
* @param  string  opcion
* @return void
*/
function buscarPorFiltro(pagina){
    $.ajax({
        url: "/animal/buscar/",
        method: "GET",
        data: $("form#filtroAnimal").serialize(), 
        success: function(animales){

            /*Vaciar y visualiazr elementos*/
            $('div#exposicionAnimal').empty();
            $('div#paginacionBusqueda').show();
            $('div#exposicionAnimal').removeClass('justify-content-center');
            $('.row div').css({ "padding-bottom": '10px'});


            if(animales.length != 0){
                for(var i in animales){
                    enlace="<a href='/animal/detalle/"+animales[i].id+"'' title='"+animales[i].id+"'>Detalles</a>";

                    $('div#exposicionAnimal').append('<div class="col-12 col-md-6 col-lg-3 grid tarjetaAnimal"><figure class="effect-card"><img src="/img/'+animales[i].ruta+''+animales[i].titulo+'.'+animales[i].formato+'" alt="'+animales[i].nombre+'"/><figcaption><div class="descripcion"><h2>'+animales[i].estado+' <span>'+animales[i].nombre+'</span></h2></div>'+enlace+' </figcaption></figure></div>');
                }
            }else{
                $('div#paginacionBusqueda').hide();
                $('div#exposicionAnimal').addClass('justify-content-center');
                $('div#exposicionAnimal').append('<div id="imagenError" class="row"><img src="/img/web/pagina/404.png"></div>');
                $('.row div').css({ "padding-bottom": '0px'});
            }


            $('ul.pagination').empty();

            $('ul.pagination').append('<li class="page-item anterior"><a class="page-link" >Anterior</a></li>');

            /*PAGINACIÓN*/
            if(animales.length <= 12){
                $('ul.pagination li.anterior').after('<li id="pagina1" class="page-item seleccionado"><a class="page-link ">1</a></li>');

            }else{
                cantidad = Math.round(animales.length/12);
                for( i=1; i<=cantidad;i++){
                    $('ul.pagination').append('<li id="pagina'+i+'" class="page-item "><a class="page-link " >'+i+'</a></li>');
                }
            }
            $('ul.pagination').append('<li class="page-item siguiente"><a class="page-link" >Siguiente</a></li>');
        }
    });
}


function cambiarFormulario(campo, filtro){
    if(campo == 'especie'){
        $('.especieAnimal').val(filtro).prop('selected', true);
    }else if(campo == 'tipo'){
        $('.tipoAnimal').val(filtro).prop('selected', true);
    }

}

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
        case 'Todos':
            $("#filtroAnimal .especieAnimal").append("<option value='Todos'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pájaros</option><option value='roedor'>Roedores</option><option value='equino'>Equinos</option><option value='ganado'>Ganado</option><option value='reptil'>Reptiles</option>"); break;
        case 'domestico':  
            $("#filtroAnimal .especieAnimal").append("<option value='Todos'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pájaros</option><option value='roedor'>Roedores</option>"); break;
        case 'granja':  
            $("#filtroAnimal .especieAnimal").append("<option value='Todos'>Todos</option><option value='equino'>Equinos</option><option value='ganado'>Ganado</option>"); break;
        case 'exotico':  
            $("#filtroAnimal .especieAnimal").append("<option value='Todos'>Todos</option><option value='pajaro'>Pájaros</option><option value='roedor'>Roedores</option><option value='reptil'>Reptiles</option>"); break;
        default: 
            console.log('no entra .especieAnimal');
            $("#filtroAnimal .especieAnimal").append("<option value='Todos'>Todos</option><option value='perro'>Perros</option><option value='gato'>Gatos</option><option value='pajaro'>Pájaros</option><option value='roedor'>Roedores</option><option value='equino'>Equinos</option><option value='ganado'>Ganado</option><option value='reptil'>Reptiles</option>");
    }
}