<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lawsuit>
 */
class LawsuitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->word,
            'case_number' => $this->faker->unique()->numerify('CASE-#####'),
            'case_type' => $this->faker->randomElement([
                'criminal',
                'civil',
                'administrative',
                'election',
                'labor',
                'tax',
                'environmental',
                'intellectual property'
            ]),
            'case_status' => $this->faker->randomElement(['pending', 'decided', 'dismissed', 'appealed', 'remanded', 'settled', 'withdrawn']),
            'court_name' => $this->faker->word,
            'open_date' => $this->faker->dateTime,
            'close_date' => $this->faker->dateTime,
            'lawyer_id' => \App\Models\Lawyer::factory(),
            'client_id' => \App\Models\Client::factory(),
            'created_by' => \App\Models\User::factory(),
            'updated_by' => \App\Models\User::factory(),
        ];
    }
}
