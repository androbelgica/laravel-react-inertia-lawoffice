<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lawyer extends Model
{
    /** @use HasFactory<\Database\Factories\LawyerFactory> */
    use HasFactory;

    public function lawsuits()
    {
        return $this->hasMany(Lawsuit::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
