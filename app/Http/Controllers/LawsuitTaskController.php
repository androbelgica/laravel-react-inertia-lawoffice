<?php

namespace App\Http\Controllers;

use App\Models\LawsuitTask;
use App\Models\User;
use App\Models\Lawsuit;
use App\Http\Resources\LawsuitTaskResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\LawsuitResource;
use App\Http\Requests\StoreLawsuitTaskRequest;
use App\Http\Requests\UpdateLawsuitTaskRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LawsuitTaskController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = LawsuitTask::query();

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


        $lawsuit_tasks = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);


        return inertia('LawsuitTask/Index', [
            "lawsuit_tasks" => LawsuitTaskResource::collection($lawsuit_tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('LawsuitTask/Create', [
            'lawsuits' => Lawsuit::orderBy('title', 'asc')->get(),
            'users' => User::orderBy('name', 'asc')->get(),
            'lawsuit_id' => request('lawsuit_id'), // Pass lawsuit_id to the view
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLawsuitTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        LawsuitTask::create($data);

        return to_route('lawsuit-tasks.index')->with('success', 'Lawsuit Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(LawsuitTask $lawsuitTask)
    {
        $query = $lawsuitTask->lawsuit->lawsuit_tasks();

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

        $lawsuit_tasks = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Lawsuit/Show', [

            "lawsuit_tasks" => new LawsuitTaskResource($lawsuit_tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LawsuitTask $lawsuitTask)
    {
        $users = User::query()->orderBy('name', 'asc')->get();
        $lawsuits = Lawsuit::orderBy('title', 'asc')->get();
        return inertia('LawsuitTask/Edit', [
            'lawsuitTask' => new LawsuitTaskResource($lawsuitTask),
            'users' => UserResource::collection($users),
            'lawsuits' => LawsuitResource::collection($lawsuits),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLawsuitTaskRequest $request, LawsuitTask $lawsuitTask)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $lawsuitTask->update($data);

        return to_route('lawsuit-tasks.index')->with('success', 'Lawsuit Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LawsuitTask $lawsuitTask)
    {
        $title = $lawsuitTask->title;
        $lawsuitTask->delete();
        return to_route('lawsuit-tasks.index')->with(
            'success',
            "Lawsuit Task \"$title\" was deleted successfully"
        );
    }

    /**
     * Fetch all lawsuit tasks.
     */
    public function fetchAll()
    {
        $tasks = LawsuitTask::all();
        return LawsuitTaskResource::collection($tasks);
    }
}
