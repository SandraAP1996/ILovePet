<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnimalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animal', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre')->nullable();
            $table->integer('chip')->nullable();
            $table->string('raza')->nullable();
            $table->enum('tipo', ['Doméstico', 'Exótico', 'Granja'])->nullable();
            $table->enum('especie', ['Perro', 'Gato', 'Pájaro', 'Reptil', 'Roedor', 'Venado', 'Equino'])->nullable();
            $table->enum('sexo', ['Hembra', 'Macho'])->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->enum('situacion', ['centro', 'acogida', 'adoptado'])->nullable();
            $table->enum('nivel', ['urgente', 'normal', 'nuevo'])->nullable();
            $table->bigInteger('id_persona')->nullable()->unsigned();
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
        Schema::dropIfExists('animal');
    }
}
