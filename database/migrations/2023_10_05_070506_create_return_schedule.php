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
        Schema::create('return_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_duration_id')->constrained()->cascadeOnDelete();
            $table->enum('return_type', ['fixed', 'percent'])->default('fixed');
            $table->enum('profit_type', ['profit', 'loss']);
            $table->double('amount');
            $table->string('attachment')->nullable();
            $table->date('return_date')->nullable();
            $table->tinyInteger('status')->default(0)->comment('1 -> executed, 0 -> Pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('return_schedules');
    }
};
