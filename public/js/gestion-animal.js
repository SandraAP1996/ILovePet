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
    
    
    $('body').on('click','tr',function(){
        $('tr').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        var id=$(this).attr('class');
        id=id.split('id');
        detallesAnimal(id[1]);
    });
});

function detallesAnimal(id){
    
    $.ajax({
            url: "/gestion/animales/id/"+id,
            method: "GET", 
            success: function(animal){
                
                console.log(animal);
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
                for(var i in animales){
                    var fotos=animales[i].img.length;
                    $('tbody').append('<tr class="id'+animales[i].id+'"><th scope="row" class="chip">'+animales[i].chip+'</th><td class="nombre">'+animales[i].nombre+'</td><td class="nacimiento">'+animales[i].fecha_nacimiento+'</td><td class="raza">'+animales[i].raza+'</td><td class="talla">'+animales[i].talla+'</td><td class="estado"><span class="'+animales[i].estado+'">'+animales[i].estado+'</span></td><td class="situacion">'+animales[i].situacion+'</td> <td class="fotos">'+fotos+'</td><td class="eliminar"><img src="/img/web/icons/papelera.svg" alt="papelera" title="Eliminar"></td></tr>');
                }

                /*Rellenar el select*/
                if(animales[0].razas.length >= $('select[name="raza"] option').length){
                    for(var i in animales[0].razas){
                        $('#filtroAnimal select[name="raza"]').append('<option value="'+animales[0].razas[i].raza+'">'+animales[0].razas[i].raza+'</option>');

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
