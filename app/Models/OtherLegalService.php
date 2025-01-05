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

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
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
