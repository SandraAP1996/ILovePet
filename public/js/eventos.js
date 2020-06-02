$(function() {

    /*EVENTOS*/
    $.ajax({
        url: "/inicio/eventos",
        method: "GET",
        success: function(eventos){
            $('div.eventoCards .row').empty();

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

                    /*HORAS*/
                    var inicio;
                    var fin;
                    
                    inicio=eventos[i].hora_inicio.split(':');
                    inicio=inicio[0]+':'+inicio[1];
                    
                    fin=eventos[i].hora_fin.split(':');
                    fin=fin[0]+':'+fin[1];
                    
                    $(ruta+' div.eventoCards .row').append('<div class="col-sm-12 mb-5"><div class="card"><div class="form-row"><div class="col-2"><img src="/img/'+eventos[i].foto[0].ruta+''+eventos[i].foto[0].titulo+'.'+eventos[i].foto[0].formato+'" alt="evento" class="img-fluid"></div><div class="col-10 p-2"><div class="d-flex"><span class="mr-auto"> <h3>'+eventos[i].nombre+''+donacion+'</h3></span><span class="fecha"><h5><small>Fecha</small> '+eventos[i].fecha+'<br> <small>Hora</small> '+inicio+'-'+fin+'</h5></span></div><p>Aforo: '+aforo+'</p><p>Lugar: '+eventos[i].provincia+', '+eventos[i].localidad+'</p><p>Dirección: '+eventos[i].calle+','+eventos[i].numero+'</p><p>'+eventos[i].descripcion+'</p></div></div></div></div>');
                }
            if($(".proximos div.eventoCards .row").children().length < 1){
                $('.proximos div.eventoCards .row').append('<div class="col-sm-6 align-self-center"><h1>En estos momentos no hay ningún evento próximo</h1></div><div class="col-sm-6 align-self-center"><img class="img-fluid" src="/img/web/pagina/eventos-proximos.jpg"></div> ');
            }
            if($(".pasados div.eventoCards .row").children().length < 1){
                $('.pasados div.eventoCards .row').append('<div class="col-sm-6 align-self-center"><img class="img-fluid" src="/img/web/pagina/eventos-pasados.jpg"></div><div class="col-sm-6 align-self-center"><h1>En estos momentos no hay eventos</h1></div> ');
            }
        }
    });

});