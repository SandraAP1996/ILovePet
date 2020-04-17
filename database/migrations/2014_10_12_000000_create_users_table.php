<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nif');
            $table->string('nombre')->unique();
            $table->string('apellidos')->nullable();
            $table->integer('telefono')->nullable();
            $table->enum('rol', ['Usuario', 'Empleado']);
            $table->enum('tipo', ['Adoptante', 'Voluntario', 'Casa de Acogida'])->nullable();
            $table->date('fecha_nacimiento')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
