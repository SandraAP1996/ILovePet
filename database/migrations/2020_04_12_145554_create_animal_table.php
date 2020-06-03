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
            $table->string('nombre',25);
            $table->integer('chip')->length(11)->nullable();
            $table->string('raza',40);
            $table->enum('tipo', ['Doméstico', 'Exótico', 'Granja']);
            $table->enum('especie', ['Perro', 'Gato', 'Pájaro', 'Reptil', 'Roedor', 'Ganado', 'Equino']);
            $table->string('descripcion',400)->nullable();
            $table->enum('sexo', ['Hembra', 'Macho'])->nullable();
            $table->enum('talla', ['Pequeña', 'Media','Grande']);
            $table->enum('edad', ['Cachorro', 'Joven','Adulto']);
            $table->date('fecha_nacimiento')->nullable();
            $table->enum('situacion', ['centro', 'acogida', 'adoptado'])->nullable();
            $table->enum('estado', ['urgente', 'normal', 'nuevo']);
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
