<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Animal;
use App\Photo;

class AnimalController extends Controller
{
    /**
     * Función que saca todos los animales y sus fotos en orden aleatorio y con un limite de 6 .
     *
     * @param  void
     * @return objeto $animales
     */
    public static function inicioTarjetas(){
        $animales = Animal::select('animal.*','photo.titulo','photo.ruta','photo.formato')
            ->join('photo','photo.id_animal','=','animal.id')
            ->where('animal.nivel','urgente')
            ->inRandomOrder()
            ->take(6)
            ->get();

        return view('inicio')
            ->with('animales',$animales);
    }


    /**
     * Función que saca todos los animales a partir de los parametros pasados .
     *
     * @param  objeto $filtro
     * @return objeto $animales
     */
    public static function buscarAnimal($filtro){

    }
}
