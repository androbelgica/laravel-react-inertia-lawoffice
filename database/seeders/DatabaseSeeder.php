<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Client;
use App\Models\Lawsuit;
use App\Models\LawsuitTask;
use App\Models\Lawyer;
use App\Models\OtherLegalService;
use App\Models\OtherLegalServiceTask;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Andsmarian',
            'role' => 'admin',
            'phone_number' => '081234567890',
            'address' => 'Jl. Lorem Ipsum Dolor Sit Amet',
            'email' => 'test@example.com',
            'password' => bcrypt('andsmarian0305'),
            'is_default_password' => '0',
        ]);


        // Client::factory(10)
        //     ->hasLawsuits(5)
        //     ->hasOtherLegalServices(5)
        //     ->create([
        //         'created_by' => User::first()->id,
        //         'updated_by' => User::first()->id,
        //     ]);

        // Lawyer::factory(10)
        //     ->hasLawsuits(5)
        //     ->hasAppointments(5)
        //     ->create([
        //         'created_by' => User::first()->id,
        //         'updated_by' => User::first()->id,
        //     ]);

        // Lawsuit::factory(5)
        //     ->hasLawsuitTasks(5)
        //     ->create([
        //         'created_by' => User::first()->id,
        //         'updated_by' => User::first()->id,
        //     ]);

        // OtherLegalService::factory(5)
        //     ->hasOtherLegalServiceTasks(5)
        //     ->create([
        //         'created_by' => User::first()->id,
        //         'updated_by' => User::first()->id,
        //     ]);

        // Appointment::factory(5)
        //     ->create([
        //         'created_by' => User::first()->id,
        //         'updated_by' => User::first()->id,
        //     ]);

        // LawsuitTask::factory(5)
        //     ->create([
        //         'created_by' => User::first()->id,
        //         'updated_by' => User::first()->id,
        //     ]);

        // OtherLegalServiceTask::factory(5)
        //     ->create([
        //         'created_by' => User::first()->id,
        //         'updated_by' => User::first()->id,
        //     ]);
    }
}
