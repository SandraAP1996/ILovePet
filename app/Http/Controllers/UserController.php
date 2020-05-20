<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Animal;
use App\Address;
use App\Donation;
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
     */

    public static function perfilUsuario(){
        $persona=User::find(Auth::user()->id);

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
}
