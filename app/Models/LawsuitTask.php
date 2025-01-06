<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LawsuitTask extends Model
{
    /** @use HasFactory<\Database\Factories\LawsuitTaskFactory> */
    use HasFactory;

    public function lawsuit()
    {
        return $this->belongsTo(Lawsuit::class);
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
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
