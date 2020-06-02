<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\Donation;
use App\Address;
use App\Photo;
use DB;

class EventController extends Controller
{
    /*
|--------------------------------------------------------------------------
| INICIO/INFORMACIÓN EVENTOS - inicio.blade.php | informacion.eventos.blade.php 
|--------------------------------------------------------------------------
*/
    /**
     * Función para sacar toda la información de un evento, tanto la direccion, foto, y donaciones
     *
     * @param  void
     * @return objeto $eventos
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
    /**
     * Funcion que saca toda al información del evento relacionado con el parametro $id
     *
     * @param  int $id
     * @return objeto $eventos
     */
    public static function eventoId($id){

        $eventos=DB::select('SELECT * FROM address a, event e WHERE e.id_direccion=a.id AND e.id='.$id);

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

    /**
     * Función para eliminar el evento relacionado con el id, teniendo en cuenta las direcciones
     *
     * @param  int $id
     * @return objeto $existe
     */
    public static function eliminarEvento($id){
        $evento = Event::where('id', $id)->get()->first();


        $cuenta = Address::select()
            ->join('event','event.id_direccion','=','address.id')
            ->where('address.id',$evento->id_direccion)
            ->get();

        if(count($cuenta) == 1){

            $direccion = Address::select()
                ->where('address.id',$evento->id_direccion)
                ->get()
                ->first();
            $direccion->delete();

        }

        $evento->delete();

        $existe = Event::where('id', $id)->get()->first();
        return $existe;
    }

    /**
     * Función para modificar un evento relacionado con el parametro pasado $id, y teniendo encuenta lo que se le pasa por $request
     *
     * @param  Request $request
     * @param  int $id
     * @return int $event->save()
     */
    public static function modificarEvento(Request $request,$id){

        $evento = Event::where('id', $id)->get()->first();

        $cuenta = Address::select()
            ->join('event','event.id_direccion','=','address.id')
            ->where('address.id',$evento->id_direccion)
            ->get();

        $direccion = Address::select('address.*')
            ->join('event','event.id_direccion','=','address.id')
            ->where('address.id',$evento->id_direccion)
            ->get()
            ->first();

        $idDireccion=$direccion->id;
        
        /*DIRECCIÓN*/
        if(count($cuenta)>1){
            if($request->provincia != $direccion->provincia || $request->localidad != $direccion->localidad || $request->calle != $direccion->calle || $request->numero != $direccion->numero){
                $nueva= new Address;
                $nueva->provincia=$request->provincia;
                $nueva->localidad=$request->localidad;
                $nueva->calle=$request->calle;
                if($request->numero == ''){
                    $nueva->numero=null;
                }else{
                    $nueva->numero=$request->numero;
                }
                $nueva->cod_postal=null;
                $nueva->save();
                $idDireccion=$nueva->id;
            }
        }else{
            if($request->provincia != $direccion->provincia){
                $direccion->provincia=$request->provincia;
            }
            if($request->localidad != $direccion->localidad){
                $direccion->localidad=$request->localidad;
            }
            if($request->calle != $direccion->calle){
                $direccion->calle=$request->calle;
            }
            if($request->numero != $direccion->numero){
                if($request->numero==''){
                    $direccion->numero=null;
                }else{
                    $direccion->numero=$request->numero;
                }
            }
            $direccion->save();
        }
        
        /*EVENTO*/
        if($request->nombre != $evento->nombre){
            $evento->nombre=$request->nombre;
        }

        if($request->fecha != $evento->fecha){
            $evento->fecha=$request->fecha;
        }

        if($request->inicio != $evento->hora_inicio){
            $evento->hora_inicio=$request->inicio;
        }
        if($request->fin != $evento->hora_fin){
            $evento->hora_fin=$request->fin;
        }
        if($request->aforo != $evento->aforo){
            if($request->aforo == 0){
                $evento->aforo=null;
            }else{
                $evento->aforo=$request->aforo;
            }
        }
        if($request->descripcion != $evento->descripcion){
            $evento->descripcion=$request->descripcion;
        }

        $evento->id_direccion=$idDireccion;

        /*DONACIÓN*/
        $donacion= Donation::select()
            ->where('id_evento',$evento->id)
            ->get();

        $modificarDonacion= Donation::select()
            ->where('id_evento',$evento->id)
            ->get()
            ->first();

        if($request->recaudacion != ''){


            if(count($donacion) == 1){
                if($request->recaudacion != $modificarDonacion->cantidad){
                    $modificarDonacion->cantidad=$request->recaudacion;
                    $modificarDonacion->save();
                }
            }else{
                $nuevaDonacion = new Donation;
                $nuevaDonacion->id_evento=$evento->id;
                $nuevaDonacion->cantidad=$request->recaudacion;
                $nuevaDonacion->save();
            }
        }else{
            if(count($donacion) == 1){
                $modificarDonacion->delete();
            }
        }

        return $evento->save();
    }

    /**
     * Función para modificar la foto del evento que tiene el id pasado por parametros
     *
     * @param  Request $request
     * @param  int $id
     * @return int $event->save()
     */
    public static function modificarFoto(Request $request,$id){

        $foto = Photo::select()
            ->where('photo.id_evento',$id)
            ->get()
            ->first();

        if($request->foto != ''){
            $foto->titulo='evento'.$id;
            $foto->formato= $request->foto->getClientOriginalExtension();
            $foto->id_evento = $id;

            $request->foto->move('img/evento/', 'evento'.$id.''.$foto->id.'.'.$request->foto->getClientOriginalExtension());

        }else{
            $numero=rand(1,4);
            $foto->titulo='Aleatorio'.$numero;
            $foto->formato='jpg';
        }

        return  $foto->save();;

    }
    /**
     * Función para sacar todas las direcciones relacionadas con un evento
     *
     * @param  void
     * @return Objeto $direcciones
     */
    public static function direcciones(){
        $direcciones = Address::select('address.id','address.provincia','address.localidad','address.calle','address.numero')
            ->join('event','event.id_direccion','=','address.id')
            ->distinct()
            ->get(['address.id']);
        return $direcciones;
    }

    /**
     * Función para sacar los detalles de una dirección especifica, a partir de un id
     *
     * @param  int $id
     * @return Objeto $detalles
     */
    public static function detallesDireccion($id){
        $detalles =  Address::select('address.id','address.provincia','address.localidad','address.calle','address.numero')
            ->where('address.id',$id)
            ->get();

        return $detalles;

    }

    /**
     * Función para insertar un nuevo evento
     *
     * @param  Request $request
     * @param  int $id
     * @return int $event->save()
     */
    public static function insertarEvento(Request $request){

        /*DIRECCIÓN*/
        $id_direccion=0;
        if($request->existente == 'nada'){
            $direccion= new Address;
            $direccion->provincia=$request->provincia;
            $direccion->localidad=$request->localidad;
            $direccion->calle=$request->calle;

            if($request->numero == '' ){
                $direccion->numero=null;
            }else{
                $direccion->numero=$request->numero;
            }
            $direccion->save();
            $id_direccion=$direccion->id;
        }else{
            $id_direccion=$request->existente;
        }


        /*EVENTO*/
        $evento= new Event;
        $evento->nombre=$request->nombre;
        $evento->hora_inicio=$request->inicio;
        $evento->hora_fin=$request->fin;
        $evento->fecha=$request->fecha;
        $evento->descripcion=$request->descripcion;

        if($request->aforo == 0 ){
            $evento->aforo=null;
        }else{
            $evento->aforo=$request->aforo;
        }
        $evento->id_direccion=$id_direccion;

        $insertado=$evento->save();

        /*DONACIÓN*/
        if($request->recaudacion != ''){
            $donacion = new Donation;
            $donacion->cantidad=$request->recaudacion;
            $donacion->id_evento=$evento->id;
            $donacion->save();
        }

        /*FOTO*/
        $photo= new Photo;
        if($request->foto != ''){
            $photo->titulo='evento'.$evento->id;
            $photo->formato= $request->foto->getClientOriginalExtension();
            $photo->ruta= 'evento/';
            $photo->id_evento = $evento->id;
            $request->foto->move('img/evento/', 'evento'.$evento->id.'.'.$request->foto->getClientOriginalExtension());
            $photo->principal=1;

        }else{
            $numero=rand(1,4);
            $photo->titulo='Aleatorio'.$numero;
            $photo->ruta='evento/';
            $photo->formato='jpg';
            $photo->principal=1;
            $photo->id_evento=$evento->id;
        }
        $photo->save();
        return $insertado;
    }

}
