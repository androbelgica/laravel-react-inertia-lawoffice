<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lawyer extends Model
{
    /** @use HasFactory<\Database\Factories\LawyerFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'phone_number',
        'email',
        'created_by',
        'updated_by',

    ];

    public function lawsuits()
    {
        return $this->hasMany(Lawsuit::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
