<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class LawsuitTaskResource extends JsonResource
{
    /**
     * Transform the resource into an array  .
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'task_name' => $this->task_name,
            'description' => $this->description,
            'priority' => $this->priority,
            'status' => $this->status,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'lawsuit' => new LawsuitResource($this->lawsuit),
            'assigned_to' => $this->assigned_to ? new UserResource($this->assigned_to) : null,
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'created_at' => $this->created_at,

        ];
    }
}
