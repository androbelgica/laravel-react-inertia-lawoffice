<?php

namespace App\Http\Controllers;

use App\Models\LawsuitTask;
use App\Http\Resources\LawsuitTaskResource;
use App\Http\Requests\StoreLawsuitTaskRequest;
use App\Http\Requests\UpdateLawsuitTaskRequest;

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
    public function store(StoreLawsuitTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LawsuitTask $lawsuitTask)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LawsuitTask $lawsuitTask)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLawsuitTaskRequest $request, LawsuitTask $lawsuitTask)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LawsuitTask $lawsuitTask)
    {
        //
    }
}
