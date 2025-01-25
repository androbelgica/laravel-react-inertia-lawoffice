<?php

namespace App\Http\Controllers;

use App\Models\OtherLegalServiceTask;
use App\Models\User;
use App\Models\OtherLegalService;
use App\Http\Resources\OtherLegalServiceTaskResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\OtherLegalServiceResource;
use App\Http\Requests\StoreOtherLegalServiceTaskRequest;
use App\Http\Requests\UpdateOtherLegalServiceTaskRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OtherLegalServiceTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = OtherLegalServiceTask::query();

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

        return inertia('OtherLegalServicesTask/Index', [
            "other_legal_service_tasks" => OtherLegalServiceTaskResource::collection($other_legal_service_tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('OtherLegalServicesTask/Create', [
            'other_legal_services' => OtherLegalService::orderBy('service_name', 'asc')->get(),
            'users' => User::orderBy('name', 'asc')->get(),
            'other_legal_service_id' => request('other_legal_service_id'), // Pass other_legal_service_id to the view
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOtherLegalServiceTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        OtherLegalServiceTask::create($data);

        return to_route('other-legal-service-tasks.index')->with('success', 'Other Legal Service Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(OtherLegalServiceTask $otherLegalServiceTask)
    {
        $query = $otherLegalServiceTask->otherLegalService->other_legal_service_tasks();

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
            "other_legal_service_tasks" => OtherLegalServiceTaskResource::collection($other_legal_service_tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'other_service' => new OtherLegalServiceResource($otherLegalServiceTask->otherLegalService), // Ensure other_service is passed
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OtherLegalServiceTask $otherLegalServiceTask)
    {
        $users = User::query()->orderBy('name', 'asc')->get();
        $other_legal_services = OtherLegalService::orderBy('title', 'asc')->get();
        return inertia('OtherLegalServicesTask/Edit', [
            'otherLegalServiceTask' => new OtherLegalServiceTaskResource($otherLegalServiceTask),
            'users' => UserResource::collection($users),
            'other_legal_services' => OtherLegalServiceResource::collection($other_legal_services),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOtherLegalServiceTaskRequest $request, OtherLegalServiceTask $otherLegalServiceTask)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $otherLegalServiceTask->update($data);

        return to_route('other-legal-service-tasks.index')->with('success', 'Other Legal Service Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OtherLegalServiceTask $otherLegalServiceTask)
    {
        $title = $otherLegalServiceTask->title;
        $otherLegalServiceTask->delete();
        return to_route('other-legal-service-tasks.index')->with(
            'success',
            "Other Legal Service Task \"$title\" was deleted successfully"
        );
    }

    /**
     * Fetch all other legal service tasks.
     */
    public function fetchAll()
    {
        $tasks = OtherLegalServiceTask::all();
        return OtherLegalServiceTaskResource::collection($tasks);
    }
}
