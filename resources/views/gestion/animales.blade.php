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
            <form method="get" action="#" id="filtroAnimal">
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
                            Raza <select name="raza"  class="form-control">
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
                        <img src="/img/web/icons/cruz-blanca.svg" alt="hola" title="Cancelar"></span> 
                </div>

                <div class="row justify-content-center">
                    <div class="fichaDescripcion col-md-10">

                    </div>
                    <div class="fichaBotones col-md-2">
                        <button type="button" class="btn btn-sm eliminar">{{__('Eliminar')}}</button><br><br>
                        <button type="button" class="btn btn-sm modificar">{{__('Modificar')}}</button>
                    </div>
                    <div class="fichaFotos col-md-12">
                        <hr>
                        <div class="d-flex">
                            <span class="mr-auto"><h5>Fotos</h5></span> 
                            <span class="botones">
                                <button type="button" class="btn btn-sm insertarFoto">{{__('Insertar')}}</button>&nbsp<button type="button" class="btn btn-sm eliminarFoto">{{__('Eliminar')}}</button></span><br>   
                        </div>
                        <div class="galeria border">

                        </div>
                    </div>
                </div>
            </div>
            <div class="fichaPersona col-md-6 border">
                <h3>Ficha de la Persona </h3>

                <p><span>Chip</span>&nbsp&nbsp  </p>
                <p><span>Edad</span>&nbsp&nbsp () </p>
                <p><span>Fecha de nacimiento</span>&nbsp&nbsp  </p>
                <p><span>Raza</span>&nbsp&nbsp </p>
                <p><span>Sexo</span>&nbsp&nbsp </p>
                <p><span>Talla</span>&nbsp&nbsp </p>
                <p><span>Descripción</span> <br> </p>
            </div>
            <hr>

        </div>
    </div>
    <div id="resultado">
        <table class="table">
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

<!-- MODAL MODIFICAR ANIMALES -->

<div class="modal fade" id="modificarAnimal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modificar Animal</h4>
            </div>
            <div class="modal-body">
                <div class="card-body">
                    <form >
                        
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default acepta">{{__('Aceptar')}}</button><button type="button" class="btn btn-default" data-dismiss="modal">{{__('Cancelar')}}</button>
            </div>
        </div>

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