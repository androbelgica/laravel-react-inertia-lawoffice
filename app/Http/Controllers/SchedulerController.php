<?php

namespace App\Http\Controllers;

use App\Models\LawsuitTask;
use App\Models\OtherLegalServiceTask;
use App\Http\Resources\LawsuitTaskResource;
use App\Http\Resources\OtherLegalServiceTaskResource;
use Illuminate\Http\Request;

class SchedulerController extends Controller
{
    /**
     * Fetch all lawsuit tasks.
     */
    public function fetchLawsuitTasks()
    {
        $tasks = LawsuitTask::with('user:id,name')
            ->select('id', 'task_name', 'due_date', 'created_at', 'user_id')
            ->get();
        return inertia('LawsuitTask/Index', [
            'tasks' => LawsuitTaskResource::collection($tasks),
        ]);
    }

    /**
     * Fetch all other legal service tasks.
     */
    public function fetchOtherLegalServiceTasks()
    {
        $tasks = OtherLegalServiceTask::with('user:id,name')
            ->select('id', 'task_name', 'due_date', 'created_at', 'user_id')
            ->get();
        return inertia('OtherLegalServiceTask/Index', [
            'tasks' => OtherLegalServiceTaskResource::collection($tasks),
        ]);
    }
}
