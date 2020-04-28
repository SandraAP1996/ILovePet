@extends('layout.layout-master')

@section('titulo')
Inicio
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/pagina-principal.css">
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
                    <a href="{{url('/buscar')}}" class="btn btn-sm btn-outline-secondary">{{__('Click aquí')}}</a>
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
                    <a class="btn btn-sm btn-outline-secondary">{{__('Click aquí')}}</a>
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
                    <a class="btn btn-sm btn-secondary">{{__('Click aquí')}}</a>
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
                        <p>{{__('Lily likes to play with crayons and pencils')}}</p>
                    </div>
                    <a href="#" title="Detalles">{{__('Detalles')}}</a>
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
    <div class="row">
        <div class="col-sm-12 col-md-3 adopcionCategoria">
            <div class="descripcionCategoria">
                <span>{{__('Adopción')}}</span>
                <p>Cosas que se dicen en este a partado</p>
                <a href="{{url('/buscar')}}" title="todos" class="btn btn-sm btn-outline-secondary">{{__('Ver más')}}</a>
            </div>
        </div>
        <div class="col-sm-12 col-md-4 perrosCategoria">
            <div class="descripcionCategoria">
                <span>{{__('Perros')}}</span>
                <p>Cosas que se dicen en este a partado</p>
                <a href="{{url('/buscar')}}" title="perros" class="btn btn-sm btn-outline-secondary">{{__('Ver más')}}</a>

            </div>
        </div>
        <div class="col-sm-12 col-md-4 gatosCategoria"> 
            <div class="descripcionCategoria">
                <span>{{__('Gatos')}}</span>
                <p>Cosas que se dicen en este a partado</p>
                <a href="{{url('/buscar')}}" title="gatos" class="btn btn-sm btn-outline-secondary">{{__('Ver más')}}</a>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-4 pajarosCategoria" >
            <div class="descripcionCategoria">
                <span>{{__('Pájaros')}}</span>
                <p>Cosas que se dicen en este a partado</p>
                <a href="{{url('/buscar')}}" title="pajaros" class="btn btn-sm btn-outline-secondary">{{__('Ver más')}}</a>

            </div>
        </div>
        <div class="col-sm-12 col-md-7 ganadoCategoria" style="background-color:lavenderblush;">
            <div class="descripcionCategoria">
                <span>{{__('Ganado')}}</span>
                <p>Cosas que se dicen en este a partado</p>
                <a href="{{url('/buscar')}}" title="ganado" class="btn btn-sm btn-outline-secondary">{{__('Ver más')}}</a>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-6 roedoresCategoria" style="background-color:lavender;">
            <div class="descripcionCategoria">
                <span>{{__('Roedores')}}</span>
                <p>Cosas que se dicen en este a partado</p>
                <a href="{{url('/buscar')}}" title="roedores" class="btn btn-sm btn-outline-secondary">{{__('Ver más')}}</a>

            </div>
        </div>
        <div class="col-sm-12 col-md-5 exoticosCategoria" style="background-color:lavenderblush;">
            <div class="descripcionCategoria">
                <span>Exóticos</span>
                <p>Cosas que se dicen en este a partado</p>
                <a href="{{url('/buscar')}}" title="exoticos" class="btn btn-sm btn-outline-secondary">{{__('Ver más')}}</a>
            </div>
        </div>
    </div>
</div>

@endsection
