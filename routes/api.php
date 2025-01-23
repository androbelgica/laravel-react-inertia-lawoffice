<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LawsuitTaskController;
use App\Http\Controllers\OtherLegalServiceTaskController;
use App\Http\Controllers\SchedulerController;
// ...existing code...

Route::get('/lawsuit-tasks', [SchedulerController::class, 'fetchLawsuitTasks'])->name('scheduler.fetchLawsuitTasks');
Route::get('/other-legal-service-tasks', [SchedulerController::class, 'fetchOtherLegalServiceTasks'])->name('scheduler.fetchOtherLegalServiceTasks');
