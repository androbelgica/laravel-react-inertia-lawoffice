<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherLegalServiceTask extends Model
{
    /** @use HasFactory<\Database\Factories\OtherLegalServiceTaskFactory> */
    use HasFactory;

    protected $fillable = [
        'task_name',
        'description',
        'priority',
        'status',
        'due_date',
        'other_legal_service_id',
        'user_id',
        'created_by',
        'updated_by',
    ];

    public function otherLegalService()
    {
        return $this->belongsTo(OtherLegalService::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
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
