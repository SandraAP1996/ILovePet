@extends('layout.layout-master')

@section('titulo')
Buscar Animal
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/filtro-animal.css">
<script src="/js/filtro-animal.js"></script>
@endsection

@section('contenido')
<div class="container-fluid">
    <span id="inicioFiltro" hidden>{{ $filtro ?? '' }}</span>
    <span id="inicioCampo" hidden>{{ $campo ?? '' }}</span>
    <div class="row">
        <!-- FILTRO -->
        <div class="col-md-2 filtro">
            <h3>{{__('Filtrado')}}</h3>
            <hr>
            <form method="get" action="#" id="filtroAnimal">    
                <h6><label for="inputState">{{__('Tipo')}}</label></h6>        <!-- Tipo Y Especie -->
                <select class="form-control tipoAnimal" name="tipo">
                    <option value="Todos" selected>{{__('Todos')}}</option>
                    <hr>
                    <option value="domestico">{{__('Doméstico')}}</option>
                    <option value="granja">{{__('Granja')}}</option>
                    <option value="exotico">{{__('Exotico')}}</option>
                </select><br>
                <h6><label for="inputState">{{__('Especie')}}</label></h6>
                <select class="form-control especieAnimal" name="especie">
                    <!--                    <option selected>{{__('Todos')}}</option>-->
                </select>
                <hr>
                <h6><label for="inputState">{{__('Sexo')}}</label></h6>        <!-- Sexo -->
                {{__('Todos')}}&nbsp<input name="sexo" value="Todos" type="radio" checked>&nbsp&nbsp&nbsp
                {{__('Macho')}}&nbsp<input name="sexo" value="Macho" type="radio">&nbsp&nbsp&nbsp
                {{__('Hembra')}}&nbsp<input name="sexo" value="Hembra" type="radio">
                <hr>
                <h6><label for="inputState">{{__('Talla')}}</label></h6>         <!-- Talla -->
                <select class="form-control tallaAnimal" name="talla">
                    <option value="Todos" selected>{{__('Todos')}}</option>
                    <option value="Pequeña">{{__('Pequeña')}}</option>
                    <option value="Media">{{__('Media')}}</option>
                    <option value="Grande"> {{__('Grande')}}</option>
                </select> 
                <hr>
                <h6><label for="inputState">{{__('Edad')}}</label></h6>         <!-- Edad -->
                <select class="form-control edadAnimal" name="edad">
                    <option value="Todos" selected>{{__('Todos')}}</option>
                    <option value="Cachorro">{{__('Cachorro')}}</option>
                    <option value="Joven">{{__('Joven')}}</option>
                    <option value="Adulto">{{__('Adulto')}}</option>
                </select> 
                <hr>
                <h6><label for="inputState">{{__('Estado')}}</label></h6>         <!-- Estado -->
                <select class="form-control estadoAnimal" name="estado">
                    <option value="Todos" selected>{{__('Todos')}}</option>
                    <option value="Urgente">{{__('Urgente')}}</option>
                    <option value="Nuevo">{{__('Recien llegado')}}</option>
                </select><br><br>
                <button type="button" class="btn btn-lg btn-block">{{__('Reiniciar Busqueda')}}</button><br>
            </form>
        </div>
        <!-- BUSQUEDA -->

        <div class="col-md-10 contenidoFiltro">

            <!-- NAVEGADOR DE BUSQUEDA -->
            <ul class="breadcrumb navBusqueda">
                <li class="breadcrumb-item active"><span>Adopción</span></li>
                <!-- Rellenarlo con Jquery -->
            </ul>

            <!-- RESULTADO DE LA BUSQUEDA -->
            <div id="contenedorUrgentes" >
                <div id="exposicionAnimal" class="row">

                </div>
            </div>

            <!-- PAGINACIÓN -->
            <div id="paginacionBusqueda" class="container">
                <ul class="pagination">
<!--
                    <li class="page-item anterior"><a class="page-link" href="#">Anterior</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item seleccionado"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
-->
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection