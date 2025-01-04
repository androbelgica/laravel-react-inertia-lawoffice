<?php

use App\Models\Client;
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
        Schema::create('lawsuits', function (Blueprint $table) {
            $table->id('id');
            $table->string('title');
            $table->string('case_number');
            $table->string('case_type');
            $table->string('case_status');
            $table->string('court_name');
            $table->timestamp('open_date');
            $table->timestamp('close_date')->nullable();
            $table->foreignId('lawyer_id')->constrained('lawyers');
            $table->foreignId('client_id')->constrained('clients');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lawsuits');
    }
};
