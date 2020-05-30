$(function() {

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