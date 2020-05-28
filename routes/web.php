<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Route::get('/', function () {
//    return view('inicio');
//});


//Route::get('/inicio', 'AnimalController@inicioTarjetas');
Route::get('/', 'AnimalController@inicioTarjetas');


Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

Route::get('buscar/{campo}/{filtro}', function ($campo,$filtro) {
    return view('animal.filtrar-animal')
        ->with('campo',$campo)
        ->with('filtro',$filtro);
});

/*ANIMALES*/
Route::group(['prefix' => 'animal'], function(){
    Route::get('buscar/', 'AnimalController@buscarAnimal');
    Route::get('detalle/{id}', 'AnimalController@detalleAnimal');
});

/*GESTIÓN DEL EMPLEADO*/
Route::group([
    'middleware' => 'gestion',
    'prefix' => 'gestion'
], function () {

    /*Rutas de Gestión de Animales*/
    Route::get('/animales', function () {
        return view('gestion.animales');
    });
    Route::get('/animales/buscar', 'AnimalController@gestionAnimal');
    Route::get('/animales/id/{id}', 'AnimalController@fichaAnimal');
    Route::get('/animales/eliminar/id/{id}', 'AnimalController@eliminarAnimal');
    Route::get('/animales/eliminar/foto/{id}', 'AnimalController@eliminarFoto');
    Route::post('/animales/modificar/id/{id}', 'AnimalController@modificarAnimal');
    Route::post('/animales/insertar/foto/{id}', 'AnimalController@insertarFoto');
    Route::post('/animales/insertar', 'AnimalController@insertarAnimal');

    /*Rutas de Gestión Usuarios*/
    Route::get('/usuarios', function () {
        return view('gestion.usuarios');
    });
    Route::get('/usuarios/buscar', 'UserController@buscarUsuarios');
    Route::get('/usuarios/id/{id}', 'UserController@fichaPersona');
    Route::get('/usuarios/eliminar/id/{id}', 'UserController@eliminarPersona');
    Route::post('/usuarios/modificar/id/{id}', 'UserController@modificarPersona');
    Route::post('/usuarios/insertar', 'UserController@insertarUsuario');

    /*Rutas de Gestión Adopciones*/
    Route::get('/tramite', 'AnimalController@tablasAdopcion');
    Route::get('/tramite/actualizar', 'AnimalController@actualizarAdopcion');
    Route::get('/tramite/persona/id/{id}', 'UserController@personaAdopcion');
    Route::get('/tramite/animal/id/{id}', 'AnimalController@animalAdopcion');
    Route::get('/tramite/{tipo}/animal/{animal}/persona/{persona}','AnimalController@tramiteAdoptar');
    Route::get('/tramite/cancelar/id/{id}','AnimalController@cancelarAdopcion');




});


Route::group(['prefix' => 'usuario'], function(){
    Route::middleware('auth')->get('/perfil', 'UserController@perfilUsuario');
    Route::middleware('auth')->post('/perfil/modificar', 'UserController@modificarPerfil');
});




Route::group(['prefix' => 'informacion'], function(){

    Route::get('/conocenos', function () {
        return view('informacion.conocenos');
    });
    Route::get('/adoptar', function () {
        return view('informacion.adoptar');
    });
});