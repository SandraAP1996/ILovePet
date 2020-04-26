@extends('layout.layout-master')

@section('titulo')
Buscar Animal
@endsection
@section('enlaces')
<link rel="stylesheet" type="text/css" href="/css/filtro-animal.css">
<script src="/js/filtro-animal.js"></script>
@endsection



@section('contenido')
<div class="container-fluid">
    <div class="row">
        <!-- FILTRO -->
        <div class="col-md-2 filtro">
            <h3>{{__('Filtrado')}}</h3>
            <hr>
            <form method="get" action="#" id="filtroAnimal">    
                <h6><label for="inputState">{{__('Tipo')}}</label></h6>        <!-- Tipo Y Especie -->
                <select class="form-control tipoAnimal">
                    <option value="0" selected>{{__('Todos')}}</option>
                    <hr>
                    <option value="1">{{__('Doméstico')}}</option>
                    <option value="2">{{__('Granja')}}</option>
                    <option value="3">{{__('Exotico')}}</option>
                </select><br>
                <h6><label for="inputState">{{__('Especie')}}</label></h6>
                <select class="form-control especieAnimal">
<!--                    <option selected>{{__('Todos')}}</option>-->
                </select>
                <hr>
                <h6><label for="inputState">{{__('Sexo')}}</label></h6>        <!-- Sexo -->
                {{__('Todos')}}&nbsp<input name="sexo" value="Todos" type="radio" checked>&nbsp&nbsp&nbsp
                {{__('Macho')}}&nbsp<input name="sexo" value="Macho" type="radio">&nbsp&nbsp&nbsp
                {{__('Hembra')}}&nbsp<input name="sexo" value="Hembra" type="radio">
                <hr>
                 <h6><label for="inputState">{{__('Talla')}}</label></h6>         <!-- Talla -->
                <select class="form-control tallaAnimal">
                    <option selected>{{__('Todos')}}</option>
                    <option>{{__('Pequeña')}}</option>
                    <option>{{__('Media')}}</option>
                    <option>{{__('Grande')}}</option>
                </select> 
                <hr>
                <h6><label for="inputState">{{__('Edad')}}</label></h6>         <!-- Edad -->
                <select class="form-control edadAnimal">
                    <option selected>{{__('Todos')}}</option>
                    <option>{{__('Cachorro')}}</option>
                    <option>{{__('Joven')}}</option>
                    <option>{{__('Adulto')}}</option>
                </select> 
                <hr>
                <h6><label for="inputState">{{__('Estado')}}</label></h6>         <!-- Estado -->
                <select class="form-control estadoAnimal">
                    <option selected>{{__('Todos')}}</option>
                    <option>{{__('Urgente')}}</option>
                    <option>{{__('Recien llegado')}}</option>
                </select><br><br>
                <button type="button" class="btn   btn-lg btn-block">{{__('Buscar')}}</button><br>
            </form>
        </div>
        <!-- BUSQUEDA -->

        <div class="col-md-10 contenidoFiltro">
           
            <!-- NAVEGADOR DE BUSQUEDA -->
            <ul class="breadcrumb navBusqueda">
                <li class="breadcrumb-item active"><span>Adopción</span></li>
                <!-- Rellenarlo con Jquery -->
            </ul>

            <!-- RESULTADO DE LA BUSQUEDA -->
            <div id="contenedorUrgentes" >
                <div id="exposicionAnimal" class="row">
                    <div id="tarjetaAnimal" class="col-12 col-md-6 col-lg-3 grid">
                        <figure class="effect-card">
                            <img src="/img/animal/101.jpg" alt="img12"/>
                            <figcaption>
                                <div class="descripcion">
                                    <h2>{{__('Urgente')}} <span>{{__('Lily')}}</span></h2>
                                    <p>{{__('Lily likes to play with crayons and pencils')}}</p>
                                </div>
                                <a href="#" title="Detalles">{{__('Detalles')}}</a>
                            </figcaption>			
                        </figure>
                    </div>
                    <div id="tarjetaAnimal" class="col-12 col-md-6 col-lg-3 grid">
                        <figure class="effect-card">
                            <img src="/img/animal/101.jpg" alt="img12"/>
                            <figcaption>
                                <div class="descripcion">
                                    <h2>Urgente <span>Lily</span></h2>
                                    <p>Lily likes to play with crayons and pencils</p>
                                </div>
                                <a href="#" title="Detalles">{{__('Detalles')}}</a>
                            </figcaption>			
                        </figure>
                    </div>
                    <div id="tarjetaAnimal" class="col-12 col-md-6 col-lg-3 grid">
                        <figure class="effect-card">
                            <img src="/img/animal/101.jpg" alt="img12"/>
                            <figcaption>
                                <div class="descripcion">
                                    <h2>Urgente <span>Lily</span></h2>
                                    <p>Lily likes to play with crayons and pencils</p>
                                </div>
                                <a href="#" title="Detalles">{{__('Detalles')}}</a>
                            </figcaption>			
                        </figure>
                    </div>

                    <div id="tarjetaAnimal" class="col-12 col-md-6 col-lg-3 grid">
                        <figure class="effect-card">
                            <img src="/img/animal/101.jpg" alt="img12"/>
                            <figcaption>
                                <div class="descripcion">
                                    <h2>{{__('Urgente')}} <span>{{__('Lily')}}</span></h2>
                                    <p>{{__('Lily likes to play with crayons and pencils')}}</p>
                                </div>
                                <a href="#" title="Detalles">{{__('Detalles')}}</a>
                            </figcaption>			
                        </figure>
                    </div>
                    <div id="tarjetaAnimal" class="col-12 col-md-6 col-lg-3 grid">
                        <figure class="effect-card">
                            <img src="/img/animal/101.jpg" alt="img12"/>
                            <figcaption>
                                <div class="descripcion">
                                    <h2>Urgente <span>Lily</span></h2>
                                    <p>Lily likes to play with crayons and pencils</p>
                                </div>
                                <a href="#" title="Detalles">{{__('Detalles')}}</a>
                            </figcaption>			
                        </figure>
                    </div>
                    <div id="tarjetaAnimal" class="col-12 col-md-6 col-lg-3 grid">
                        <figure class="effect-card">
                            <img src="/img/animal/101.jpg" alt="img12"/>
                            <figcaption>
                                <div class="descripcion">
                                    <h2>Urgente <span>Lily</span></h2>
                                    <p>Lily likes to play with crayons and pencils</p>
                                </div>
                                <a href="#" title="Detalles">{{__('Detalles')}}</a>
                            </figcaption>			
                        </figure>
                    </div>
                    <div id="tarjetaAnimal" class="col-12 col-md-6 col-lg-3 grid">
                        <figure class="effect-card">
                            <img src="/img/animal/101.jpg" alt="img12"/>
                            <figcaption>
                                <div class="descripcion">
                                    <h2>Urgente <span>Lily</span></h2>
                                    <p>Lily likes to play with crayons and pencils</p>
                                </div>
                                <a href="#" title="Detalles">{{__('Detalles')}}</a>
                            </figcaption>			
                        </figure>
                    </div>
                    <div id="tarjetaAnimal" class="col-12 col-md-6 col-lg-3 grid">
                        <figure class="effect-card">
                            <img src="/img/animal/101.jpg" alt="img12"/>
                            <figcaption>
                                <div class="descripcion">
                                    <h2>Urgente <span>Lily</span></h2>
                                    <p>Lily likes to play with crayons and pencils</p>
                                </div>
                                <a href="#" title="Detalles">{{__('Detalles')}}</a>
                            </figcaption>			
                        </figure>
                    </div>
                </div>
            </div>

            <!-- PAGINACIÓN -->
            <div class="container">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Anterior</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item seleccionado"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection