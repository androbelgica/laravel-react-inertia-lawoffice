<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class OtherLegalServiceTaskResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
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
            'other_legal_service_id' => $this->other_legal_service_id,
            'user_id' => $this->user_id,
            'other_legal_service' => new OtherLegalServiceResource($this->otherLegalService),
            'user' => new UserResource($this->user),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'user_name' => $this->user->name, // Ensure user_name is included
        ];
    }
}
