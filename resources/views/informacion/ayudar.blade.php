@extends('layout.layout-master')

@section('titulo')
Ayudales
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/informacion.css">
<script src="/js/informacion.js"></script>

@endsection

@section('contenido')


<div id="informacion">

    <h1>¿En que les puedo ayudar?</h1>

    <div class="container-fluid informacionAyudas ">
        <div class="row">
            <div class="col-md-12 row">
                <div class="col-md-12 col-lg-6 text-center">
                    <div class="contenedor adopcion" >
                        <img class="my-4" src="/img/web/pagina/infDonar.gif" alt="donar">
                        <div class="centrado"><h2 class="texto-borde">ADOPCIÓN</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-6  text-center">
                    <div  class="contenedor donacion">
                        <img class="my-4 " src="/img/web/pagina/infoDonacion.gif" alt="donar">
                        <div class="centrado"><h2 class="texto-borde">DONACIÓN</h2></div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-6  text-center">
                    <div class="contenedor voluntario">
                        <img class="my-4" src="/img/web/pagina/infConocenosGato.gif" alt="donar">
                        <div class="centrado"><h2 class="texto-borde">ACOGIDA/VOLUNTARIOS</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 col-lg-6  text-center">
                    <div class="contenedor eventos">
                        <img class="my-4" src="/img/web/pagina/infoEventos.gif" alt="donar">
                        <div class="centrado"><h2 class="texto-borde">EVENTOS</h2>
                        </div>
                    </div>

                </div>

            </div>
            <hr>


        </div>
        <div class="row ">
            <div class="col-sm descripcionAyudas">
                <!--RELLENADO EN JQUERY-->
            </div>

        </div>
    </div>

</div>
@endsection