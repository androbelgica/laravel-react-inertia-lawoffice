<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lawsuit extends Model
{
    /** @use HasFactory<\Database\Factories\LawsuitFactory> */
    use HasFactory;
    public function lawsuitTasks()
    {
        return $this->hasMany(LawsuitTask::class);
    }
}
