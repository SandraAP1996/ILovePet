$(function(){

//    $('.abrirLogin').click(function(event){
//        evento.preventDefault();
//       $('#modalLogin').modal('show'); 
//    });
    
    $('#formRegistro input').blur(function(){
        validarRegistro($(this));
    });

    $('#formRegistro #inferiorRegistro .registrarse').click(function(event){
        event.preventDefault();
        validarRegistro($('#formRegistro input'));
        
        if($('#formRegistro').find('span.error').length == 0){
            $( "#formRegistro" ).submit();
        }
    });


});

function validarRegistro(inputs){

    for(var i=0;i<inputs.length;i++){

        /*NIF*/
        if($(inputs[i]).attr('name') == 'nif'){
            if($(inputs[i]).val().match(/^\d{8}[a-zA-Z]{1}$/)){
                $($(inputs[i])).removeClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();        
                $('input[name="nif"]').parent().append('<span class="'+$(inputs[i]).attr('name')+' error"># Solo se permite NIF validos</span>');
            }
        }

        /*NOMBRE*/
        if($(inputs[i]).attr('name') == 'name'){
            if($(inputs[i]).val().match(/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]{3,25}$/)){
                $($(inputs[i])).removeClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();        
                $('input[name="name"]').parent().append('<span class="'+$(inputs[i]).attr('name')+' error"># Solo permite letras y un mínimo de 3 caracteres y un máximo de 25.</span>');
            }
        }

        /*FECHA NACIMIENTO*/
        if($(inputs[i]).attr('name') == 'fecha_nacimiento'){

            fecha = $(inputs[i]).val();
            var hoy = new Date();
            var cumpleanos = new Date(fecha);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }
            if(edad >= 18){
                $($(inputs[i])).removeClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();        
                $('input[name="fecha_nacimiento"]').parent().append('<span class="'+$(inputs[i]).attr('name')+' error"># Debe ser mayor de edad.</span>');
            }
        }

        /*EMAIL*/
        if($(inputs[i]).attr('name') == 'email'){
            if($(inputs[i]).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)){
                var email=$(inputs[i]).val();
                $.ajax({
                    url: "/usuario/email/"+email,
                    method: "GET", 
                    success: function(verificado){
                        if(verificado.length == 0){
                            $($(inputs[i])).removeClass('is-invalid');
                            $('span.'+$(inputs[i]).attr('name')).remove();
                        }else{
                            $(inputs[i]).addClass('is-invalid');
                            $('span.'+$(inputs[i]).attr('name')).remove();        
                            $('input[name="email"]').parent().append('<span class="'+$(inputs[i]).attr('name')+' error"># Ya existe ese email.</span>');
                        }
                    }
                });
                /*PETICIN AJAX*/
            }else{
                $(inputs[i]).addClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();        
                $('input[name="email"]').parent().append('<span class="'+$(inputs[i]).attr('name')+' error"># Debe tener la sintaxis de correo x@x.x solo una longitud máxima 255.</span>');
            }
        }
      
        /*CONTRASEÑA*/
        if($(inputs[i]).attr('name') == 'password'){
            contra=$(inputs[i]).val();
            if($(inputs[i]).val().match(/^([a-zA-Z0-9]{8,35})/)){
                $($(inputs[i])).removeClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();        
                $('input[name="password"]').parent().append('<span class="'+$(inputs[i]).attr('name')+' error"># La contaseña puede estar compuesta por números y letras en un tamaño minimo de 8 y máximo de 35.</span>');
            }
        }
        /*CONFIRMAR CONTRASEÑA*/
        if($(inputs[i]).attr('name') == 'password_confirmation'){
            
            if($(inputs[i]).val() == $('#formRegistro #password').val()){
                $($(inputs[i])).removeClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();
            }else{
                $(inputs[i]).addClass('is-invalid');
                $('span.'+$(inputs[i]).attr('name')).remove();        
                $('input[name="password_confirmation"]').parent().append('<span class="'+$(inputs[i]).attr('name')+' error"># Debe ser igual que la contraseña.</span>');
            }
        }

    }

}