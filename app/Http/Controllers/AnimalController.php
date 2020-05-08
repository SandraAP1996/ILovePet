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
            ->where('photo.principal','=','1')
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


        $busqueda=DB::select("SELECT * FROM animal a INNER JOIN photo p ON a.id = p.id_animal WHERE a.situacion != 'adoptado' AND p.principal=1 ".$consulta.";");
        return $busqueda;

    }

    /**
     * Función que saca toda la información del animal y de las fotografias.
     *
     * @param  int $id
     * @return objeto $animal
     */
    public static function gestionAnimal(Request $request){

        $consulta="";
        $primero=true;
        $chip = $request->input('chip');
        $nombre = $request->input('nombre');
        $estado = $request->estado;
        $situacion = $request->situacion;
        $raza = $request->raza;

        if($chip != null){
            if($primero){
                $consulta .='WHERE a.chip = "'.$chip.'"';
                $primero=false;
            }else{
                $consulta .=" AND a.chip = '".$chip."'";
            }
        }
        if($nombre != ''){
            if($primero){
                $consulta .='WHERE a.nombre = "'.$nombre.'"';
                $primero=false;
            }else{
                $consulta .=' AND a.nombre = "'.$nombre.'"';
            }

        }
        if($estado != 'todo'){
            if($primero){
                $consulta .='WHERE a.estado = "'.$estado.'"';
                $primero=false;
            }else{
                $consulta .=' AND a.estado = "'.$estado.'"';
            }


        }
        if($situacion != 'todo'){
            if($primero){
                $consulta .='WHERE a.situacion = "'.$situacion.'"';
                $primero=false;
            }else{
                $consulta .=' AND a.situacion = "'.$situacion.'"';
            }

        }
        if($raza != 'todo'){
            if($primero){
                $consulta .='WHERE a.raza = "'.$raza.'"';
                $primero=false;
            }else{
                $consulta .=' AND a.raza = "'.$raza.'"';
            }

        }


        $animal= DB::select("SELECT * FROM animal a ".$consulta.";");

        /*Sacamos las imagenes de cada animal*/

        for($i = 0; $i<count($animal) ; $i++){
            $imagenes = DB::select('SELECT p.titulo, p.principal , p.formato, p.ruta  FROM photo p WHERE p.id_animal = '.$animal[$i]->id.';');
            $animal[$i]->img = $imagenes;
        }

        /*Sacamos las todas las razas posibles*/
        $razas = DB::select('SELECT DISTINCT a.raza FROM animal a ;');
        $animal[0]->razas = $razas;


        return $animal;
    }

    public static function fichaAnimal($id){
        
        $animal= Animal::select()
            ->where('animal.id',$id)
            ->get();

        $imagenes = DB::select('SELECT p.titulo, p.formato, p.ruta  FROM photo p WHERE p.id_animal = "'.$id.'";');
        
        for($i = 0; $i<count($animal) ; $i++){

            $animal[$i]->img = $imagenes;
        }

        return $animal;
    }


    /**
     * Función que saca toda la información del animal.
     *
     * @param  int $id
     * @return objeto $animal
     */

    public static function detalleAnimal($id){

        $animal= Animal::select()
            ->where('animal.id',$id)
            ->get();

        $imagenes = DB::select('SELECT p.titulo, p.formato, p.ruta  FROM photo p WHERE p.id_animal = "'.$id.'";');
        for($i = 0; $i<count($animal) ; $i++){

            $animal[$i]->img = $imagenes;
        }

        return view('animal.detalle')
            ->with('animal',$animal);
    }
}
