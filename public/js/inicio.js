$(function() {


    /*TARJETAS DE LOS ANIMALES*/
    function limitarTexto(cadena, maxCadena){
        limiteTexto = $(cadena).text();
        if (limiteTexto.length > maxCadena){
            limite = limiteTexto.substr(0, maxCadena)+" ...";
            $(cadena).text(limite);
        }
    }

    var cadena = $('p.descripcionLimit');
    for(var i=0 ; i<cadena.length ; i++){
        limitarTexto(cadena[i], 50);
    }

    /*EVENTOS*/

    $.ajax({
        url: "/inicio/eventos",
        method: "GET",
        success: function(eventos){
            console.log(eventos);
            $('div.eventoCards .row').empty();

            if(eventos.length >=1 ){
                for(var i in eventos){
                    if(eventos[i].caducidad == false){
                        $('div.eventoCards .row').append('<div class="col-sm-12 mb-5"><div class="card"><div class="form-row"><div class="col-2"><img src="/img/web/pagina/Captura1.jpg" alt="evento" class="img-fluid"></div><div class="col-10 p-2"><div class="d-flex"><span class="mr-auto"> <h3>'+eventos[i].nombre+'</h3></span><span class="fecha"><h5>Fecha '+eventos[i].fecha+'<br> Hora 12:00-18:00</h5></span></div><p>Aforo: '+eventos[i].aforo+'</p><p>Lugar: '+eventos[i].provincia+', '+eventos[i].localidad+'</p><p>Dirección: '+eventos[i].calle+','+eventos[i].numero+'</p><p>'+eventos[i].descripcion+'</p></div></div></div></div>');
                    }
                }
            }else{
                $('div.eventoCards .row').append('<div class="col-sm-6"><h1>En estos momentos no hay ningún evento próximo</h1></div><div class="col-sm-6"><img class="img-fluid" src="/img/web/pagina/mascota1.jpg"></div> ');
            }



        }
    });



    /*DONACIONES*/
    $.ajax({
        url: "/grafico/donaciones",
        method: "GET",
        success: function(donaciones){

            if(donaciones.length < 7){
                var vueltas=7-donaciones.length;
                for(i=0; i<vueltas;i++){
                    donaciones.push({cantidad:0,nombre:'',persona:'',evento:''});
                }
            }
            var maximo=0;

            for(var i in donaciones){
                if(donaciones[i].nombre == null && donaciones[i].evento == null && donaciones[i].cantidad > 0){
                    donaciones[i].nombre='Anonimo';
                }else if(donaciones[i].evento != null){
                    donaciones[i].nombre=donaciones[i].evento;
                }
                if(donaciones[i].cantidad > maximo){
                    maximo=donaciones[i].cantidad;
                }
                maximo=maximo+100;
            }

            /*GRAFICOS*/
            new Chart(document.getElementById("horizontalBar"), {
                "type": "horizontalBar",
                "data": {
                    "labels": [donaciones[0].nombre, donaciones[1].nombre, donaciones[2].nombre, donaciones[3].nombre, donaciones[4].nombre, donaciones[5].nombre, donaciones[6].nombre],
                    "datasets": [{
                        "label": "Últimas Donaciones €",
                        "data": [donaciones[0].cantidad, donaciones[1].cantidad, donaciones[2].cantidad, donaciones[3].cantidad ,donaciones[4].cantidad ,donaciones[5].cantidad, donaciones[6].cantidad],
                        "fill": false,
                        "backgroundColor": [
                            'rgba(0, 99, 132, 0.6)',
                            'rgba(30, 99, 132, 0.6)',
                            'rgba(60, 99, 132, 0.6)',
                            'rgba(90, 99, 132, 0.6)',
                            'rgba(120, 99, 132, 0.6)',
                            'rgba(150, 99, 132, 0.6)',
                            'rgba(180, 99, 132, 0.6)',
                            'rgba(210, 99, 132, 0.6)',
                            'rgba(240, 99, 132, 0.6)'
                        ],
                        "borderColor": [
                            'rgba(0, 99, 132, 1)',
                            'rgba(30, 99, 132, 1)',
                            'rgba(60, 99, 132, 1)',
                            'rgba(90, 99, 132, 1)',
                            'rgba(120, 99, 132, 1)',
                            'rgba(150, 99, 132, 1)',
                            'rgba(180, 99, 132, 1)',
                            'rgba(210, 99, 132, 1)',
                            'rgba(240, 99, 132, 1)'
                        ],
                        "borderWidth": 1
                    }]
                },
                "options": {
                    "scales": {
                        "xAxes": [{
                            "ticks": {
                                steps: 10,
                                stepValue: 5,
                                max: maximo,
                                "beginAtZero": true
                            }
                        }]
                    }
                }
            });


        }
    });

    /*DONACIÓN*/
    $('#contenedorDonaciones a.botonDonar').click(function(event){
        event.preventDefault();
        if($('#login').attr('title') == 'Login'){
            $('#confirmarModal').modal('show');
        }else{
            $(location).attr('href','http://localhost.ilovepet/donacion');
        }
    });

    /*CONFIRMAR DONACIÓN*/
    $('#confirmarModal button.acepta').click(function(event){
        event.preventDefault();
        $(location).attr('href','http://localhost.ilovepet/donacion');
    });

    $('#confirmarModal button.cancelar').click(function(event){
        event.preventDefault();
        $('#confirmarModal').modal('hide');
        $('#modalLogin').modal('show');

    });


});