<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Animal;
use App\Address;
use App\Donation;
use App\Photo;
use App\Event;
use DB;

use Auth;

class UserController extends Controller{


    /*
|--------------------------------------------------------------------------
| INICIO - inicio.blade.php
|--------------------------------------------------------------------------
*/

    public static function fotoInicio(){
        $foto=Photo::select()
            ->where('photo.id_persona',Auth::user()->id)
            ->get();
        return $foto;
    }


    /**
     * Función para sacar las ultimas 7 donaciones.
     *
     * @param  void
     * @return objeto $donacion
     */
    public static function graficoDonaciones(){

        $donacion=DB::select('SELECT d.cantidad, u.nombre as nombre , e.nombre as evento FROM ((donation d  LEFT JOIN  users u ON u.id=d.id_persona)LEFT JOIN event e ON e.id=d.id_evento) ORDER BY d.id DESC LIMIT 7;');

        return $donacion;
    }


    /**
     * Función para validar que el correo pasado por parametros existe en la Base de Datos o no.
     *
     * @param  string $email
     * @return objeto $valido
     */
    public static function validarEmail($email){
        $valido= User::where('users.email',$email)->get();
        return $valido;
    }

    /*
|--------------------------------------------------------------------------
| PERFIL - usuario/perfil.blade.php
|--------------------------------------------------------------------------
*/


    /**
     * Función para sacar toda la información del usuario.
     *
     * @param  void
     * @return objeto $persona
     * @return objeto $animal
     * @return objeto $direccion
     * @return objeto $donacion
     */

    public static function perfilUsuario(){

        /*Persona*/
        $persona=User::select()
            ->where('users.id',Auth::user()->id)
            ->get();

        /*Foto Persona*/
        $imagen = DB::select('SELECT * FROM photo p WHERE p.id_persona = '.Auth::user()->id.';');
        if(count($imagen) == 0){
            $persona[0]->img= ['ruta' => 'perfil/', 'titulo' => 'avatar', 'formato' => 'jpg' ];

        }else{
            for($i = 0; $i<count($imagen) ; $i++){
                $persona[0]->img= ['ruta' => $imagen[0]->ruta, 'titulo' => $imagen[0]->titulo, 'formato' => $imagen[0]->formato ];
            }
        }

        /*Animales*/
        $animal = Animal::select()
            ->where('animal.id_persona',Auth::user()->id)
            ->get();
        for($j = 0; $j<count($animal) ; $j++){
            /*Foto Animales*/
            $imagenes = DB::select('SELECT *  FROM photo p WHERE p.id_animal = "'.$animal[$j]->id.'" AND p.principal = 1;');
            for($i = 0; $i<count($imagenes) ; $i++){
                $animal[$j]->img = $imagenes;
            }
        }

        /*Direcciones*/
        $direccion = Address::select()
            ->where('address.id_persona',Auth::user()->id)
            ->get();

        /*Donaciones*/
        $donacion = Donation::select()
            ->where('donation.id_persona',Auth::user()->id)
            ->get();

        return view('usuario.perfil')
            ->with('persona',$persona)
            ->with('animal',$animal)
            ->with('direccion',$direccion)
            ->with('donacion',$donacion);
    }

