<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LawsuitTaskController;
use App\Http\Controllers\OtherLegalServiceTaskController;
// ...existing code...

// Remove scheduler routes
// Route::get('/scheduler/lawsuit-tasks', [SchedulerController::class, 'fetchLawsuitTasks'])->name('scheduler.fetchLawsuitTasks');
// Route::get('/scheduler/other-legal-service-tasks', [SchedulerController::class, 'fetchOtherLegalServiceTasks'])->name('scheduler.fetchOtherLegalServiceTasks');
// Route::post('/scheduler/add-task', [SchedulerController::class, 'addTask'])->name('scheduler.addTask');
// Route::post('/scheduler/update-task', [SchedulerController::class, 'updateTask'])->name('scheduler.updateTask');
// Route::post('/scheduler/delete-task', [SchedulerController::class, 'deleteTask'])->name('scheduler.deleteTask');
