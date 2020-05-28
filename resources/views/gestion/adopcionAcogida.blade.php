@extends('layout.layout-master')

@section('titulo')
Gestión Adopcion/Acogida
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/gestionAdopcion.css">
<script src="/js/gestion-adopcion.js"></script>
@endsection

@section('contenido')


<div class="container-fluid m-0" id="ficha">
    <div class="row justify-content-center m-0 pt-5">

        <div class="fichaPersona col-md-6 border p-0">

            <div class="d-flex fichaTitulo">
                <span class="mr-auto"><h3>Ficha de la Persona</h3></span> 
                <span class="botones">
                    <img src="/img/web/icons/cruz-blanca.svg" alt="salida" title="Cancelar">
                </span> 
            </div>

            <div class="row justify-content-center">
                <div class="fichaDescripcion col-md-11">
                    <!--Rellenado desde JQUERY-->
                </div>
            </div>

            <div class="animalCards" class="card-body">
                <div class="row ">
                    <div class="col-md-12 p-4">
                        <div class="form-row justify-content-around">
                            <!--Rellenado desde JQUERY-->
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="fichaAnimal col-md-4 mt-5">
            <div class="form-row">
                <!--Rellenado desde JQUERY-->
            </div>
        </div>
    </div>
</div>


<div class="container-fluid mt-5">
    <div class="row tablas">

        <div class="col-md-6"><h2>Filtro Personas</h2>
            <p>Se buscar cualquier campo que se introduzca:</p>  
            <input class="form-control" id="inputPersona" type="text" placeholder="Buscar persona...">
            <br>
            <table class="table">
                <thead class="cabecera">
                    <tr>
                        <th>NIF</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Adoptados</th>
                        <th>Acogida</th>
                    </tr>
                </thead>
                <tbody class="filtroPersona">
                    @foreach($personas as $persona)
                    <tr id="persona{{$persona->id}}" class="persona">
                        <td>{{$persona->nif}}</td>
                        <td>{{$persona->nombre}}</td>
                        <td>{{$persona->apellidos}}</td>
                        <td>{{$persona->telefono}}</td>
                        <td>{{$persona->email}}</td>
                        <td>{{$persona->animal['adoptado']}}</td>
                        <td>{{$persona->animal['acogida']}}</td>
                    </tr>
                    @endforeach


                </tbody>
            </table>

            <p>Note that we start the search in tbody, to prevent filtering the table headers.</p>
        </div>

        <div class="col-md-6"> 
            <h2>Filtro Animales</h2>
            <p>Se buscar cualquier campo que se introduzca:</p>  
            <input class="form-control" id="inputAnimal" type="text" placeholder="Buscar animal...">
            <br>
            <div id="resultado" class="table-responsive">

                <table class="table">
                    <thead class="cabecera">
                        <tr>
                            <th>CHIP</th>
                            <th>Nombre</th>
                            <th>Situación</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody class="filtroAnimal">
                        @foreach($animales as $animal)
                        <tr id="animal{{$animal->id}}" class="animal">
                            <td>{{$animal->chip}}</td>
                            <td>{{$animal->nombre}}</td>
                            <td>{{$animal->situacion}}</td>
                            <td>{{$animal->estado}}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <p>Note that we start the search in tbody, to prevent filtering the table headers.</p>
        </div>
    </div>
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


<!-- MODAL ELIMINAR USUARIOS -->

<div class="modal fade" id="eliminarModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Eliminar Persona</h4>
            </div>
            <div class="modal-body">
                <div class="card-body">
                    ¿Estas seguro de que quieres eliminar? No se podrá recuperar los datos eliminados.
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default acepta">{{__('Aceptar')}}</button><button type="button" class="btn btn-default" data-dismiss="modal">{{__('Cancelar')}}</button>
            </div>
        </div>

    </div>
</div>

@endsection