<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class LawsuitResource extends JsonResource
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
            'title' => $this->title,
            'case_number' => $this->case_number,
            'case_type' => $this->case_type,
            'case_status' => $this->case_status,
            'court_name' => $this->court_name,
            'open_date' => (new Carbon($this->open_date))->format('Y-m-d'),
            'close_date' => (new Carbon($this->close_date))->format('Y-m-d'),
            'lawyer' => new LawyerResource($this->lawyer),
            'client' => new ClientResource($this->client),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
