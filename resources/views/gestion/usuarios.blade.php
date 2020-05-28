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

            <div class="fichaPersona col-md-5 border">
                <form class="formModificar" method="post" action="#">
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
                                    <button type="button" class="btn btn-sm guardar">{{__('Guardar')}}</button>
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
                    <!--RELLENADO DESDE JQUERY -->
                </div>
            </div>

            <div class="donacionCards" class="card-body">
                <div class="row">

                    <!--RELLENADO DESDE JQUERY -->
                </div>
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

<!-- MODAL INSERTAR USUARIO -->
<div class="modal fade" id="insertarModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <form id="formInsertarUsuario" method="POST" action="">
            @csrf

            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Insertar Usuario</h4>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-lg-4">
                                    <div class="form-group">
                                        <h6 class="nifError"><label for="inputState">{{__('NIF')}}</label><span></span></h6> <input name="nif" class="form-control" type="text" >
                                    </div> 

                                    <div class="form-group">
                                        <h6 class="nombreError"><label for="inputState">{{__('Nombre')}}</label><span></span></h6>        <!-- Tipo Y Especie -->
                                        <input name="nombre" class="form-control" type="text" >
                                    </div>
                                </div>   
                                <div class="col-sm-6  col-lg-4">
                                    <div class="form-group">
                                        <h6 class="apellidosError"><label for="inputState">{{__('Apellidos')}}</label><span></span></h6><input name="apellidos" class="form-control" type="text" >
                                    </div> 
                                    <div class="form-group">
                                        <h6 class="telefonoError"><label for="inputState">{{__('Telefono')}}</label><span></span></h6>
                                        <input name="telefono" class="form-control" type="text" >
                                    </div>
                                </div>          
                                <div class="col-sm-6  col-lg-4">
                                    <div class="form-group">
                                        <h6 class="fechaError"><label for="inputState">{{__('Fecha Nacimiento')}}</label><span></span></h6> <input name="fecha" class="form-control" type="date">
                                    </div>

                                    <div class="form-group">
                                        <h6 class="emailError"><label for="inputState">{{__('Email')}}</label><span></span></h6>         <!-- Talla -->
                                        <input name="email" class="form-control" type="text">
                                    </div> 
                                </div>
                                <div class="col-sm-12">
                                <hr>
                                </div>

                                <div class="col-sm-4  col-lg-4">

                                    <div class="form-group">
                                        <h6 class="provinciaError"><label for="inputState">{{__('Provincia')}}</label><span></span></h6> 
                                        <input name="provincia" class="form-control" type="text">
                                    </div>
                                    <div class="form-group">
                                        <h6 class="localidadError"><label for="inputState">{{__('Localidad')}}</label><span></span></h6>
                                        <input name="localidad" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-sm-4  col-lg-4">

                                    <div class="form-group">
                                        <h6 class="calleError"><label for="inputState">{{__('Calle')}}</label><span></span></h6>
                                        <input name="calle" type="text" class="form-control">
                                    </div> 
                                    <div class="form-group">
                                        <h6 class="postalError"><label for="inputState">{{__('C.Postal')}}</label><span></span></h6>
                                        <input name="postal" type="text" class="form-control">
                                    </div>
                                </div>

                                <div class="col-sm-4  col-lg-4">

                                    <div class="form-group">
                                        <h6 class="numeroError"><label for="inputState">{{__('Numero')}}</label><span></span></h6>
                                        <input name="numero" type="text" class="form-control">
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <ul class="msgError">

                </ul>


                <div class="modal-footer">
                    <button type="submit" class="btn btn-default acepta">{{__('Aceptar')}}</button><button type="button" class="btn btn-default cancelar" data-dismiss="modal">{{__('Cancelar')}}</button>
                </div>
            </div>
        </form>

    </div>
</div>



@endsection