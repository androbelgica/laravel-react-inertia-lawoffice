<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'role' => $this->role,
            'avatar' => $this->avatar,
            'phone' => $this->phone,
            'address' => $this->address,
            'email' => $this->email,
            "created_at" => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),


        ];
    }
}