    /**
     * Función para modificar los datos del usuario.
     *
     * @param  void
     * @return objeto $persona
     */
    public static function modificarPerfil(Request $request){



        /*DIRECCIÓN: comprobar si hay algún registro o no*/
        $direccion = DB::select('SELECT * FROM address a WHERE a.id_persona='.Auth::user()->id);
        $consulta='';
        if(count($direccion) == 0){
            $address = new Address;
            $address->provincia=$request->provincia;
            $address->localidad=$request->localidad;
            $address->cod_postal=$request->postal;
            $address->calle=$request->calle;
            $address->numero=$request->numero;
            $address->id_persona=Auth::user()->id;
            $address->save();
        }else{
            $primero=true;
            if($direccion[0]->provincia != $request->provincia){
                if($primero == true){
                    $primero=false;
                }else{
                    $consulta.=',';
                }
                $consulta.=' provincia="'.$request->provincia.'"';
            }

            if($direccion[0]->localidad != $request->localidad){
                if($primero == true){
                    $primero=false;
                }else{
                    $consulta.=',';
                }
                $consulta.=' localidad="'.$request->localidad.'"';

            }
            if($direccion[0]->cod_postal != $request->postal){
                if($primero == true){
                    $primero=false;
                }else{
                    $consulta.=',';
                }
                $consulta.=' cod_postal='.$request->postal;

            }

            if($direccion[0]->calle != $request->calle){
                if($primero == true){
                    $primero=false;
                }else{
                    $consulta.=',';
                }
                $consulta.=' calle="'.$request->calle.'"';
            }

            if($direccion[0]->numero != $request->numero){
                if($primero == true){
                    $primero=false;
                }else{
                    $consulta.=',';
                }
                $consulta.=' numero='.$request->numero;
            }

            if($primero == false){
                $direccion = DB::update('UPDATE address SET '.$consulta.' WHERE address.id_persona = '.Auth::user()->id.';');
            }
        }

        /*PERSONA: comprobar que se haya introducido datos diferentes*/
        $persona = User::find(Auth::user()->id);


        if($persona->nombre != $request->nombre){
            $persona->nombre=$request->nombre;
        }

        if($persona->apellidos != $request->apellidos){
            $persona->apellidos=$request->apellidos;
        }

        if($persona->email != $request->email){
            $persona->email=$request->email;
        }

        if($persona->telefono != $request->telefono){
            $persona->telefono=$request->telefono;
        }

        $modpersona=$persona->save();
        $modfoto=0;


        if($request->foto != null){
            $imagen = $request->foto;
            $foto = DB::select('SELECT * FROM photo p WHERE p.id_persona='.Auth::user()->id);
            if(count($foto) == 0){
                $photo = new Photo;
                $photo->ruta = 'perfil/';
                $photo->titulo=$persona->nif;
                $photo->formato= $imagen->getClientOriginalExtension();
                $photo->id_persona = Auth::user()->id;
                $photo->principal=0;
                $imagen->move('img/perfil/', $persona->nif.'.'.$imagen->getClientOriginalExtension());

                $modfoto=$photo->save();
            }else{
                $modfoto = DB::update('UPDATE photo SET ruta="perfil/", titulo="'.$persona->nif.'", formato="'.$imagen->getClientOriginalExtension().'" WHERE photo.id_persona = '.Auth::user()->id.';');
                $imagen->move('img/perfil/', $persona->nif.'.'.$imagen->getClientOriginalExtension());

            }
        }
        return $modfoto;
    }

    /*
|--------------------------------------------------------------------------
| GESTIÓN USUARIOS - gestion/usuarios.blade.php
|--------------------------------------------------------------------------
*/

    /**
     * Función para sacar todos los usuarios tipo 'Usuario', más adopciones, acogidas, y donaciones.
     *
     * @param  Request $request
     * @return objeto $usuarios
     */
    public static function buscarUsuarios(Request $request){

        $nif=$request->nif;
        $nombre=$request->nombre;
        $apellidos=$request->apellidos;
        $email=$request->email;
        $telefono=$request->telefono;

        $consulta="";

        if($nif != null){
            $consulta .="AND u.nif = ".$nif."";
        }

        if($nombre != null){
            $consulta .=" AND u.nombre LIKE '%".$nombre."%'";
        }

        if($apellidos != null){
            $consulta .=" AND u.apellidos  LIKE '%".$apellidos."%'";
        }

        if($email != null){
            $consulta .=" AND u.email = '".$email."'";
        }

        if($telefono != null){

            $consulta .=" AND u.telefono = '".$telefono."'";
        }

        $usuarios = DB::select('SELECT * FROM users u WHERE u.rol="Usuario" '.$consulta.';');

        for($i = 0; $i<count($usuarios) ; $i++){

            $adoptado = DB::select('SELECT * FROM animal a WHERE a.id_persona = '.$usuarios[$i]->id.' AND a.situacion = "adoptado";');

            $acogida = DB::select('SELECT * FROM animal a WHERE a.id_persona = '.$usuarios[$i]->id.' AND a.situacion = "acogida";');

            $usuarios[$i]->animal = ["adoptado" => count($adoptado), "acogida" => count($acogida)];


            $donacion = DB::select('SELECT * FROM donation d WHERE d.id_persona = '.$usuarios[$i]->id.';');

            $usuarios[$i]->donacion = count($donacion);

        }
        return $usuarios;
    }

    /**
     * Función para sacar todos los datos de la Persona.
     *
     * @param  int $id
     * @return objeto $usuarios
     */
    public static function fichaPersona($id){


        $usuario = DB::select('SELECT * FROM users u WHERE u.rol="Usuario" AND u.id='.$id.';');

        for($i = 0; $i<count($usuario) ; $i++){

            $adoptado = DB::select('SELECT * FROM animal a, photo p WHERE p.principal=1 AND a.id_persona = '.$id.' AND a.id=p.id_animal AND a.situacion = "adoptado";');

            $acogida = DB::select('SELECT * FROM animal a, photo p WHERE a.id_persona = '.$id.' AND a.id=p.id_animal AND a.situacion = "acogida";');


            $usuario[$i]->animal = ["adoptado" => $adoptado, "acogida" => $acogida];


            $donacion = DB::select('SELECT * FROM donation d WHERE d.id_persona = '.$id.';');

            $usuario[$i]->donacion = $donacion;

            $direccion = DB::select('SELECT * FROM address a WHERE a.id_persona = '.$id.';');

            $usuario[$i]->direccion = $direccion;

        }
        return $usuario;
    }

