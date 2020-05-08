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



Route::group(['prefix' => 'gestion'], function(){
    Route::get('/animales', function () {
        return view('gestion.animales');
    });
    
    Route::get('/animales/buscar', 'AnimalController@gestionAnimal');
});





Route::group(['prefix' => 'informacion'], function(){

    Route::get('/conocenos', function () {
        return view('informacion.conocenos');
    });
    Route::get('/adoptar', function () {
        return view('informacion.adoptar');
    });
});