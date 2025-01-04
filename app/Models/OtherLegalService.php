<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherLegalService extends Model
{
    /** @use HasFactory<\Database\Factories\OtherLegalServiceFactory> */
    use HasFactory;

    public function otherLegalServiceTasks()
    {
        return $this->hasMany(OtherLegalServiceTask::class);
    }
}
