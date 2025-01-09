<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lawsuit extends Model
{
    /** @use HasFactory<\Database\Factories\LawsuitFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'case_number',
        'case_type',
        'case_status',
        'client_id',
        'lawyer_id',
        'created_by',
    ];

    public function lawsuit_tasks()
    {
        return $this->hasMany(LawsuitTask::class);
    }

    public function lawsuitTasks()
    {
        return $this->hasMany(LawsuitTask::class);
    }

    public function lawyer()
    {
        return $this->belongsTo(Lawyer::class, 'lawyer_id');
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
