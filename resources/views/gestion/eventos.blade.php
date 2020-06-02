@extends('layout.layout-master')

@section('titulo')
Gestión Eventos
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/gestionEventos.css">
<script type="text/javascript" src="/js/gestion-eventos.js"></script> 

@endsection
@section('contenido')


<!--
<form action="#" method="post" target="_blank">

<p>Tiempo estimado de arribo: <input type="time" name="eta" class="form-control"> <input type="submit" value="Enviar datos"></p>

</form>
-->

<div id="filtro" class="m-5 pb-4">
    <h3>Gestión Eventos</h3>
    <div class="container-fluid">
        <form method="post" action="#" id="formEvento">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <p>Type something in the input field to search the table for first names, last names or emails:</p> 
                    <input class="form-control" id="filtroEvento" type="text" placeholder="Buscar evento por...">
                </div>       
                <div class="col-md-2 offset-5 text-right">
                    <button type="button" class="btn btn-lg btn-block insertar">{{__('Insertar Evento')}}</button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- FICHA DEL EVENTO-->
<div id="ficha" >
    <div class="row justify-content-center m-0">
        <div class="fichaEvento col-md-6 border">
            <div class="d-flex fichaTitulo">
                <span class="mr-auto"><h3>Ficha del Evento</h3></span> 
                <span class="botones">
                    <img src="/img/web/icons/cruz-blanca.svg" alt="salida" title="Cancelar">
                </span> 
            </div>

            <form class="formModifcar" method="post" action="#" >
                @csrf
                <div class="row justify-content-center">
                    <div class="fichaDescripcion col-md-9">
                        <!-- RELLENA DESDE JQUERY Linea 63-->
                    </div>
                    <div class="fichaBotones col-md-3">
                        <button type="button" class="btn btn-sm eliminar">{{__('Eliminar Evento')}}</button><br><br>
                        <button type="button" class="btn btn-sm modificar">{{__('Modificar')}}</button>
                        <button type="button" class="btn btn-sm guardar">{{__('Guardar')}}</button>
                        <button type="button" class="btn btn-sm cancelarModificar">{{__('Cancelar')}}</button>
                    </div>
                </div>
            </form>
            <div class="fichaFotos col-md-12 px-0">
                <hr>
                <form class="formFoto" method="post" action="" enctype="multipart/form-data">
                    @csrf
                    <div class="d-flex pr-2">
                        <span class="mr-auto"><h5>Fotos</h5></span> 
                        <span class="botones">
                            <!-- Foto -->
                            <div class="insertarImagen">
                                <label for="file-input">
                                    <span class="btn btn-sm subirFoto">{{__('Subir Foto')}}</span>
                                </label>
                                <input id="file-input" type="file" name="foto" accept="image/png, image/jpeg">
                                <span class="btn btn-sm aleatorio">{{__('Aleatorio Foto')}}</span>

                            </div>
                            &nbsp<button type="button" class="btn btn-sm eliminarFoto">{{__('Eliminar')}}</button></span><br> 
                    </div>
                    <div class="seleccionarFoto mb-2">
                        <hr>
                        <div class="d-flex">
                            <span class="mr-auto">
                                <small class="fileValor"></small>
                            </span> 
                            <span class="botonesInsertar mr-2">
                                <!-- Foto -->
                                <button type="button" class="btn btn-sm insertarFoto">{{__('Insertar')}}</button>
                                <button type="button" class="btn btn-sm cancelarFoto">{{__('Cancelar')}}</button>
                            </span><br>   
                        </div>
                    </div>
                </form>
                <div class="galeria border">

                </div>
            </div>
        </div>
    </div>
</div>

<!-- TABLA DE EVENTOS-->
<div class="container">
    <table class="table">
        <thead class="cabecera">
            <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora inicio</th>
                <th>Hora fin</th>
                <th>Estado</th>
                <th>Aforo</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="tablaEventos">
            <!-- RELLENA DESDE JQUERY -->
        </tbody>
    </table>

    <p>Note that we start the search in tbody, to prevent filtering the table headers.</p>
</div>

<!-- MODAL ELIMINAR EVENTOS -->

<div class="modal fade" id="eliminarModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Eliminar Evento</h4>
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

