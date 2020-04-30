<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Animal;
use App\Photo;
use App\User;
use DB;
class AnimalController extends Controller
{
    /**
     * Función que saca todos los animales y sus fotos en orden aleatorio y con un limite de 6.
     *
     * @param  void
     * @return objeto $animales
     */
    public static function inicioTarjetas(){
        $animales = Animal::select('animal.*','photo.titulo','photo.ruta','photo.formato')
            ->join('photo','photo.id_animal','=','animal.id')
            ->where('animal.estado','urgente')
            ->where('animal.situacion','!=','adoptado')
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
    public static function buscarAnimal(Request $request){

        $consulta="";
        $tipo = $request->tipo;
        $especie = $request->especie;
        $sexo = $request->input('sexo');
        $talla = $request->talla;
        $edad = $request->edad;
        $estado = $request->estado;

        if($tipo != 'Todos'){
            $consulta .=" AND a.tipo = '".$tipo."'";
        }
        if($especie != 'Todos'){
            $consulta .=" AND a.especie = '".$especie."'";
        }
        if($sexo != 'Todos'){
            $consulta .=" AND a.sexo = '".$sexo."'";
        }
        if($talla != 'Todos'){
            $consulta .=" AND a.talla = '".$talla."'";
        }
        if($edad != 'Todos'){
            $consulta .=" AND a.edad = '".$edad."'";
        }
        if($estado != 'Todos'){
            $consulta .=" AND a.estado = '".$estado."'";
        }


        $busqueda=DB::select("SELECT * FROM animal a INNER JOIN photo p ON a.id = p.id_animal WHERE a.situacion != 'adoptado'".$consulta.";");
        return $busqueda;

    }
}
