@extends('layout.layout-master')

@section('titulo')
Información de Donaciones
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/informacion.css">
@endsection

@section('contenido')


<div id="informacion">

    <h1>¿Qué son las donaciones?</h1>

    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h2>Donaciones</h2>
                <hr>
                <p>Actos de generosidad y compromiso como el que estás a punto de realizar, permiten que en
                    I LOVE PET podamos seguir desarrollando nuestra labor, por lo cual te estamos muy agradecidos. De esta forma, tu aportación económica se convierte en acción directa para la protección de animales en situación de peligro.</p>                

                <h2>Tipos de donaciones</h2>
                <hr>
                <p>El centro deispone de un apartado de donaciones en el que puedes crearlo anonimamente o públicamente.<br><a class="my-4 btn btn-sm btn-secondary" href="http://localhost.ilovepet/#contenedorDonaciones">{{__('Donaciones') }}</a></p>   

                <p>O si se prefiere tenemos eventos puntuales en el cual se tiene la posibilidad en las recaudaciones de aportar al centro un poco de ayuda.<br><a class="my-4 btn btn-sm btn-secondary" href="{{url('/eventos')}}">{{__('Eventos') }}</a></p>   

            </div>
            <div class="col-md-6">

                <img class="my-4" src="/img/web/pagina/infDonar.gif" alt="donar">

            </div>

        </div>
        <div class="row">

            <div class="col-sm">


            </div>

        </div>
    </div>

</div>
@endsection