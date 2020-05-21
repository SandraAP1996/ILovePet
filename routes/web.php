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


Route::group(['prefix' => 'animal'], function(){
    //Route::get('buscar/{filtro}', 'AnimalController@buscarAnimal');
    Route::get('buscar/', 'AnimalController@buscarAnimal');
    Route::get('detalle/{id}', 'AnimalController@detalleAnimal');
});

/*GESTIÓN DEL EMPLEADO*/

Route::group(['prefix' => 'gestion'], function(){
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