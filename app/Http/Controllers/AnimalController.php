<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Animal;
use App\Photo;
use App\User;
use DB;
class AnimalController extends Controller{


    /*
|--------------------------------------------------------------------------
| INICIO - inicio.blade.php
|--------------------------------------------------------------------------
*/


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

    /*
|--------------------------------------------------------------------------
| FILTRO ANIMALES - filtrar-animal.blade.php
|--------------------------------------------------------------------------
*/


    /**
     * Función que saca todos los animales a partir de los parametros pasados .
     *
     * @param  Request $request
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

    /*
|--------------------------------------------------------------------------
| GESTIÓN ANIMALES - animales.blade.php
|--------------------------------------------------------------------------
*/


    /**
     * Función para filtrar los animales a partir del formulario
     *
     * @param  Request $request
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
            $imagenes = DB::select('SELECT * FROM photo p WHERE p.id_animal = '.$animal[$i]->id.';');
            $animal[$i]->img = $imagenes;
        }

        /*Sacamos las todas las razas posibles*/
        $razas = DB::select('SELECT DISTINCT a.raza FROM animal a ;');
        $animal[0]->razas = $razas;


        return $animal;
    }

    /**
     * Función que saca toda la información del animal a partir del id y si tiene una persona relacionada datos de la persona relacionada o fotografia.
     *
     * @param  int $id
     * @return objeto $animal
     */
    public static function fichaAnimal($id){

        $animal= Animal::select()
            ->where('animal.id',$id)
            ->get();

        $imagenes = DB::select('SELECT *  FROM photo p WHERE p.id_animal = "'.$id.'";');

        for($i = 0; $i<count($animal) ; $i++){

            $animal[$i]->img = $imagenes;
        }

        $persona = DB::select('SELECT u.id, u.nif, u.nombre, u.apellidos, u.telefono, u.rol,u.tipo, u.email, d.localidad, d.provincia, d.cod_postal, d.numero,d.calle FROM animal a, users u,address d WHERE a.id_persona=u.id AND a.id='.$id.' AND u.id=d.id_persona;');

        for($i = 0;$i<count($animal);$i++){
            $animal[$i]->persona = $persona;
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

        $imagenes = DB::select('SELECT *  FROM photo p WHERE p.id_animal = "'.$id.'";');
        for($i = 0; $i<count($animal) ; $i++){

            $animal[$i]->img = $imagenes;
        }

        return view('animal.detalle')
            ->with('animal',$animal);
    }

    /**
     * Función para eliminar un animal a partir del id.
     *
     * @param  int $id
     * @return objeto $existe
     */

    public static function eliminarAnimal($id){
        $animal = Animal::find($id);
        $animal->delete();

        $existe = Animal::find($id);

        return $existe;
    }

    /**
     * Función para eliminar una foto a partir del id.
     *
     * @param  int $id
     * @return objeto $existe
     */
    public static function eliminarFoto($id){

        $principal=false;

        $consulta = Photo::select()
            ->where('photo.id', $id)
            ->where('photo.principal','=','1')
            ->get();

        /*Comporbamos si la foto seleccionada es una principal en base a la consulta anterior*/
        if(count($consulta) != 0){

            $numero = DB::select('SELECT COUNT(*) as numero FROM photo WHERE id_animal = '.$consulta[0]->id_animal.' AND id != '.$id.';');

            /*Comprobamos si el animal tiene más de una foto*/
            if($numero[0]->numero != 0){

                $limit= Photo::select()
                    ->where('photo.id_animal',$consulta[0]->id_animal)
                    ->where('photo.id','!=',$id)
                    ->take(1)
                    ->get();
                /*Comprobamos que esa foto no sea la misma que la principal para cambiar la principal*/
                if(count($limit) != 0){
                    $limit[0]->principal = '1';
                    $limit[0]->save();

                }
            }
        }

        /*Eliminamos la foto*/
        $foto = Photo::find($id);
        $foto->delete();

        /*Comprobamos que no exista*/
        $existe = Photo::find($id);
        return $existe;
    }

    /**
     * Función para insertar modificar los datos del animal seleccionado
     *
     * @param  Request $request
     * @return objeto $animal->save()
     */
    public static function modificarAnimal(Request $request,$id){

        $animal = Animal::find($id);

        if($request->chip != $animal->chip){
            $animal->chip=$request->chip;
        }
        if($request->nombre != $animal->nombre){
            $animal->nombre=$request->nombre;
        }

        if($request->tipo != $animal->tipo){
            $animal->tipo=$request->tipo;
        }
        if($request->especie != $animal->especie){
            $animal->especie=$request->especie;
        }

        if($request->edad != $animal->edad){
            $animal->edad=$request->edad;
        }

        if($request->fecha != $animal->fecha_nacimiento){
            $animal->fecha_nacimiento=$request->fecha;
        }
        if($request->raza != $animal->raza){
            $animal->raza=$request->raza;
        }

        if($request->sexo != $animal->sexo){
            $animal->sexo=$request->sexo;
        }

        if($request->talla != $animal->talla){
            $animal->talla=$request->talla;
        }
        if($request->estado != $animal->estado){
            $animal->estado=$request->estado;
        }
        if($request->descripcion != $animal->descripcion){
            $animal->descripcion=$request->descripcion;
        }


        return $animal->save();


    }

    /**
     * Función para insertar un animal a al BD
     *
     * @param  Request $request
     * @return objeto $animal->save()
     */
    public static function insertarAnimal(Request $request){



        $animal = new Animal;
        $animal->chip = $request->chip;
        $animal->nombre = $request->nombre;
        $animal->raza = $request->raza;
        $animal->tipo = $request->tipo;
        $animal->especie = $request->especie;
        $animal->descripcion = $request->descripcion;
        $animal->sexo = $request->sexo;
        $animal->talla = $request->talla;
        $animal->fecha_nacimiento = $request->fecha;
        $animal->situacion = $request->situacion;
        $animal->estado = $request->estado;

        $conf=$animal->save();

      
        if($request->foto != null){

            $titulo = Photo::select('photo.titulo')
                ->join('animal','animal.id','=','photo.id_animal')
                ->get();

            $titulo=$titulo->last()->titulo+1;

            $imagen = $request->foto;

            $photo = new Photo;
            $photo->ruta = 'animal/';
            $photo->titulo=$titulo;
            $photo->formato= $imagen->getClientOriginalExtension();
            $photo->id_animal = $animal->id;
            $photo->principal=1;
            $imagen->move('img/animal/', $titulo.'.'.$imagen->getClientOriginalExtension());

            $photo->save();

        }
        return $conf;
    }

    public static function insertarFoto(Request $request, $id){

        $titulo = Photo::select('photo.titulo')
            ->join('animal','animal.id','=','photo.id_animal')
            ->get();

        $titulo=$titulo->last()->titulo+1;


        $principal = DB::select('SELECT * FROM photo p, animal a WHERE p.id_animal = a.id AND a.id = '.$id.' AND p.principal=1;');

        if($request->foto != null){

            $imagen = $request->foto;


            $photo = new Photo;
            $photo->ruta = 'animal/';
            $photo->titulo=$titulo;
            $photo->formato= $imagen->getClientOriginalExtension();
            $photo->id_animal = $id;

            if(count($principal) == 1){
                $photo->principal=0;
            }else{
                $photo->principal=1;
            }

            $imagen->move('img/animal/', $titulo.'.'.$imagen->getClientOriginalExtension());

            $photo=$photo->save();

        }

        $confirma = ['foto' => $photo , 'id' => $id];

        return $confirma;


    }

}