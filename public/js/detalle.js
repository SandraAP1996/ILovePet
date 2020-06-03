/*
|---------------
| DETALLES ANIMAL - detalle.blade.php
|---------------
*/
$(function(){   

    $('body').on('click','.imagenAmpliada', function(){
        console.log('entraa');
       $('.ampliado').remove(); 
    });
    $('button.adoptar').click(function(){
        console.log('holaa');
       $('#adopcionModal').modal('show'); 
    });
    $('div.imagenes img').click(function(){
        $('div.imagenes img').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        seleccionado =$(this).attr('src');
        $('#imagenPrincipal').attr('src',seleccionado);
    });
});