    /**
     * Función para eliminar un usuario a partir del id.
     *
     * @param  int $id
     * @return objeto $existe
     */
    public static function eliminarPersona($id){

        $persona = User::find($id);
        $persona->delete();
        $existe = User::find($id);

        return $existe;
    }

    /**
     * Función para modificar un usuario a partir del id.
     *
     * @param  int $id
     * @return objeto $existe
     */
    public static function modificarPersona(Request $request,$id){

        $direccion= Address::where('id_persona', $id)->get()->first();

        if($direccion != null){

            if($request->provincia != $direccion->provincia){
                $direccion->provincia=$request->provincia;
            }

            if($request->localidad != $direccion->localidad){
                $direccion->localidad=$request->localidad;
            }

            if($request->calle != $direccion->calle){
                $direccion->calle=$request->calle;
            }

            if($request->postal != $direccion->cod_postal){
                $direccion->cod_postal=$request->postal;
            }

            if($request->numero != $direccion->numero){
                $direccion->numero=$request->numero;
            }

            $direccion->save();

        }else{
            $nuevaDireccion = new Address;
            $nuevaDireccion->provincia=$request->provincia;
            $nuevaDireccion->localidad=$request->localidad;
            $nuevaDireccion->calle=$request->calle;
            $nuevaDireccion->cod_postal=$request->postal;
            $nuevaDireccion->numero=$request->numero;
            $nuevaDireccion->id_persona=$id;
            $nuevaDireccion->save();
        }

        $persona = User::find($id);

        if($request->nif != $persona->nif){
            $persona->nif=$request->nif;
        }
        if($request->nombre != $persona->nombre){
            $persona->nombre=$request->nombre;
        }

        if($request->apellidos != $persona->apellidos){
            $persona->apellidos=$request->apellidos;
        }

        if($request->telefono != $persona->telefono){
            $persona->telefono=$request->telefono;
        }

        if($request->fecha != $persona->fecha_nacimiento){
            $persona->fecha_nacimiento=$request->fecha;
        }

        if($request->email != $persona->email){
            $persona->email=$request->email;
        }

        return $persona->save();
    }

    /**
     * Función para insertar un nuevo usuario.
     *
     * @param  Request $request
     * @return objeto $existe
     */
    public static function insertarUsuario(Request $request){

        $usuario = new User;
        $usuario->nif=$request->nif;
        $usuario->nombre=$request->nombre;
        $usuario->apellidos=$request->apellidos;
        $usuario->telefono=$request->telefono;
        $usuario->fecha_nacimiento=$request->fecha;
        $usuario->email=$request->email;
        $usuario->password = bcrypt($request->nif);
        $usuario->rol='Usuario';

        $usuario->save();

        if($request->provincia != null && $request->localidad != null && $request->calle != null && $request->postal != null && $request->numero != null ){

            $direccion = new Address;
            $direccion->provincia = $request->provincia;
            $direccion->localidad = $request->localidad;
            $direccion->calle = $request->calle;
            $direccion->cod_postal = $request->postal;
            $direccion->numero = $request->numero;
            $direccion->id_persona = $usuario->id;
            $direccion->save();
        }

        $existe= User::where('id', $usuario->id)->get();

        return count($existe);
    }

    /**
     * Función para sacar la información de la persona y de los animales sacados.
     *
     * @param  int $id
     * @return objeto $datos
     */
    public static function personaAdopcion($id){
        $datos=User::where('id',$id)->get()->first();

        $animal = DB::select('SELECT * FROM animal a WHERE a.id_persona = '.$id.';');

        $datos->animal = $animal;

        return $datos;

    }



    /*
|--------------------------------------------------------------------------
| DONACIONES - usuario/donacion.blade.php
|--------------------------------------------------------------------------
*/

    /**
     * Función para añadir donacion de una persona.
     *
     * @param  Request $request
     * @return int $donacion
     */
    public static function donacionPersona(Request $request){

        if($request->cantidad != ''){
            $donacion = new Donation;
            $donacion->cantidad=$request->cantidad;

            if($request->anonimo == ''){
                $donacion->id_persona=Auth::user()->id;
            }else{
                $donacion->id_persona=null;
            }
            return $donacion->save();
        }else{
            return 0;
        }
    }

}
