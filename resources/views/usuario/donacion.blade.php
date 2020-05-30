@extends('layout.layout-master')

@section('titulo')
Donacion
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/donacion.css">

<script src="/js/donacion.js"></script>

@endsection


@section('contenido')

<div class="container">
    <div class="row justify-content-center">
        <div id="contenedorRegistro" class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Donación') }}</div>

                <div class="card-body">
                    <form id="formularioPago" method="POST" action="#">
                        @csrf
                        <p>Gracias por llegar ha este punto, y poder aportar un poco de tu dinero y tiempo en ayudar a los que de verdad lo necesitan, como son lo animales.</p>
                        <div class="form-group row modo-pago">
                            <div class="col-md-6 anonimo">
                                <label>
                                    {{ __('Donación Anonima') }} 
                                    <input type="checkbox" name="anonimo" class="tipoDonacion"/>
                                    <div class="switch"></div>
                                    <small></small>
                                </label>
                            </div>
                            <div class="col-md-6 cantidad">

                                <label>
                                    {{ __('Cantidad a Donar') }}<span></span>
                                    <input type="number" name="cantidad" class="form-control" value='0'/>

                                </label>
                            </div>
                        </div>

                        <hr>
                        <div class="form-group row tipo-pago">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Tipo de Pago') }} </label>

                            <div class="col-md-6">
                                <img id="visa" src="/img/web/icons/visa.svg" class="img-rounded" />
                                <img id="mastercard" src="/img/web/icons/mastercard.svg" class="img-rounded" />
                                <img id="paypal" src="/img/web/icons/paypal.svg" class="img-rounded" />
                            </div>
                        </div>

                        <div class="panel-pago" >
                            <!-- VISA -->
                            <div class="visa card mx-5 p-4">
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <input type="text" class="form-control" name="numero" placeholder="Número de la Tarjeta" />
                                    </div>

                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <span class="help-block text-muted small-font"> Mes</span>
                                        <input type="text" class="form-control" name="mes" placeholder="MM" />
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <span class="help-block text-muted small-font">  Año</span>
                                        <input type="text" class="form-control" name="anyo" placeholder="YY" />
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <span class="help-block text-muted small-font">  CCV</span>
                                        <input type="text" class="form-control" name="ccv" placeholder="CCV" />
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <img src="/img/web/icons/tarjeta.svg" class="img-rounded" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-12 pad-adjust">
                                        <input type="text" class="form-control" name="titular" placeholder="Titular de la Tarjeta" />
                                    </div>
                                </div>

                                <div class="row ">
                                    <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                                        <span class="btn btn-danger cancelar"> CANCELAR </span>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                                        <input type="submit"  class="btn btn-warning btn-block pagar" value="PAGAR AHORA" />
                                    </div>
                                </div>
                            </div>

                            <!-- PAYPAL -->
                            <div class="paypal card mx-5 p-4">
                                <div class="row ">
                                    <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                                       <span class="btn btn-danger cancelar"> CANCELAR </span>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                                        <input type="submit"  class="btn btn-warning btn-block pagar" value="PAGAR AHORA" />
                                    </div>
                                </div>
                            </div>
                            <!-- MASTERCARD -->
                            <div class="mastercard card mx-5 p-4">
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <input type="text" class="form-control" name="numero" placeholder="Número de la Tarjeta" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <span class="help-block text-muted small-font"> Mes</span>
                                        <input type="text" class="form-control" name="mes" placeholder="MM" />
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <span class="help-block text-muted small-font">  Año</span>
                                        <input type="text" class="form-control" name="anyo" placeholder="YY" />
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <span class="help-block text-muted small-font">  CCV</span>
                                        <input type="text" class="form-control" name="ccv" placeholder="CCV" />
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <img src="/img/web/icons/tarjeta.svg" class="img-rounded" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-12 pad-adjust">

                                        <input type="text" class="form-control" name="titular" placeholder="Nombre de Tarjeta" />
                                    </div>
                                </div>

                                <div class="row ">
                                    <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                                        <span class="btn btn-danger cancelar"> CANCELAR </span>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                                        <input type="submit"  class="btn btn-warning btn-block pagar" value="PAGAR AHORA" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </form>

                </div>


            </div>
        </div>
    </div>
</div>


<!-- MODAL COMPROBAR DONACIÓN -->
<div class="modal fade" id="confirmarModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- MODAL contenido-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Donación Anonima</h4>
            </div>
            <div class="modal-body">
                <div class="card-body">
                    Nos hemos dado cuenta que no estas registrado, si quieres una donación pública es necesario que se registre. ¿Quieres registrarte?
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default acepta">{{__('Aceptar')}}</button><button type="button" class="btn btn-default" data-dismiss="modal" >{{__('Cancelar')}}</button>
            </div>
        </div>

    </div>
</div>

@endsection