@extends('layout.layout-master')

@section('titulo')
Gestión Eventos
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/gestionEventos.css">
<script type="text/javascript" src="/js/gestion-eventos.js"></script> 

@endsection
@section('contenido')
{{$eventos}}

<div class="container">
    <h2>Filtro de Eventos</h2>
    <p>Type something in the input field to search the table for first names, last names or emails:</p>  
    <input class="form-control" id="myInput" type="text" placeholder="Buscar evento por...">
    <br>
    <table class="table table-bordered">
        <thead class="cabecera">
            <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora inicio</th>
                <th>Hora fin</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody id="myTable">
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
                <td>john@example.com</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@mail.com</td>
                <td>mary@mail.com</td>
                <td>mary@mail.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@greatstuff.com</td>
                <td>july@greatstuff.com</td>
                <td>july@greatstuff.com</td>
            </tr>
            <tr>
                <td>Anja</td>
                <td>Ravendale</td>
                <td>a_r@test.com</td>
                <td>a_r@test.com</td>
                <td>a_r@test.com</td>
            </tr>
        </tbody>
    </table>

    <p>Note that we start the search in tbody, to prevent filtering the table headers.</p>
</div>

@endsection