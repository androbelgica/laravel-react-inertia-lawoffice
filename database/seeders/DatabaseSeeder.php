<?php

namespace Database\Seeders;

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
            'email_verified_at' => now(),
        ]);

        // Other tables will remain empty
    }
}
