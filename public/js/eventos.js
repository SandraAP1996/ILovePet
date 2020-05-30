$(function() {

    /*EVENTOS*/
    $.ajax({
        url: "/inicio/eventos",
        method: "GET",
        success: function(eventos){
            console.log(eventos);
            $('div.eventoCards .row').empty();

            if(eventos.length >=1 ){
                for(var i in eventos){
                    /*AFORO*/
                    var aforo;
                    if(eventos[i].aforo == null){
                        aforo='No hay aforo';
                    }else{
                        aforo=eventos[i].aforo;
                    }

                    /*DONACIÓN*/
                    var donacion;
                    if(eventos[i].donacion.length == 1){
                        donacion='&nbsp&nbsp <small>Recaudado '+eventos[i].donacion[0].cantidad+'€</small>';
                    }else{
                        donacion='';
                    }

                    /*RUTA PARA AÑADIR*/
                    var ruta;
                    if(eventos[i].caducidad == false){
                        ruta='.proximos';
                    }else{
                        ruta='.pasados';

                    }

                    $(ruta+' div.eventoCards .row').append('<div class="col-sm-12 mb-5"><div class="card"><div class="form-row"><div class="col-2"><img src="/img/'+eventos[i].foto[0].ruta+''+eventos[i].foto[0].titulo+'.'+eventos[i].foto[0].formato+'" alt="evento" class="img-fluid"></div><div class="col-10 p-2"><div class="d-flex"><span class="mr-auto"> <h3>'+eventos[i].nombre+''+donacion+'</h3></span><span class="fecha"><h5><small>Fecha</small> '+eventos[i].fecha+'<br> <small>Hora</small> 12:00-18:00</h5></span></div><p>Aforo: '+aforo+'</p><p>Lugar: '+eventos[i].provincia+', '+eventos[i].localidad+'</p><p>Dirección: '+eventos[i].calle+','+eventos[i].numero+'</p><p>'+eventos[i].descripcion+'</p></div></div></div></div>');

                }
            }else{
                $('div.eventoCards .row').append('<div class="col-sm-6"><h1>En estos momentos no hay ningún evento próximo</h1></div><div class="col-sm-6"><img class="img-fluid" src="/img/web/pagina/mascota1.jpg"></div> ');
            }



        }
    });

});