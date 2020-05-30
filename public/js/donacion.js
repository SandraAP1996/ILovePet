
$(function(){

    $('.panel-pago .visa').hide();
    $('.panel-pago .paypal').hide();
    $('.panel-pago .mastercard').hide();
    $('.tipoDonacion').hide();


    if($('#login').attr('title') == 'Login'){
        $('div.modo-pago input.tipoDonacion').prop('checked', true);
        $('div.modo-pago .switch').addClass('switchOn');
        $('div.modo-pago .switch + small').text('# Se hará una donación ANONIMA.');

    }else{
        console.log('no entro');
        $('div.modo-pago .switch + small').text('# Se hará una donación PÚBLICA.');
    }
    /*CONTROL BOTON MODO DE PAGO*/
    $('.switch').click(function(){
        if($('#login').attr('title') == 'Login'){

            $('input.tipoDonacion').replaceWith('<input type="checkbox" name="anonimo" class="tipoDonacion" checked/>');
            $('.tipoDonacion').hide();

            $('div.modo-pago .switch').removeClass('switchOn');
            $('div.modo-pago .switch').addClass('switchOn');
            $('div.modo-pago .switch + small').text('# Se hará una donación ANONIMA.');
            $('#confirmarModal').modal('show');

        }else{
            $(this).toggleClass("switchOn");
            if($('div.modo-pago .switch').hasClass('switchOn') == true){
                $('div.modo-pago .switch + small').text('# Se hará una donación ANONIMA.');
            }else{
                $('div.modo-pago .switch + small').text('# Se hará una donación PÚBLICA.');

            }
        }
    });

    /*CONFIRMAR DONACIÓN*/
    $('#confirmarModal button.acepta').click(function(event){
        event.preventDefault();
        $('#confirmarModal').modal('hide');
        $('#modalLogin').modal('show');
    });

    /*CONTROL BOTONES DE TIPO DE PAGO*/
    $('.tipo-pago img').click(function(){
        $('form')[0].reset();
        $('small.error').remove();
        if($(this).hasClass('activo') == false){
            var img=$('.tipo-pago img');
            for(var i=0; i<img.length;i++){
                if($(img[i]).hasClass('activo') == true){
                    var ruta=$(img[i]).attr('src').split('-')[0];
                    ruta=ruta+'.svg';
                    $(img[i]).attr('src',ruta);
                }
            }
            var ruta=$(this).attr('src').split('.')[0];
            ruta+='-activo.svg';
            $(this).attr('src',ruta);
            $('.tipo-pago img').removeClass('activo');
            $(this).addClass('activo');

        }else{
            var ruta=$(this).attr('src').split('-')[0];
            ruta+='.svg';
            $('.tipo-pago img').removeClass('activo');
            $(this).attr('src',ruta);

        }
        var tipo=$('.tipo-pago img.activo').attr('id');

        $('.panel-pago .visa').hide('slow');
        $('.panel-pago .paypal').hide('slow');
        $('.panel-pago .mastercard').hide('slow');

        $('div.panel-pago').empty();
        
        if(tipo == 'visa' || tipo == 'mastercard' ){
            $('div.panel-pago').append('<div class="'+tipo+' card mx-5 p-4"><div class="row mb-3"><div class="col-md-12"><input type="text" class="form-control" name="numero" placeholder="Número de la Tarjeta" /></div></div><div class="row mb-3"><div class="col-md-3 col-sm-3 col-xs-3"><span class="help-block text-muted small-font"> Mes</span><input type="text" class="form-control" name="mes" placeholder="MM" /></div><div class="col-md-3 col-sm-3 col-xs-3"><span class="help-block text-muted small-font">  Año</span><input type="text" class="form-control" name="anyo" placeholder="YY" /></div><div class="col-md-3 col-sm-3 col-xs-3"><span class="help-block text-muted small-font">  CCV</span><input type="text" class="form-control" name="ccv" placeholder="CCV" /></div><div class="col-md-3 col-sm-3 col-xs-3"><img src="/img/web/icons/tarjeta.svg" class="img-rounded" /></div></div><div class="row mb-3"><div class="col-md-12 pad-adjust"><input type="text" class="form-control" name="titular" placeholder="Titular de la Tarjeta" /></div></div><div class="row "><div class="col-md-6 col-sm-6 col-xs-6 pad-adjust"><span class="btn btn-danger cancelar"> CANCELAR </span></div><div class="col-md-6 col-sm-6 col-xs-6 pad-adjust"><span  class="btn btn-warning btn-block pagar">PAGAR AHORA </span></div></div></div>');
        }
        
        if(tipo == 'paypal'){
            $('div.panel-pago').append('<div class="paypal card mx-5 p-4"><div class="row "><div class="col-md-6 col-sm-6 col-xs-6 pad-adjust"><span class="btn btn-danger cancelar"> CANCELAR </span></div><div class="col-md-6 col-sm-6 col-xs-6 pad-adjust"><span  class="btn btn-warning btn-block pagar">PAGAR AHORA </span></div></div></div>');
            $('.panel-pago .paypal').show();
            window.open('https://www.paypal.com/ec/signin');  
        }

        $('.panel-pago .'+tipo).show('slow');

    });

    /*CONTROL METODO DE PAGO*/

    /*VALIDAR TIPO PAGO*/
    $('.cantidad input').blur(function(){
        if(parseInt($(this).val())<=0){
            $('div.cantidad label small ').remove();
            $('div.cantidad label').append('<small class="error">Hace falta añadir una cantidad</small>');
            $('div.cantidad label span').text(' *');
        }else{
            $('div.cantidad label small ').remove();
            $('div.cantidad label span').text('');
        }
    });

    /*CONTROLAR EL PAGO*/
    $('.panel-pago').on('click','span.pagar',function(){
        console.log('entras o que?');
        validarFormulario();

        if($('form small.error').length == 0){
            var data = $('#formularioPago').serialize();
            data = new FormData($('#formularioPago')[0]);

            $.ajax({
                url: "/tramite/donacion",
                processData: false,
                contentType: false,
                type: "POST",
                data: data,
                success: function(donacion){
                    console.log(donacion);
                }
            });
        }
    });


    /*CANCELAR PAGO*/
    $('span.cancelar').click(function(event){
        event.preventDefault();
        $('#formularioPago')[0].reset();
    });


    function validarFormulario(){

        $('div.tipo-pago img.activo').attr('id');
        var padre=$('div.tipo-pago img.activo').attr('id');

        if(parseInt($('.cantidad input').val())<=0){
            $('div.cantidad label small ').remove();
            $('div.cantidad label').append('<small class="error">Hace falta añadir una cantidad</small>');
            $('div.cantidad label span').text(' *');
        }else{
            $('div.cantidad label small ').remove();
            $('div.cantidad label span').text('');
        }


        if(padre != 'paypal'){

            var regNumeroVisa=/^4[0-9]{3}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/;
            var regNumeroMaster=/^5[1-5][0-9]{2}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/;

            var msgVisa='# Introduce un numero correcto, ejemplo 4895-1234-5678-4567 o 4895123456784567';
            var msgMaster='# Introduce un numero correcto, ejemplo 5228-0049-0204-0003 o 5228004902040003';
            var regNumero;
            var msgNumero;
            if(padre == 'visa'){
                regNumero=regNumeroVisa;
                msgNumero=msgVisa;
            }else{
                regNumero=regNumeroMaster;
                msgNumero=msgMaster;

            }


            var titular=/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ]{3,25}\s()[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ]{3,25}$/;

            /*NUMERO DE LA TARJETA*/
            if($('.panel-pago div.'+padre+' input[name="numero"]').val().match(regNumero)){
                $('.panel-pago div.'+padre+' small.errorNumero').remove();
            }else{
                $('.panel-pago div.'+padre+' small.errorNumero').remove();
                $('.panel-pago div.'+padre+' input[name="numero"]').parent().append('<small class="errorNumero error">'+msgNumero+' </small>');
            }

            /*FECHA DE TARJETA*/
            var mes=$('.panel-pago div.'+padre+' input[name="mes"]').val();
            var anyo=$('.panel-pago div.'+padre+' input[name="anyo"]').val();
            if(mes >0 && mes <=12 && anyo>0 && anyo<=99){
                $('.panel-pago div.'+padre+' small.errorFecha').remove();
            }else{
                $('.panel-pago div.'+padre+' small.errorFecha').remove();
                $('.panel-pago div.'+padre+' input[name="mes"]').parent().parent().append('<small class="errorFecha error"> # Fecha incorrecta, o caducado</small>');
            }

            /*CCV*/
            if($('.panel-pago div.'+padre+' input[name="ccv"]').val().match(/^[0-9]{3}$/)){
                $('.panel-pago div.'+padre+' small.errorCCV').remove();
            }else{
                $('.panel-pago div.'+padre+' small.errorCCV').remove();
                $('.panel-pago div.'+padre+' input[name="ccv"]').parent().append('<small class="errorCCV error"> # Introduce un CCV correcto, ejemplo 225</small>');
            }

            /*TITULAR*/
            if($('.panel-pago div.'+padre+' input[name="titular"]').val().match(titular)){
                $('.panel-pago div.'+padre+' small.errorTitular').remove();
            }else{
                $('.panel-pago div.'+padre+' small.errorTitular').remove();
                $('.panel-pago div.'+padre+' input[name="titular"]').parent().append('<small class="errorTitular error"> # Introduce un titular correcto ejemplo, Rocio Rodriguez</small>');
            }
        }

    }


});