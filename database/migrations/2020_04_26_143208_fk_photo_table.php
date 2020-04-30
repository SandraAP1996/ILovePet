<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkPhotoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('photo', function (Blueprint $table) {
            $table->foreign('id_evento')->references('id')->on('event')->onDelete('cascade');
            $table->foreign('id_persona')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_animal')->references('id')->on('animal')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('photo', function (Blueprint $table) {
            $table->dropForeign('photo_id_evento_foreign');
            $table->dropForeign('photo_id_persona_foreign');
            $table->dropForeign('photo_id_animal_foreign');
        });
    }
}
