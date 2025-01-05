<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class OtherLegalServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'service_name' => $this->service_name,
            'description' => $this->description,
            'progress_status' => $this->progress_status,
            'date_started' => (new Carbon($this->date_started))->format('Y-m-d'),
            'date_ended' => (new Carbon($this->date_ended))->format('Y-m-d'),
            'client' => new ClientResource($this->client),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
