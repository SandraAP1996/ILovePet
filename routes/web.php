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



Route::group(['prefix' => 'animal'], function(){
    Route::get('buscar{filtro}', 'AnimalController@buscarAnimal');
});