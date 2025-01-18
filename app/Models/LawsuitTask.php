<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LawsuitTask extends Model
{
    /** @use HasFactory<\Database\Factories\LawsuitTaskFactory> */
    use HasFactory;
    protected $fillable = [
        'task_name',
        'description',
        'priority',
        'status',
        'due_date',
        'lawsuit_id',
        'user_id',
        'created_by',
        'updated_by',
    ];

    public function lawsuit()
    {
        return $this->belongsTo(Lawsuit::class);
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
