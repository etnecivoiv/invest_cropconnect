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

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug');
            $table->string('preview')->nullable();
            $table->string('cover_image')->nullable();
            $table->text('address')->nullable();
            $table->integer('total_units')->default(1);
            $table->double('invest_amount')->nullable();
            $table->dateTime('expire_date')->nullable();
            $table->tinyInteger('status')->default(1)->comment('1 -> active, 0 -> Inactive');
            $table->boolean('accept_new_investor')->default(1)->comment('1 accept, 0 not accept');
            $table->longText('meta')->nullable();
            $table->longText('faqs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
