<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OtherLegalService>
 */
class OtherLegalServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'date_started' => $this->faker->dateTime,
            'date_ended' => $this->faker->dateTime,
            'progress_status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
            'client_id' => \App\Models\Client::factory(),
            'created_by' => \App\Models\User::factory(),
            'updated_by' => \App\Models\User::factory(),
        ];
    }
}
