<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('damage_reports', function (Blueprint $table) {
            $table->id();

            $table->string('report_number')->unique();

            // Person who submitted the report
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // Location
            $table->foreignId('building_id')
                ->constrained('buildings')
                ->restrictOnDelete();

            $table->foreignId('room_id')
                ->constrained('rooms')
                ->restrictOnDelete();

            // Damaged property
            $table->string('property_name');

            // Damage description
            $table->text('description');

            // Report priority
            $table->enum('priority', [
                'low',
                'medium',
                'high',
                'urgent',
            ])->default('medium');

            // Report workflow
            $table->enum('status', [
                'pending',
                'verified',
                'assigned',
                'in_progress',
                'completed',
                'rejected',
            ])->default('pending');

            $table->timestamp('reported_at')->useCurrent();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('damage_reports');
    }
};