<!-- MODAL INSERTAR EVENTO -->
<div class="modal fade" id="insertarModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <form id="formInsertar" method="POST" action="" enctype="multipart/form-data">
            @csrf
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Insertar Evento</h4>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-lg-4">
                                    <div class="form-group">
                                        <h6 class="nombreError"><label for="inputState">{{__('Nombre')}}</label><span></span></h6> <input name="nombre" class="form-control" type="text" >
                                    </div> 
                                    <div class="form-group">
                                        <h6 class="fechaError"><label for="inputState">{{__('Fecha')}}</label><span></span></h6>        <!-- Tipo Y Especie -->
                                        <input name="fecha" class="form-control" type="date" >
                                    </div>
                                </div>   
                                <div class="col-sm-6  col-lg-4">
                                    <div class="form-group">
                                        <h6 class="inicioError"><label for="inputState">{{__('Hora inicio')}}</label><span></span></h6><input name="inicio" class="form-control" type="time" value="00:00" >
                                    </div> 
                                    <div class="form-group">
                                        <h6 class="finError"><label for="inputState">{{__('Hora finalizar')}}</label><span></span></h6>
                                        <input name="fin" class="form-control" type="time" value="00:00" >
                                    </div>
                                </div>          
                                <div class="col-sm-6  col-lg-4">
                                    <div class="form-group">
                                        <h6 class="aforoError"><label for="inputState">{{__('Aforo')}}</label><span></span></h6> <input name="aforo" class="form-control" type="text">

                                    </div>
                                    <div class="form-group recaudacion">
                                        <h6 class="recaudacionError"><label for="inputState">{{__('Recaudación')}}</label><span></span></h6>         <!-- Talla -->
                                        <input name="recaudacion" class="form-control" type="text"> 
                                    </div> 
                                </div>
                                <div class="col-sm-12 col-lg-12">
                                    <div class="col-sm-12">
                                        <div class="form-group ">

                                            <h6 class="estadoError"><label class="msgTipo" for="inputState">{{__('Dirección')}}</label><span></span></h6>


                                            <div class="tipoExistente">
                                                <!--                                            <div class="col-sm-12 mb-5 row">-->
                                                <div class="col-sm-12 mb-5 row card m-1 py-4 px-3">
                                                    <div class="form-row">
                                                        <select class="form-control direccionesExistentes mb-4" name="existente">
                                                            <!-- RELLENADO DESDE JQUERY -->
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <h6 class=""><label for="inputState">{{__('Provincia')}}</label></h6> <input name="provincia" class="form-control" type="text" disabled>
                                                    </div>
                                                    <div class="form-group">
                                                        <h6 class=""><label for="inputState">{{__('Localidad')}}</label></h6> <input name="localidad" class="form-control" type="text" disabled> 
                                                    </div> 
                                                    <div class="form-group">
                                                        <h6 class=""><label for="inputState">{{__('Calle')}}</label></h6> <input name="calle" class="form-control" type="text" disabled>

                                                    </div>
                                                    <div class="form-group">
                                                        <h6 class=""><label for="inputState">{{__('Numero')}}</label></h6> <input name="numero" class="form-control" type="text" disabled> 
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>

                                    </div> 

                                </div>

                                <div class="col-md-12">
                                    <hr>
                                    <div class="form-group">
                                        <h6 class="descripcionError"><label for="inputState">{{__('Descripción')}}</label><span></span></h6> 
                                        <textarea name="descripcion" class="form-control" ></textarea>
                                    </div>

                                    <div class="form-group">
                                        <h6 class="fotoError"><label for="inputState">{{__('Selecciona una Foto')}}</label><span></span> <span class="btn btn-sm insertAleatorio">{{__('Foto Aleatoria')}}</span></h6>                                 

                                        <input name="foto" type="file" class="form-control-file" accept="image/png, image/jpeg">
                                        <small>Si no se selecciona una foto se pondrá un aleatoria </small><br>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <ul class="msgError">

                </ul>


                <div class="modal-footer">
                    <button type="button" class="btn btn-default acepta">{{__('Aceptar')}}</button><button type="button" class="btn btn-default cancelar" data-dismiss="modal">{{__('Cancelar')}}</button>
                </div>
            </div>
        </form>

    </div>
</div>

@endsection