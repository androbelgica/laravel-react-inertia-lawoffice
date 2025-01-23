<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherLegalService extends Model
{
    /** @use HasFactory<\Database\Factories\OtherLegalServiceFactory> */
    use HasFactory;
    protected $fillable = [
        'client_id',
        'service_name',
        'description',
        'date_started',
        'date_ended',
        'progress_status',
        'created_by',
        'updated_by',

    ];



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

    public function tasks()
    {
        return $this->hasMany(OtherLegalServiceTask::class, 'other_legal_service_id');
    }
}
