@extends('layout.layout-master')

@section('titulo')
Gestión Usuarios
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/gestionUsuarios.css">
<script src="/js/gestion-usuarios.js"></script>
@endsection

@section('contenido')

<div class="contenedor">
    <div id="filtro">
        <h3>Gestión Usuarios</h3>
        <div class="container-fluid">
            <form method="post" action="#" id="filtroPersona">
                <div class="row justify-content-center">
                    <div class="col-md-2">
                        <div class="form-group nif">
                            NIF <input name="nif" class="form-control" type="text">
                            <small></small>
                        </div> 
                        <div class="form-group nombre">
                            Nombre <input name="nombre" class="form-control" type="text">
                            <small></small>

                        </div>
                    </div>       
                    <div class="col-md-2">
                        <div class="form-group apellidos">
                            Apellidos <input name="apellidos" class="form-control" type="text">
                            <small></small>

                        </div> 
                        <div class="form-group telefono">
                            Teléfono <input name="telefono" class="form-control" type="text">
                            <small></small>

                        </div>
                    </div>          
                    <div class="col-md-2">
                        <div class="form-group email">
                            Email <input name="email" class="form-control" type="text">
                            <small></small>
                        </div> 
                        <div class="form-group">

                        </div> 
                    </div>
                    <div class="col-md-4">
                        <ul class="error">

                        </ul>
                    </div>
                    <div class="col-md-2 text-right">
                        <button type="button" class="btn btn-lg btn-block insertar">{{__('Insertar Usuario')}}</button><br><br><br><br>
                        <button type="button" class="btn btn-sm reiniciar">{{__('Reiniciar')}}</button>
                    </div>
                </div>
            </form>
        </div>

    </div>

    <div id="ficha">
        <div class="row justify-content-center">

            <div class="fichaPersona col-md-9 border">
                <form  method="post" action="#" >
                    @csrf
                    <div class="d-flex fichaTitulo">
                        <span class="mr-auto"><h3>Ficha de la Persona</h3></span> 
                        <span class="botones">
                            <img src="/img/web/icons/cruz-blanca.svg" alt="salida" title="Cancelar">
                        </span> 
                    </div>

                    <div class="row justify-content-center">
                        <div class="fichaDescripcion col-md-9">
                        </div>
                    </div>
                    <div class="fichaFotos col-md-12">
                        <hr>
                        <div class="d-flex">
                            <span class="mr-auto"></span> 
                            <span class="botones">
                                <div class="fichaBotones col-md-12">
                                    <button type="button" class="btn btn-sm eliminar">{{__('Eliminar Usuario')}}</button>
                                    <button type="button" class="btn btn-sm modificar">{{__('Modificar')}}</button>
                                    <button type="button" class="btn btn-sm guardar">{{__('Guardar')}}</button><br>
                                    <button type="button" class="btn btn-sm cancelarModificar">{{__('Cancelar')}}</button>
                                </div>
                            </span>   
                        </div>
                    </div>
                </form>
            </div>

        </div>


        <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item animalBoton">
                        <a class="nav-link active" >Animales</a>
                    </li>
                    <li class="nav-item donacionBoton">
                        <a class="nav-link">Donaciones</a>
                    </li>
                </ul>
            </div>
            
            <div class="animalCards" class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="form-row">
                                RELLENADO DESDE JQUERY 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="donacionCards" class="card-body">
                <!--RELLENADO DESDE JQUERY -->

            </div>
        </div>

    </div>
    <div id="resultado" class="table-responsive">
        <table class="table">
            <thead class="cabecera">
                <tr>
                    <th scope="col">NIF</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Fecha nacimiento</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Email</th>
                    <th scope="col">Acogidas</th>
                    <th scope="col">Adopciones</th>
                    <th scope="col">Donaciones</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>

@endsection