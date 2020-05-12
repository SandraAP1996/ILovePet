@extends('layout.layout-master')

@section('titulo')
Detalle
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/detalleAnimal.css">
<script src="/js/detalle.js"></script>

@endsection

@section('contenido')

<?php

function calcular_edad($fecha){
    $fecha_nac = new DateTime(date('Y/m/d',strtotime($fecha))); // Creo un objeto DateTime de la fecha ingresada
    $fecha_hoy =  new DateTime(date('Y/m/d',time())); // Creo un objeto DateTime de la fecha de hoy
    $edad = date_diff($fecha_hoy,$fecha_nac); // La funcion ayuda a calcular la diferencia, esto seria un objeto
    return $edad;
}

$edad = calcular_edad($animal[0]->fecha_nacimiento);
$anyo=$edad->format('%Y');
$mes=$edad->format('%m');
?>
<div id="detalleAnimal">

    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6 order-1 order-md-1 order-sm-1 ">
                <img id="imagenPrincipal" src="/img/{{$animal[0]->img[0]->ruta}}{{$animal[0]->img[0]->titulo}}.{{$animal[0]->img[0]->formato}}" alt="imgDetalle" title="Amplia">
            </div>
            <div id="descripcion" class="col-sm-12 col-md-6 order-3 order-sm-3 order-md-2  border">
                <h3>Nombre {{$animal[0]->nombre}}</h3>
                <p><span>Edad</span>&nbsp&nbsp  {{$animal[0]->edad}}  (
                    @if($anyo != 0 && $mes != 0)
                    {{$anyo}} años y {{$mes}} meses
                    @else
                    @if($anyo != 0)
                    {{$anyo}} años
                    @endif
                    @if($mes != 0)
                    {{$mes}} meses
                    @endif
                    @endif
                    ) </p>
                <p><span>Fecha de nacimiento</span>&nbsp&nbsp  {{$animal[0]->fecha_nacimiento}}</p>
                <p><span>Raza</span>&nbsp&nbsp {{$animal[0]->raza}}</p>
                <p><span>Sexo</span>&nbsp&nbsp {{$animal[0]->sexo}}</p>
                <p><span>Talla</span>&nbsp&nbsp {{$animal[0]->talla}}</p>
                <p><span>Descripción</span> <br> {{$animal[0]->descripcion}}</p>
            </div>
            <div class="imagenes carousel col-sm-12 col-md-6 order-2 order-2 order-sm-2 order-md-3  ">
                @for($i=0;count($animal[0]->img)>$i;$i++)
                @if($animal[0]->img[$i]->principal == 1)
                <img class="seleccionado img{{$i}}" src="/img/{{$animal[0]->img[$i]->ruta}}{{$animal[0]->img[$i]->titulo}}.{{$animal[0]->img[$i]->formato}}" alt="imgDetalle">
                @else
                <img class="img{{$i}}" src="/img/{{$animal[0]->img[$i]->ruta}}{{$animal[0]->img[$i]->titulo}}.{{$animal[0]->img[$i]->formato}}" alt="imgDetalle">
                @endif
                @endfor

            </div>
            <div class=" col-sm-12 col-md-6 order-4 order-sm-4 order-md-4">
                <button type="button" class="btn btn-lg btn-block">Adopta</button>
            </div>

        </div>
    </div>



</div>

@endsection