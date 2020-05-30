<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\Donation;
use App\Address;
use DB;

class EventController extends Controller
{
    /*
|--------------------------------------------------------------------------
| INICIO - inicio.blade.php
|--------------------------------------------------------------------------
*/

    public static function eventoInicio(){


        $eventos=DB::select('SELECT * FROM address a, event e WHERE e.id_direccion=a.id');
        
        /*EVENTO PASADO/PRÓXIMO*/
        $fecha_actual = strtotime(date("d-m-Y H:i:00",time()));
        for($i = 0; $i<count($eventos) ; $i++){
            $fecha_entrada = strtotime($eventos[$i]->fecha);

            if($fecha_actual > $fecha_entrada){
                $eventos[$i]->caducidad=true;
            }else{
                $eventos[$i]->caducidad=false;
            }
            /*DONACIONES*/
            $donacion=DB::select('SELECT * FROM donation d WHERE d.id_evento='.$eventos[$i]->id);
            
            $eventos[$i]->donacion=$donacion;
            
            /*FOTOS*/
             $foto=DB::select('SELECT * FROM photo p WHERE p.id_evento='.$eventos[$i]->id);
            $eventos[$i]->foto=$foto;
        }
        
        
        return $eventos;
    }
    /*
|--------------------------------------------------------------------------
| GESTIÓN EVENTOS - gestion/eventos.blade.php
|--------------------------------------------------------------------------
*/
    
    public static function tablaEventos(){
        return view('gestion.eventos')
            ->with('eventos','hola');
    }

}
