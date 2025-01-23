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
        $tasks = LawsuitTask::all();
        return LawsuitTaskResource::collection($tasks);
    }

    /**
     * Fetch all other legal service tasks.
     */
    public function fetchOtherLegalServiceTasks()
    {
        $tasks = OtherLegalServiceTask::all();
        return OtherLegalServiceTaskResource::collection($tasks);
    }
}
