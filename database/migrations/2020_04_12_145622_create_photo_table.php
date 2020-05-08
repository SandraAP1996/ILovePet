<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('titulo')->nullable();
            $table->boolean('principal');
            $table->enum('formato', ['jpg', 'png'])->nullable()->nullable();
            $table->enum('ruta', ['animal/', 'evento/', 'perfil/'])->nullable();
            $table->bigInteger('id_persona')->nullable()->unsigned();
            $table->bigInteger('id_animal')->nullable()->unsigned();
            $table->bigInteger('id_evento')->nullable()->unsigned();
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
        Schema::dropIfExists('photo');
    }
}
