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
Route::get('/inicio/perfil', 'UserController@fotoInicio');
Route::get('/inicio/eventos', 'EventController@eventoInicio');

/*REGISTRO*/
Route::get('/usuario/email/{email}', 'UserController@validarEmail');

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

Route::get('buscar/{campo}/{filtro}', function ($campo,$filtro) {
    return view('animal.filtrar-animal')
        ->with('campo',$campo)
        ->with('filtro',$filtro);
});



Route::get('/eventos',function () {
    return view('informacion.eventos');
});

/*DONACIONES*/
Route::get('/grafico/donaciones', 'UserController@graficoDonaciones');

Route::get('/donacion',function () {
    return view('usuario.donacion');
});
Route::post('/tramite/donacion', 'UserController@donacionPersona');


/*VER ANIMALES*/
Route::group(['prefix' => 'animal'], function(){
//    Route::get('buscar/', 'AnimalController@buscarAnimal');
    Route::get('/buscar/pagina/{pagina}', 'AnimalController@buscarAnimal');
    Route::get('paginacion/', 'AnimalController@paginacionAnimal');
    Route::get('contador/', 'AnimalController@buscarAnimal');
    Route::get('detalle/{id}', 'AnimalController@detalleAnimal');
    Route::get('razas/', 'AnimalController@buscarRazas');
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

    /*Rutas de Gestión Eventos*/
    Route::get('/eventos',function () {
        return view('gestion.eventos');
    });

    Route::get('/eventos/id/{id}', 'EventController@eventoId');
    Route::get('/eventos/eliminar/id/{id}', 'EventController@eliminarEvento');
    Route::post('/eventos/modificar/id/{id}', 'EventController@modificarEvento');
    Route::post('/eventos/editar/foto/{id}', 'EventController@modificarFoto');
    Route::post('/eventos/insertar', 'EventController@insertarEvento');

    Route::get('/eventos/direcciones', 'EventController@direcciones');
    Route::get('/eventos/direcciones/detalles/{id}', 'EventController@detallesDireccion');




});

/*USUARIOS*/
Route::group(['prefix' => 'usuario'], function(){
    Route::middleware('auth')->get('/perfil', 'UserController@perfilUsuario');
    Route::middleware('auth')->post('/perfil/modificar', 'UserController@modificarPerfil');
});



/*INFORMACIÓN*/
Route::group(['prefix' => 'informacion'], function(){

    Route::get('/conocenos', function () {
        return view('informacion.conocenos');
    });
    Route::get('/adoptar', function () {
        return view('informacion.adoptar');
    });
    Route::get('/donar', function () {
        return view('informacion.donar');
    });
    Route::get('/ayudales', function () {
        return view('informacion.ayudar');
    });
});