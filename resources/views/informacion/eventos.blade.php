@extends('layout.layout-master')

@section('titulo')
Eventos
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/eventos.css">
<script type="text/javascript" src="/js/eventos.js"></script> 

@endsection
@section('contenido')

<!-- EVENTOS -->
<div class="container-fluid mt-5 bodyEventos mb-5">
    <div id="contenedorEventos" class=" px-5">
        <h1>{{__('Próximos Eventos')}} <img src="/img/web/icons/evento.svg" alt="img12"></h1>
        <div class="proximos pb-5">
            <div class="eventoCards mt-5" class="card-body">
                <div class="row">
                    <!--RELLENA CON JQUERY-->
                </div>
            </div>
        </div>
        <hr>
        <div class="pasados pt-5">
            <h1>{{__('Eventos Pasados')}} <img src="/img/web/icons/evento-pasado.svg" alt="img12"></h1>
            <div class="eventoCards mt-5" class="card-body">
                <div class="row">
                    <!--RELLENA CON JQUERY-->
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
