<?php

namespace App\Http\Controllers;

use App\Models\OtherLegalService;
use App\Models\Client;
use App\Models\User;
use App\Http\Resources\ClientResource;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreOtherLegalServiceRequest;
use App\Http\Requests\UpdateOtherLegalServiceRequest;
use App\Http\Resources\OtherLegalServiceResource;
use App\Http\Resources\OtherLegalServiceTaskResource;
use Illuminate\Support\Facades\Auth;

class OtherLegalServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = OtherLegalService::query();

        $sortFields = request('sort_field', 'created_at');
        $sortDirections = request('sort_direction', 'desc');

        if (request('service_name')) {
            $query->where('service_name', 'like', '%' . request('service_name') . '%');
        }

        if (request('progress_status')) {
            $query->where('progress_status', 'like', '%' . request('progress_status') . '%');
        }

        $other_services = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('OtherLegalServices/Index', [
            'other_services' => OtherLegalServiceResource::collection($other_services),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('OtherLegalServices/Create', [
            'clients' => Client::all(),
            'users' => User::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOtherLegalServiceRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        OtherLegalService::create($data);

        return to_route('other-legal-services.index')->with('success', 'Other Legal Service created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(OtherLegalService $otherLegalService)
    {
        $query = $otherLegalService->tasks();

        $sortFields = request("sort_field", "created_at");
        $sortDirections = request("sort_direction", "desc");

        if (request('task_name')) {
            $query->where('task_name', 'like', '%' . request('task_name') . '%');
        }

        if (request('priority')) {
            $query->where('priority', 'like', '%' . request('priority') . '%');
        }

        if (request('status')) {
            $query->where('status', 'like', '%' . request('status') . '%');
        }

        $other_legal_service_tasks = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('OtherLegalServices/Show', [
            'success' => session('success'),
            'other_service' => new OtherLegalServiceResource($otherLegalService),
            'other_legal_service_tasks' => OtherLegalServiceTaskResource::collection($other_legal_service_tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OtherLegalService $otherLegalService)
    {
        $clients = Client::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();
        return inertia('OtherLegalServices/Edit', [
            'other_service' => new OtherLegalServiceResource($otherLegalService),
            'clients' => ClientResource::collection($clients),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOtherLegalServiceRequest $request, OtherLegalService $other_services)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $other_services->update($data);

        return to_route('other-legal-services.index')->with('success', 'Other Legal Service updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OtherLegalService $other_services)
    {
        $serviceName = $other_services->service_name;
        $other_services->delete();
        return to_route('other-legal-services.index')->with(
            'success',
            "Other Legal Service \"$serviceName\" was deleted successfully"
        );
    }
}
