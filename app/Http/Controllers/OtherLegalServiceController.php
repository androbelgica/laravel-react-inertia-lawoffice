<?php

namespace App\Http\Controllers;

use App\Models\OtherLegalService;
use App\Http\Requests\StoreOtherLegalServiceRequest;
use App\Http\Requests\UpdateOtherLegalServiceRequest;
use App\Http\Resources\OtherLegalServiceResource;

class OtherLegalServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = OtherLegalService::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('service_name')) {
            $query->where('service_name', 'like', '%' . request('service_name') . '%');
        }

        if (request('progress_status')) {
            $query->where('progress_status', 'like', '%' . request('progress_status') . '%');
        }

        $other_services = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('OtherLegalServices/Index', [
            'other_services' => OtherLegalServiceResource::collection($other_services),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOtherLegalServiceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(OtherLegalService $otherLegalService)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OtherLegalService $otherLegalService)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOtherLegalServiceRequest $request, OtherLegalService $otherLegalService)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OtherLegalService $otherLegalService)
    {
        //
    }
}
