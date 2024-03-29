<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'nif' => $data['nif'], /*.self::validarNIF($data['nif'])*/
            'nombre' => $data['name'],
            'fecha_nacimiento' => $data['fecha_nacimiento'], /*.self::mayorEdad($data['fecha_nacimiento'])*/
            'rol' => 'Usuario',
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }


    /**
     * Una función que comprueba si el nif introducido es correcto.
     *
     * @param  string  $dni
     * @return boolean
     */ 

    static function validarNIF($dni){

        $valido=false;
        //Sacamos la letra de la cadena de texto
        $letra = substr($dni, -1);
        
        //También extraemos la cadena de caracteres numérico
        $numeros = substr($dni, 0, -1);

        if ( substr("TRWAGMYFPDXBNJZSQVHLCKE", $numeros%23, 1) == $letra && strlen($letra) == 1 && strlen ($numeros) == 8 ){
            $valido=true;
        }

        return $valido;
    }

    /**
     * Una función que comprueba si es mayor de edad o no.
     *
     * @param  date  $fecha
     * @return boolean
     */ 

    static function mayorEdad($fecha) {

        //Creamos objeto fecha desde el valor $fecha
        $nacio = DateTime::createFromFormat('Y-m-d', $fecha);

        //Calculamos usando diff y la fecha actual
        $calculo = $nacio->diff(new DateTime());

        //Obtenemos la edad
        $edad = $calculo->y;    

        if ($edad < 18) {
            return false;
        }else{
            return true;
        }

    }

}
