<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('provincia',25)->nullable();
            $table->string('localidad',25)->nullable();
            $table->string('calle',25)->nullable();
            $table->integer('cod_postal')->length(5)->nullable();
            $table->integer('numero')->length(3)->nullable();
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
        Schema::dropIfExists('address');
    }
}
