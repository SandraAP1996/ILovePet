<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Animal;
use App\Address;
use App\Donation;
use App\Photo;
use DB;

use Auth;

class UserController extends Controller{

    /*
|--------------------------------------------------------------------------
| PERFIL - perfil.blade.php
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
//
//        if(count($direccion) == 1 && $modpersona == 1 && $modfoto == 1){
//            return 1;
//        }else{
//            return 0;
//        }


    }
}
