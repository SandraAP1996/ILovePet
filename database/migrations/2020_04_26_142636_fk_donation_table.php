<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkDonationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('donation', function (Blueprint $table) {
            $table->foreign('id_evento')->references('id')->on('event')->onDelete('set null');
            $table->foreign('id_persona')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('donation', function (Blueprint $table) {
            $table->dropForeign('donation_id_evento_foreign');
            $table->dropForeign('donation_id_persona_foreign');
        });
    }
}
