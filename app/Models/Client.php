<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;
    public function lawsuits()
    {
        return $this->hasMany(Lawsuit::class);
    }

    public function otherlegalservices()
    {
        return $this->hasMany(OtherLegalService::class);
    }
}
