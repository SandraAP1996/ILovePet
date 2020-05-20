<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>I LOVE PET - @yield('titulo') </title>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <!-- BOOTSTRAP -->
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
        <script src="/bootstrap/js/jquery-3.4.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="/bootstrap/js/bootstrap.min.js"></script>

        <!-- FAVICON -->
        <link rel="icon" type="image/vnd.microsoft.icon" href="/img/web/favicon.ico">
        <!-- Fuentes -->
        <link href="https://fonts.googleapis.com/css?family=Amatic+SC&display=swap" rel="stylesheet">

        <!-- JS -->
        <script type="text/javascript" src="/js/layout.js"></script>       
        <!-- CSS -->
        <link rel="stylesheet" type="text/css" href="/css/estilo-master.css">

        <!-- Libreria de LEAFLET -->
        <script src="https://unpkg.com/leaflet@1.0.2/dist/leaflet.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />

        <!-- SCRIPTS especificos -->
        @yield('enlaces')

    </head>
    <body>

        <!-- HACIA ARRIBA -->
        <div href="javascript:void(0);" id="scroll" title="Arriba" ><img id="huella" src="/img/web/icons/huella.svg" alt="foto huella" ></div>


        <!-- CABECERA -->
        <div id="cabecera" class="container-fluid text-center text-md-left">
            <div class="row">
                <div id="logo" class="col-sm-12 col-s-6 col-lg-8 ">

                    {{__('I')}} <img src="/img/web/logo.png" alt="logo"> {{__('Pet')}}
                </div>
                <div class="cabeceraRedes col-sm-12 col-md-6  col-lg-3">
                    <a href="https://facebook.com/" target="_blank" title="Facebook"><img src="/img/web/icons/facebook.svg" class="redes" id="facebook"></a>
                    <a href="https://www.instagram.com/" target="_blank" title="Instagram"><img src="/img/web/icons/instagram.svg" class="redes" id="instagram"></a>
                    <a href="https://twitter.com/" target="_blank" title="Twitter"><img src="/img/web/icons/twitter.svg" class="redes" id="twitter"></a>
                </div>
            </div>
        </div>

        <!--BARRA DE NAVEGACIÓN -->

        <nav class="navbar navbar-expand-lg navbar-dark default-color" id="navegador">
            <a class="navbar-brand" href="{{url('/')}}"><img id="inicio" class="redes" src="/img/web/icons/huella.svg" alt="foto huella" ></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link"  data-toggle="dropdown" style="cursor:pointer;">{{__('Adopción')}}</a>
                        <div class="dropdown-menu dropdown-default" >

                            <a class="dropdown-item" href="{{url('/buscar/todos/todos')}}">{{__('Todos')}}</a>
                            <a class="dropdown-item" href="{{url('/buscar/tipo/domestico')}}">{{__('Domésticos')}}</a>
                            <a class="dropdown-item" href="{{url('/buscar/tipo/granja')}}">{{__('Granja')}}</a>
                            <a class="dropdown-item" href="{{url('/buscar/tipo/exotico')}}">{{__('Exóticos')}}</a>

                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">{{__('Eventos')}}
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">{{__('Donaciones')}}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{url('/informacion/conocenos')}}">{{__('Conocenos')}}</a>
                    </li>

                </ul>
                <ul class="navbar-nav ml-auto nav-flex-icons float-right">
                    <li class="nav-item dropdown">

                        @if(!Auth::user())
                        <a class="navbar-brand" data-toggle="modal" data-target="#modalLogin"  style="cursor:pointer;"><img id="login" class="redes" src="/img/web/icons/perfil.svg" alt="foto huella" title="Login"></a>
                        @else
                        <a class="nav-link " data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false" style="cursor:pointer;">
                            <img id="login" class="redes" src="/img/web/icons/perfil2.png" alt="foto perfil" title="Login">
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-default">
                            <a class="dropdown-item" href="{{url('/usuario/perfil')}}">{{__('Pérfil')}}</a>
                            @if(Auth::user()->rol == 'Empleado')

                            <a class="dropdown-item" href="{{url('/gestion/animales')}}">Gestionar Animales</a>
                            <a class="dropdown-item" href="#">Gestionar Usuarios</a>


                            <div class="dropdown-divider"></div>                            
                            @else

                            @endif

                            <a class="dropdown-item" href="{{ route('logout') }}"
                               onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                                {{__('Cerrar Sesión')}}
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>

                        </div>
                        @endif
                    </li>
                </ul>


            </div>
        </nav>

        <!-- Modal Login -->
        <div class="modal fade" id="modalLogin" role="dialog">
            <div class="modal-dialog modal-lg">

                <!-- MODAL contenido-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{__('Login')}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="card-body">
                            <form method="POST" action="{{ route('login') }}">
                                @csrf

                                <div class="form-group row">
                                    <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail') }}</label>

                                    <div class="col-md-6">
                                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="ejemplo@gmail.com">

                                        @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Contraseña') }}</label>

                                    <div class="col-md-6">
                                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="password">

                                        @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-6 offset-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                            <label class="form-check-label" for="remember">
                                                {{ __('Recordar el usuario') }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row mb-0">
                                    <div class="col-md-8 offset-md-4" id="inferiorLogin">
                                        <button type="submit" class="btn btn-primary">
                                            {{ __('Iniciar') }}
                                        </button>
                                        <br>
                                        @if (Route::has('password.request'))
                                        <a class="btn btn-link" href="{{ route('password.request') }}">
                                            {{ __('¿Has olvidado la contraseña?') }}
                                        </a>
                                        @endif

                                        <a class="btn btn-link" href="{{ route('register') }}">{{ __('Crearme una cuenta') }}</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{__('Cerrar')}}</button>
                    </div>
                </div>

            </div>
        </div>



        <!-- CONTENIDO -->

        <div id="contenidoLayout">         
            @yield('contenido')
        </div>

        <!-- FOOTER -->
        <footer class="page-footer font-small blue pt-4">
            <div class="container-fluid text-center text-md-left">
                <div class="row">
                    <div class="col-md-6 mt-md-0 mt-3 row">

                        <div  class="col-md-6"><h5 class="text-uppercase">{{ __('Contacto') }}</h5>
                            <hr>
                            <p>{{ __('Dirección: ') }}<span>{{ __('Calle Ernesto Che Guevara, Valencia, 46920') }}</span></p>
                            <p>{{ __('Teléfonos: ') }}<span>{{ __('982465377 - 695483721') }}</span></p>
                            <p>{{ __('Email: ') }}<span><a href="mailto:ilovepet@gmail.com">{{__('ilovepet@gmail.com') }}</a></span></p>
                        </div>
                        <div class="col-md-5" id = 'map'></div>
                    </div>
                    <hr class="clearfix w-100 d-md-none pb-3">
                    <div class="col-md-3 mb-md-0 mb-3">
                        <h5 class="text-uppercase">{{__('Árbol de Navegación') }}</h5>

                        <ul class="list-unstyled">
                            <li><a href="{{url('/')}}">{{__('Inicio') }}</a></li>
                            <li>
                                <a href="{{url('/buscar/todos/todos')}}">{{__('Adopción') }}</a>
                                <ul >
                                    <li class="list-unstyled">  <a href="{{url('/buscar/tipo/domestico')}}">{{__('Domésticos') }}</a></li>
                                    <li class="list-unstyled"> <a href="{{url('/buscar/tipo/granja')}}">{{__('Granja') }}</a></li>
                                    <li class="list-unstyled"> <a href="{{url('/buscar/tipo/exotico')}}">{{__('Exóticos') }}</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#!">{{__('Eventos') }}</a>
                            </li>
                            <li>
                                <a href="#!">{{__('Donaciones') }}</a>
                            </li>
                        </ul>

                    </div>
                    <div class="col-md-3 mb-md-0 mb-3">
                        <h5 class="text-uppercase">{{__('Información') }}</h5>
                        <ul class="list-unstyled">
                            <li>
                                <a href="{{url('/informacion/conocenos')}}">{{__('Conocenos') }}</a>
                            </li>
                            <li>
                                <a href="{{url('/informacion/adoptar')}}">{{__('¿Por qué adoptar?') }}</a>
                            </li>
                            <li>
                                <a href="#!">{{__('¿Qué son las donaciones?') }}</a>
                            </li>
                            <li>
                                <a href="#!">{{__('¿En que les puedes ayudar?') }}</a>
                            </li>
                        </ul>
                        <hr>
                        <h5 class="text-uppercase">{{__('Redes') }}</h5>
                        <a href="https://facebook.com/" target="_blank" title="Facebook"><img id="facebook" src="/img/web/icons/facebook.svg" class="redes"></a>
                        <a href="https://www.instagram.com/" target="_blank" title="Instagram"><img id="instagram" src="/img/web/icons/instagram.svg" class="redes"></a>
                        <a href="https://twitter.com/" target="_blank" title="Twitter"><img id="twitter" src="/img/web/icons/twitter.svg" class="redes"></a>
                    </div>
                </div>

            </div>
            <div class="footer-copyright text-center py-3">{{__('© 2020 Copyright:') }}
                <a href="https://localhost.ilovepet/"> {{__('ILovePet') }}</a>
            </div>
        </footer>



        <script>
            /*Para cargar el api para la dirección */
            var map = L.map('map').
            setView([39.4735858, -0.4090515],
                    18);
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19
            }).addTo(map);
            L.control.scale().addTo(map);
            L.marker([39.4735858, -0.4090515],{draggable: false}).addTo(map);



        </script>

    </body>
</html>