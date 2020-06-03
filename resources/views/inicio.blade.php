@extends('layout.layout-master')

@section('titulo')
Inicio
@endsection
@section('enlaces')

<link rel="stylesheet" type="text/css" href="/css/inicio.css">
<script type="text/javascript" src="/js/inicio.js"></script>       

<!-- Chart.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js" integrity="sha256-JG6hsuMjFnQ2spWq0UiaDRJBaarzhFbUxiUTxQDA9Lk=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js" integrity="sha256-XF29CBwU1MWLaGEnsELogU6Y6rcc5nCkhhx89nFMIDQ=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js" integrity="sha256-J2sc79NPV/osLcIpzL3K8uJyAD7T5gaEFKlLDM18oxY=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js" integrity="sha256-CfcERD4Ov4+lKbWbYqXD6aFM9M51gN4GUEtDhkWABMo=" crossorigin="anonymous"></script>    

@endsection

@section('contenido')
<!-- CAROUSEL -->
<div id="carouselInicio" class="carousel slide carousel-fade" data-ride="carousel" data-interval="6000">
    <ol class="carousel-indicators">
        <li data-target="#carouselInicio" data-slide-to="0" class="active"></li>
        <li data-target="#carouselInicio" data-slide-to="1"></li>
        <li data-target="#carouselInicio" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
        <!-- Foto 1 - ADOPCION -->
        <div class="carousel-item active">
            <picture>
                <img src="/img/web/pagina/carousel1.jpg" alt="responsive image" class="d-block img-fluid">
            </picture>

            <div class="carousel-caption cajaCarousel">
                <div>
                    <h3>{{__('Adopción')}}</h3>
                    <p>{{__('Desafortunadamente sigue siendo habitual que algunos propietarios que compran un cachorro de forma impulsiva decidan abandonarlo o dejarlo en una protectora de perros cuando se dan cuenta de que convivir con él implica un compromiso importante que puede superar los 10 años.')}}</p>
                    <a href="{{url('/buscar/todos/todos')}}" class="btn btn-sm btn-outline-secondary">{{__('Click aquí')}}</a>
                </div>
            </div>
        </div>
        <!-- Foto 2 - EVENTOS -->
        <div class="carousel-item">
            <picture>
                <img src="/img/web/pagina/carousel5.jpg" alt="responsive image" class="d-block img-fluid">
            </picture>

            <div class="carousel-caption justify-content-center align-items-center cajaCarousel">
                <div>
                    <h3>{{__('Eventos')}}</h3>
                    <p>{{__('El centro eventualmente hace eventos, se crean para poder facilitar la visibilidad de los animales del centro, o para facilitar la disponibilidad de donaciones para la ayuda de  estos pequeños.')}}</p>
                    <a href="{{url('/eventos')}}" class="btn btn-sm btn-outline-secondary">{{__('Click aquí')}}</a>
                </div>
            </div>
        </div>
        <!-- Foto 3 -AYUDALES -->
        <div class="carousel-item">
            <picture>
                <img src="/img/web/pagina/carousel4.jpg" alt="responsive image" class="d-block img-fluid">
            </picture>

            <div class="carousel-caption justify-content-center align-items-center cajaCarousel">
                <div>
                    <h3>{{__('Ayudales')}}</h3>
                    <p>{{__('En muchos casos hacerse responsable de un animal no es posible, pero si se tienen los medios existen otros metodos para ayudarles, el centro tiene muchas posibilidades de que esta gente pueda poner su granito de arena.')}}</p>
                    <a href="{{url('/informacion/ayudales')}}" class="btn btn-sm btn-secondary">{{__('Click aquí')}}</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Pasar las fotos -->
    <a class="carousel-control-prev" href="#carouselInicio" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">{{__('Anterior')}}</span>
    </a>
    <a class="carousel-control-next" href="#carouselInicio" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">{{__('Siguiente')}}</span>
    </a>
</div>

<!-- ADOPCION URGENTE -->

<div id="contenedorUrgentes" >
    <h1>{{__('Adopciones URGENTES')}} <img src="/img/web/icons/huella-pulso.svg" alt="img12"></h1>

    <div id="exposicionAnimal" class="row">

        @foreach($animales as $animal)
        <div id="tarjetaAnimal" class="col-md-3 grid">
            <figure class="effect-card">
                <img src="/img/{{$animal->ruta}}{{$animal->titulo}}.{{$animal->formato}}" alt="img12"/>
                <figcaption>
                    <div class="descripcion">
                        <h2>{{$animal->nivel}} <span>{{$animal->nombre}}</span></h2>
                        <p class="descripcionLimit">{{$animal->descripcion}}</p>
                    </div>
                    <a href="{{url('/animal/detalle/'.$animal->id)}}" title="Detalles">{{__('Detalles')}}</a>
                </figcaption>			
            </figure>
        </div>
        @endforeach
    </div>
</div>

<!-- CATEGORIAS -->
<div id="contenedorCategoria">
    <hr>
    <h1>{{__('Categorias')}} <img src="/img/web/icons/huellas-de-garras-dark.svg" alt="img12"></h1>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-md-3 adopcionCategoria mb-3">
                <div class="descripcionCategoria">
                    <span>{{__('Adopción')}}</span>
                    <br>
                    <br>
                    <a href="{{url('/buscar/todos/todos')}}" title="todos" class="btn btn-sm ">{{__('Ver más')}}</a>
                </div>
            </div>
            <div class="col-sm-12 col-md-4 perrosCategoria  mb-3">
                <div class="descripcionCategoria">
                    <span>{{__('Perros')}}</span>
                    <br>
                    <br>
                    <a href="{{url('/buscar/especie/perro')}}" title="perros" class="btn btn-sm ">{{__('Ver más')}}</a>

                </div>
            </div>
            <div class="col-sm-12 col-md-4 gatosCategoria  mb-3"> 
                <div class="descripcionCategoria">
                    <span>{{__('Gatos')}}</span>
                    <br>
                    <br>
                    <a href="{{url('/buscar/especie/gato')}}" title="gatos" class="btn btn-sm ">{{__('Ver más')}}</a>

                </div>
            </div>
            <div class="col-sm-12 col-md-4 pajarosCategoria mb-3" >
                <div class="descripcionCategoria">
                    <span>{{__('Pájaros')}}</span>
                    <br>
                    <br>
                    <a href="{{url('/buscar/especie/pajaro')}}" title="pajaros" class="btn btn-sm ">{{__('Ver más')}}</a>

                </div>
            </div>
            <div class="col-sm-12 col-md-7 ganadoCategoria mb-3" style="background-color:lavenderblush;">
                <div class="descripcionCategoria">
                    <span>{{__('Ganado')}}</span>
                    <br>
                    <br>
                    <a href="{{url('/buscar/tipo/granja')}}" title="ganado" class="btn btn-sm ">{{__('Ver más')}}</a>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 roedoresCategoria mb-3" style="background-color:lavender;">
                <div class="descripcionCategoria">
                    <span>{{__('Roedores')}}</span>
                    <br>
                    <br>
                    <a href="{{url('/buscar/especie/roedor')}}" title="roedores" class="btn btn-sm ">{{__('Ver más')}}</a>
                </div>
            </div>
            <div class="col-sm-12 col-md-5 exoticosCategoria  mb-3" style="background-color:lavenderblush;">

                <div class="descripcionCategoria">
                    <span>Exóticos</span>
                    <br>
                    <br>
                    <a href="{{url('/buscar/tipo/exotico')}}" title="exoticos" class="btn btn-sm">{{__('Ver más')}}</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- DONACIONES -->
<div class="container-fluid mb-5">
    <div id="contenedorDonaciones" class="pt-5">
        <hr>
        <h1>{{__('Donaciones')}} <img src="/img/web/icons/donation.svg" alt="img12"></h1>
        <div class="row">
            <div class="col-md-12">
                <p>Las donaciones son una manera sencilla de poner nuestro granito de arena a la ayuda de los animales que esta asociacion lleva a cabo. Todo el dinero recaudado en evento o donaciones de particulares, ira directo a alimentación, necesidades ya sea camas o salud y demás. Además de todo ello ayudara a mantener el centro, para seguir dadno apoyo a los animales que lo necesiten.</p>
            </div>
            <div class="col-md-6">
                <p>La siguiente gráfica es una muestra a las ultimas donaciones que se han realizado al centro, y gracias a ellos, muchos animales pueden tener una cama o comida decente.</p>
                <canvas id="horizontalBar"></canvas>

            </div>
            <div class="col-md-6 text-center">
                <p>En líneas generales, las donaciones para protectoras de animales son la principal fuente de sustento de estas entidades.</p>




                <img class="img-fluid p-1 " src="/img/web/pagina/infConocenos.gif">
                <p> La mayor parte de estas asociaciones no cuentan con ningún tipo de ayuda pública, por lo que su funcionamiento está supeditado a la ayuda privada. De ahí la importancia de tender una mano para que puedan seguir rescatando animales en desamparo.</p>

                <a href="#" class="botonDonar btn btn-lg btn-block">{{__('Haz una DONACIÓN')}}</a>

            </div>
        </div>
    </div>

</div>

<!-- EVENTOS -->
<div class="container-fluid my-5">
    <div id="contenedorEventos" class="pt-5">
        <hr>
        <h1>{{__('Próximos Eventos')}} <img src="/img/web/icons/evento.svg" alt="img12"></h1>

        <p>Las donaciones son una manera sencilla de poner nuestro granito de arena a la ayuda de los animales que esta asociacion lleva a cabo. Todo el dinero recaudado en evento o donaciones de particulares, ira directo a alimentación, necesidades ya sea camas o salud y demás. Además de todo ello ayudara a mantener el centro, para seguir dadno apoyo a los animales que lo necesiten. <a href="{{url('/eventos')}}" class=" m-1 btn btn-sm btn-outline-secondary">{{__('Saber más')}}</a></p>
        
        <div class="eventoCards mt-5" class="card-body">
            <div class="row">
                <!-- RELLENADO DESDE JQUERY -->
            </div>
        </div>
    </div>
</div>


<!-- MODAL COMPROBAR DONACIÓN -->

<div class="modal fade " id="confirmarModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Donación Anonima</h4>
            </div>
            <div class="modal-body">
                <div class="card-body">
                    Nos hemos dado cuenta que no estas registrado, quieres continuar sin registro para una donación anonima?
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default acepta">{{__('Aceptar')}}</button><button type="button" class="btn btn-default cancelar" >{{__('Cancelar')}}</button>
            </div>
        </div>

    </div>
</div>




@endsection
