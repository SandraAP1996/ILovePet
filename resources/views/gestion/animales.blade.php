@extends('layout.layout-master')

@section('titulo')
Gestión Animales
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/gestionAnimales.css">
<script src="/js/gestion-animal.js"></script>
@endsection

@section('contenido')

<div class="contenedor">
    <div id="filtro">
        <h3>Gestión Animales</h3>
        <div class="container-fluid">
            <form method="post" action="#" id="filtroAnimal">
                <div class="row justify-content-center">
                    <div class="col-md-2">
                        <div class="form-group">
                            Chip <input name="chip" class="form-control" type="text">
                        </div> 
                        <div class="form-group">
                            Nombre <input name="nombre" class="form-control" type="text">
                        </div>
                    </div>       
                    <div class="col-md-2">
                        <div class="form-group">
                            Raza <select name="raza"  class="form-control " >
                            </select>
                        </div> 
                        <div class="form-group">
                            Estado <select name="estado" class="form-control">
                            <option value="todo" selected></option>
                            <option value="urgente">Urgente</option>
                            <option value="normal">Normal</option>
                            <option value="nuevo">Nuevo</option>
                            </select>
                        </div>
                    </div>          
                    <div class="col-md-2">
                        <div class="form-group">
                            Situación <select name="situacion" class="form-control">
                            <option value="todo" selected></option>
                            <option value="centro">Centro</option>
                            <option value="acogida">Acogida</option>
                            <option value="adoptado">Adoptado</option>
                            </select>
                        </div> 
                        <div class="form-group">

                        </div> 
                    </div>
                    <div class="col-md-4">
                        <ul class="error">

                        </ul>
                    </div>
                    <div class="col-md-2 text-right">
                        <button type="button" class="btn btn-lg btn-block insertar">{{__('Insertar Animal')}}</button><br><br><br><br>
                        <button type="button" class="btn btn-sm reiniciar">{{__('Reiniciar')}}</button>
                    </div>
                </div>
            </form>
        </div>

    </div>

    <div id="ficha" >
        <div class="row justify-content-center">
            <div class="fichaAnimal col-md-6 border">
                <div class="d-flex fichaTitulo">
                    <span class="mr-auto"><h3>Ficha del Animal</h3></span> 
                    <span class="botones">
                        <img src="/img/web/icons/cruz-blanca.svg" alt="salida" title="Cancelar">
                    </span> 
                </div>

                <form  method="post" action="#" >
                    <div class="row justify-content-center">
                        <div class="fichaDescripcion col-md-9">
                        </div>
                        <div class="fichaBotones col-md-3">
                            <button type="button" class="btn btn-sm eliminar">{{__('Eliminar Animal')}}</button><br><br>
                            <button type="button" class="btn btn-sm modificar">{{__('Modificar')}}</button>
                            <button type="button" class="btn btn-sm guardar">{{__('Guardar')}}</button>
                            <button type="button" class="btn btn-sm cancelarModificar">{{__('Cancelar')}}</button>
                        </div>
                    </div>
                </form>
                <div class="fichaFotos col-md-12">
                    <hr>
                    <form class="formFoto" method="post" action="" enctype="multipart/form-data">
                        @csrf
                        <div class="d-flex">
                            <span class="mr-auto"><h5>Fotos</h5></span> 
                            <span class="botones">
                                <!-- Foto -->
                                <div class="insertarImagen">
                                    <label for="file-input">
                                        <span class="btn btn-sm subirFoto">{{__('Subir Foto')}}</span>
                                    </label>
                                    <input id="file-input" type="file" name="foto" accept="image/png, image/jpeg">
                                </div>
                                &nbsp<button type="button" class="btn btn-sm eliminarFoto">{{__('Eliminar')}}</button></span><br>   
                        </div>
                        <div class="seleccionarFoto">
                            <hr>
                            <div class="d-flex">
                                <span class="mr-auto">
                                    <small class="fileValor"></small>
                                </span> 
                                <span class="botonesInsertar">
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
            <div class="fichaPersona col-md-4 border">
                <div class="d-flex fichaTitulo">
                    <span class="mr-auto"><h3>Ficha de la Persona</h3></span> 
                    <span class="tipo"><h3><!-- CONTENIDO DE JQuery--></h3></span>
                </div>
                <div id="descripcionASD" class="fichaDescripcion col-md-9">
                    <!-- CONTENIDO DE JQuery-->
                </div>
            </div>
        </div>
    </div>
    <div id="resultado" class="table-responsive">
        <table class="table ">
            <thead class="cabecera">
                <tr>
                    <th scope="col">Chip</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha de nacimiento / Edad</th>
                    <th scope="col">Raza</th>
                    <th scope="col">Talla</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Situación</th>
                    <th scope="col">Fotos</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

    </div>
</div>

