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

        Schema::create('project_durations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->integer('duration');
            $table->string('duration_type');
            $table->double('min_profit_return')->nullable();
            $table->double('max_profit_return')->nullable();
            $table->double('loss_min_range')->nullable();
            $table->double('loss_max_range')->nullable();
            $table->enum('return_type', ['fixed', 'percent']);
            $table->tinyInteger('status')->default(1)->comment('1 -> active, 0 -> Inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_durations');
    }
};
