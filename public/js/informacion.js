$(function(){

    $('.informacionAyudas .contenedor').hover(function(){
        $(this).find('img').toggleClass('sinGris');
    });


    /*CLICK*/
    $('.informacionAyudas .contenedor').click(function(){

        $('.informacionAyudas .contenedor').find('img').removeClass('mantenerGris');

        $(this).find('img').addClass('mantenerGris');

        if($(this).hasClass('adopcion') == true){
            $('.descripcionAyudas').html('<hr><div class="col-md-12 row"><h2>ADOPCIÓN</h2><p>Nos encargamos de acoger y proteger a los animales que recogemos abandonados por las calles. Intentando asegurarles una vida mejor que la que podrían vivir en la calle olvidados. Defendemos el “sacrificio cero”. La acción divulgativa promueve campañas en diferentes medios de comunicación con el claro objetivo de educar a la sociedad en el respeto hacia los animales y los derechos que tienen a disfrutar de una vida digna y saludable.</p><p>Una de las mejores maneras de ayudar al centro I LOVE PET es dandole una oportunidad a un amigo peludo ha tener una vida feliz y digna, donde se le de siempre todo el amor y cuidado, posible. Por ello es necesaria la visibilización, adoptar a uno de nuestros animales es la mejor ayuda para ellos.<br> <a href="http://localhost.ilovepet/buscar/todos/todos" class="my-4 btn btn-sm btn-outline-secondary">QUIERO DAR UNA OPORTUNIDAD</a></p></div>');

        }else if($(this).hasClass('donacion') == true){
            $('.descripcionAyudas').html('<hr><div class="col-md-12"><h2>DONACIÓN</h2><p>En muchos casos hacerse responsable de un animal no es posible, pero si se tienen los medios existen otros metodos para ayudarles, el centro tiene muchas posibilidades de que esta gente pueda poner su granito de arena.Las donaciones o recaudaciones son una de las maneras para poder ayudar a muchos de los animales que tenemos en el centro.</p><p>Las donaciones son muy importante para ellos, ya que necesitan muchas veces ayudas especiales, ya sea mantas, camas, comida especial para los que necesitan cuidados especiales, y demás.<br> <a href="http://localhost.ilovepet/#contenedorDonaciones" class="my-4 btn btn-sm btn-outline-secondary">VER DONACIONES</a></p></div>');
        }else if($(this).hasClass('voluntario') == true){

            $('.descripcionAyudas').html('<hr><div class="col-md-12"><h2>ACOGIDA/VOLUNTARIOS</h2><p>Si quieres disfrutar de tiempo con animales que necesitan el tiempo de otros, es una buena oportunidad esta para que pases tiempo con ellos. Si estas interesado en lo que se va ha comentado posteriormente, contacta con nosotros, encantados te atenderemos y te informaremos más.</p><p>Las personas de acogida se encarga de tener en su casa animales que necesitan de un lugar hogareño y no el centro, por ejemplo cachorros o animales con una situación especial.</p><p>Los voluntarios como su nombre indica están para cuando el centro necesita más manos, ya sea pasearlos, cuidarlos o ayudar en los eventos aportando manualidades o cosas que tienen por casa, que quieran ofrecer al centro para la recaudación.</p><h5>Contacto:</h5><p>Dirección: Calle Ernesto<br> Che Guevara, Valencia, 46920<br>Teléfonos: 982465377 - 695483721<br>Email: ilovepet@gmail.com</p></div>');

        }else if($(this).hasClass('eventos') == true){
            $('.descripcionAyudas').html('<hr><div class="col-md-12"><h2>EVENTOS</h2> <p>El centro eventualmente crea eventos donde da la posibilidad de recaudar dinero para ellos ya sea vendiendo objetos hechos por los voluntarios, visibilizar los animales, o directamente en el evento la genete opta por donar ahí mismo. En esos eventos pueden venir todo aquel que ame a los animales, ya sea para donar, adoptar, o simplemente disfrutar de todo lo que el centro tiene que ofrecer en ese evento, averigua y disfruta.<br> <a href="http://localhost.ilovepet/eventos" class="my-4 btn btn-sm btn-outline-secondary">SABER DE LOS EVENTOS</a></p></div>');
        }

    });
});