<!-- MODAL INSERTAR ANIMALES -->
<div class="modal fade" id="insertarModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <form id="formInsertarAnimal" method="POST" action="" enctype="multipart/form-data">
            @csrf

            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Insertar Animal</h4>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-lg-4">
                                    <div class="form-group">
                                        <h6 class="chipError"><label for="inputState">{{__('Chip')}}</label><span></span></h6> <input name="chip" class="form-control" type="text" >
                                    </div> 

                                    <div class="form-group">
                                        <h6 class="tipoError"><label for="inputState">{{__('Tipo')}}</label><span></span></h6>        <!-- Tipo Y Especie -->
                                        <select class="form-control tipoAnimal" name="tipo">
                                            <option value="todo" selected></option>
                                            <option value="domestico">{{__('Doméstico')}}</option>
                                            <option value="granja">{{__('Granja')}}</option>
                                            <option value="exotico">{{__('Exotico')}}</option>
                                        </select>
                                    </div>
                                </div>   
                                <div class="col-sm-6  col-lg-4">

                                    <div class="form-group">
                                        <h6 class="nombreError"><label for="inputState">{{__('Nombre')}}</label><span></span></h6><input name="nombre" class="form-control" type="text" >
                                    </div> 
                                    <div class="form-group">
                                        <h6 class="especieError"><label for="inputState">{{__('Especie')}}</label><span></span></h6>
                                        <select class="form-control especieAnimal" name="especie">
                                            <option value="todo"></option>
                                            <option value="perro">Perros</option>
                                            <option value="gato">Gatos</option>
                                            <option value="pajaro">Pájaros</option>
                                            <option value="roedor">Roedores</option>
                                            <option value="equino">Equinos</option>
                                            <option value="ganado">Ganado</option>
                                            <option value="reptil">Reptiles</option>
                                        </select>
                                    </div>
                                </div>          
                                <div class="col-sm-6  col-lg-4">
                                    <div class="form-group">
                                        <h6 class="razaError"><label for="inputState">{{__('Raza')}}</label><span></span></h6> <input name="raza" class="form-control" type="text">

                                    </div>

                                    <div class="form-group">
                                        <h6 class="tallaError"><label for="inputState">{{__('Talla')}}</label><span></span></h6>         <!-- Talla -->
                                        <select class="form-control tallaAnimal" name="talla">
                                            <option value="todo" selected></option>
                                            <option value="Pequeña">{{__('Pequeña')}}</option>
                                            <option value="Media">{{__('Media')}}</option>
                                            <option value="Grande"> {{__('Grande')}}</option>
                                        </select> 

                                    </div> 
                                </div>
                                <div class="col-sm-6 col-lg-4">

                                    <div class="form-group">
                                        <h6 class="estadoError"><label for="inputState">{{__('Estado')}}</label><span></span></h6><select class="form-control estadoAnimal" name="estado" >
                                        <option value="todo" selected></option>
                                        <option value="normal">{{__('Normal')}}</option><option value="Urgente">{{__('Urgente')}}</option>
                                        <option value="Nuevo">{{__('Recien llegado')}}</option>
                                        </select>
                                    </div> 

                                    <div class="form-group">
                                        <h6 class="situacionError"><label for="inputState">{{__('Situación')}}</label><span></span></h6> <select name="situacion" class="form-control" >
                                        <option value="todo" selected></option>
                                        <option value="centro">Centro</option>
                                        <option value="acogida">Acogida</option>
                                        <option value="adoptado">Adoptado</option>
                                        </select>

                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="form-group">

                                        <h6 class="edadError"><label for="inputState">{{__('Edad')}}</label><span></span></h6>         <!-- Edad -->
                                        <select class="form-control edadAnimal" name="edad">
                                            <option value="todo" selected></option>
                                            <option value="Cachorro">{{__('Cachorro')}}</option>
                                            <option value="Joven">{{__('Joven')}}</option>
                                            <option value="Adulto">{{__('Adulto')}}</option>
                                        </select>

                                    </div> 

                                    <div class="form-group">
                                        <h6 class="sexoError"><label for="inputState">{{__('Sexo')}}</label><span></span></h6>        <!-- Sexo -->
                                        {{__('Macho')}}&nbsp<input name="sexo" value="Macho" type="radio">&nbsp&nbsp&nbsp
                                        {{__('Hembra')}}&nbsp<input name="sexo" value="Hembra" type="radio"><br>
                                    </div>

                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="form-group">
                                        <h6 class="fechaError datepicker-input"><label for="inputState">{{__('Fecha de Nacimiento')}}</label><span></span></h6> 
                                        <input name="fecha" class="form-control" type="date" >
                                    </div>

                                </div>
                                <div class="col-md-12">
                                    <hr>
                                    <div class="form-group">
                                        <h6 class="descripcionError"><label for="inputState">{{__('Descripción')}}</label><span></span></h6> 
                                        <textarea name="descripcion" class="form-control" ></textarea>
                                        <span class="contador"></span>
                                    </div>


                                    <div class="form-group">
                                        <h6 class="fotoError"><label for="inputState">{{__('Selecciona una Foto')}}</label><span></span></h6>
                                        <input name="foto" type="file" class="form-control-file" accept="image/png, image/jpeg">
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

<!-- MODAL ELIMINAR ANIMALES -->

<div class="modal fade" id="eliminarModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Eliminar Animal</h4>
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

@endsection