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
        Schema::create('other_legal_service_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task_name');
            $table->text('description')->nullable();
            $table->timestamp('due_date');
            $table->enum('status', ['pending', 'in_progress', 'completed']);
            $table->enum('priority', ['low', 'medium', 'high']);
            $table->foreignId('other_legal_service_id')->constrained('other_legal_services');
            $table->foreignId('user_id')->constrained('users'); // changed line
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
        Schema::dropIfExists('other_legal_service_tasks');
    }
};
