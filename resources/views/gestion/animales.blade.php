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

    <div id="ficha" class="border">
        <h3>Ficha del Animal </h3>

        <p><span>Chip</span>&nbsp&nbsp  </p>
        <p><span>Edad</span>&nbsp&nbsp () </p>
        <p><span>Fecha de nacimiento</span>&nbsp&nbsp  </p>
        <p><span>Raza</span>&nbsp&nbsp </p>
        <p><span>Sexo</span>&nbsp&nbsp </p>
        <p><span>Talla</span>&nbsp&nbsp </p>
        <p><span>Descripción</span> <br> </p>
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
                    <th scope="col">Fotos</th>
                    <th scope="col">Situación</th>
                    <th scope="col">Estado</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

    </div>
</div>

@endsection