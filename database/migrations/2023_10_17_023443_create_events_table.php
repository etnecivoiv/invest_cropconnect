<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->string('preview')->nullable();
            $table->string('slug')->nullable();
            $table->dateTime('start_at');
            $table->string('location')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->integer('total_seat')->nullable();
            $table->string('seat_prefix')->nullable()->default('seat');
            $table->integer('seat_limit')->default(1); // per user
            $table->boolean('is_free')->default(0);
            $table->double('fee_amount')->default(0);
            $table->boolean('is_active')->default(1);
            $table->text('guests')->nullable();
            $table->text('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
