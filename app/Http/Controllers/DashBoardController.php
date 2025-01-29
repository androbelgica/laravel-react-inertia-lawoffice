<?php

namespace App\Http\Controllers;

use App\Http\Resources\LawsuitTaskResource;
use App\Http\Resources\OtherLegalServiceTaskResource;
use App\Models\LawsuitTask;
use App\Models\OtherLegalServiceTask;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $totalPendingTasks = LawsuitTask::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = LawsuitTask::query()
            ->where('status', 'pending')
            ->where('user_id', $user->id)
            ->count();

        $totalProgressTasks = LawsuitTask::query()
            ->where('status', 'in_progress')
            ->count();
        $myProgressTasks = LawsuitTask::query()
            ->where('status', 'in_progress')
            ->where('user_id', $user->id)
            ->count();

        $totalCompletedTasks = LawsuitTask::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = LawsuitTask::query()
            ->where('status', 'completed')
            ->where('user_id', $user->id)
            ->count();

        $activeTasks = LawsuitTask::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('user_id', $user->id)
            ->limit(10)
            ->get();
        $activeTasks = LawsuitTaskResource::collection($activeTasks);

        // OtherLegalServiceTask logic
        $totalPendingOtherTasks = OtherLegalServiceTask::query()
            ->where('status', 'pending')
            ->count();
        $myPendingOtherTasks = OtherLegalServiceTask::query()
            ->where('status', 'pending')
            ->where('user_id', $user->id)
            ->count();

        $totalProgressOtherTasks = OtherLegalServiceTask::query()
            ->where('status', 'in_progress')
            ->count();
        $myProgressOtherTasks = OtherLegalServiceTask::query()
            ->where('status', 'in_progress')
            ->where('user_id', $user->id)
            ->count();

        $totalCompletedOtherTasks = OtherLegalServiceTask::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedOtherTasks = OtherLegalServiceTask::query()
            ->where('status', 'completed')
            ->where('user_id', $user->id)
            ->count();

        $activeOtherTasks = OtherLegalServiceTask::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('user_id', $user->id)
            ->limit(10)
            ->get();
        $activeOtherTasks = OtherLegalServiceTaskResource::collection($activeOtherTasks);

        // Fetch all tasks for scheduler
        $lawsuitTasks = LawsuitTask::all();
        $otherLegalServiceTasks = OtherLegalServiceTask::all();

        return inertia(
            'Dashboard',
            [
                'totalPendingTasks' => $totalPendingTasks,
                'myPendingTasks' => $myPendingTasks,
                'totalProgressTasks' => $totalProgressTasks,
                'myProgressTasks' => $myProgressTasks,
                'totalCompletedTasks' => $totalCompletedTasks,
                'myCompletedTasks' => $myCompletedTasks,
                'activeTasks' => $activeTasks,
                'totalPendingOtherTasks' => $totalPendingOtherTasks,
                'myPendingOtherTasks' => $myPendingOtherTasks,
                'totalProgressOtherTasks' => $totalProgressOtherTasks,
                'myProgressOtherTasks' => $myProgressOtherTasks,
                'totalCompletedOtherTasks' => $totalCompletedOtherTasks,
                'myCompletedOtherTasks' => $myCompletedOtherTasks,
                'activeOtherTasks' => $activeOtherTasks,
                'lawsuit_tasks' => LawsuitTaskResource::collection($lawsuitTasks)->resolve(),
                'other_legal_service_tasks' => OtherLegalServiceTaskResource::collection($otherLegalServiceTasks)->resolve(),
            ]
        );
    }
}
