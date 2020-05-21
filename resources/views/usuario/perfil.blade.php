@extends('layout.layout-master')

@section('titulo')
Perfil
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/usuarioPerfil.css">
<script src="/js/usuario-perfil.js"></script>

@endsection

@section('contenido')
<div class="perfilPersona">

    <div class="detalles">
        <div class="d-flex">
            <span class="mr-auto"><h3>Perfil</h3></span> 
            <span><img src="/img/web/icons/edit-perfil.svg" alt="modificar" class="editar" title="Modificar Perfil"></span>
        </div>
        <hr>
        <form class="formDetalles" action="#" method="post" enctype="multipart/form-data">
            @csrf
            <div class="row justify-content-center">
                <div class="col-md-2">
                    <div class="insertarImagen">
                        <label for="file-input">
                            <img src="/img/{{$persona[0]->img['ruta']}}{{$persona[0]->img['titulo']}}.{{$persona[0]->img['formato']}}" alt="foto" class="img-fluid">
                        </label>
                        <input id="file-input" type="file" name="foto" accept="image/png, image/jpeg">
                    </div>

                </div>
                <div class="col-md-8">
                    <div class="form-row">
                        <div class="col-md-6 form-group nombre">
                            <label for="nombre" class="font-weight-bold">Nombre <span class="error"></span></label>
                            <input type="text" name="nombre" class="form-control" value="{{$persona[0]->nombre}}" id="nombre" required disabled>
                            <small></small>
                        </div>     
                        <div class="col-md-6 form-group apellidos">
                            <label for="apellidos" class="font-weight-bold">Apellidos<span class="error"></span></label>
                            <input type="text" name="apellidos" class="form-control" value="{{$persona[0]->apellidos}}" required disabled> 
                            <small></small>
                        </div>
                        <div class="col-md-6 form-group email">
                            <label for="email" class="font-weight-bold">Email<span class="error"></span></label>
                            <input type="email" name="email" class="form-control" value="{{$persona[0]->email}}" required disabled> 
                            <small></small>
                        </div>
                        <div class="col-md-6 form-group telefono">
                            <label for="telefono" class="font-weight-bold">Teléfono<span class="error"></span></label>
                            <input type="text" name="telefono" class="form-control" value="{{$persona[0]->telefono}}" required disabled>
                            <small></small> 
                        </div>
                    </div>

                </div>
                <div class="col-md-12">
                    <hr>
                </div>
                <div class="col-md-10 form-row">

                    <div class="col-md-4 col-sm-12 form-group provincia">
                        <label for="provincia" class="font-weight-bold">Provincia<span class="error"></span></label>
                        <input type="text" name="provincia" class="form-control" value="{{{$direccion[0]->provincia ?? '' }}}" disabled>
                        <small></small> 
                    </div>     
                    <div class="col-md-4 col-sm-12 form-group localidad">
                        <label for="localidad" class="font-weight-bold">Localidad<span class="error"></span></label>
                        <input type="text" name="localidad" class="form-control" value="{{{$direccion[0]->localidad ?? ''}}}" disabled> 
                        <small></small>
                    </div>
                    <div class="col-md-1 col-sm-6 form-group postal">
                        <label for="postal" class="font-weight-bold">C. Postal<span class="error"></span></label>
                        <input type="text" name="postal" class="form-control" value="{{{$direccion[0]->cod_postal ?? ''}}}" disabled> 
                    </div>
                    <div class="col-md-2 col-sm-6 form-group calle">
                        <label for="calle" class="font-weight-bold">Dirección<span class="error"></span></label>
                        <input type="text" name="calle" class="form-control" value="{{{$direccion[0]->calle ?? ''}}}" disabled> 
                    </div>
                    <div class="col-md-1 col-sm-6 form-group numero">
                        <label for="numero" class="font-weight-bold">Número<span class="error"></span></label>
                        <input type="text" name="numero" class="form-control" value="{{{$direccion[0]->numero ?? ''}}}" disabled> 
                    </div> 

                </div>

                <div class="col-md-12">
                    <div class="d-flex">
                        <span class="mr-auto">
                            <ul class="error">

                            </ul>
                        </span> 
                        <span class="botonesModificar">
                            <button type="button" class="btn btn-sm guardar">{{__('Guardar')}}</button>
                            <button type="button" class="btn btn-sm cancelar">{{__('Cancelar')}}</button>
                        </span>
                    </div>
                </div>
            </div>
        </form>

    </div>



    @if(count($animal) >0 || count($donacion) >0)
    <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                @if(count($animal) >0)
                <li class="nav-item animalBoton">
                    <a class="nav-link active" >Animales</a>
                </li>
                @endif
                @if(count($donacion) >0)
                <li class="nav-item donacionBoton">
                    <a class="nav-link">Donaciones</a>
                </li>
                @endif
            </ul>
        </div>
        @if(count($animal) >0)
        <div class="animalCards" class="card-body">
            <div class="row">
                @foreach($animal as $valorAnimal)
                <div class="col-sm-6">
                    <div class="card">
                        <div class="form-row">
                            <div class="col-2">
                                <img src="/img/{{$valorAnimal->img[0]->ruta}}{{$valorAnimal->img[0]->titulo}}.{{$valorAnimal->img[0]->formato}}" alt="animal" class="img-fluid">
                            </div>
                            <div class="col-10">

                                <div class="d-flex">
                                    <span class="mr-auto"> <h3>{{$valorAnimal->nombre}}</h3></span> 
                                    <span class="situacion"><h5>{{$valorAnimal->situacion}}</h5></span>
                                </div>
                                <p>{{$valorAnimal->edad}}</p>
                                <p>{{$valorAnimal->descripcion}}</p>
                            </div>
                        </div>

                    </div>
                </div>
                @endforeach
            </div>
        </div>
        @endif

        @if(count($donacion) >0)
        <div class="donacionCards" class="card-body">
            @foreach($donacion as $valorDonacion)
            <h5 class="card-title">Donación</h5>
            <p class="card-text"><span>Cantidad </span> {{$valorDonacion->cantidad}}€</p>
            <p class="card-text"><span>Fecha de donación </span> {{$valorDonacion->created_at}}</p>
            @endforeach

        </div>
        @endif

    </div>
    @endif

</div>


<!-- MODAL INFORMATIVO -->


<div class="modal fade" id="informacionModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!--         MODAL contenido-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div class="card-body">

                </div>
            </div>
        </div>
    </div>
</div>



@endsection