<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LawyerController;
use App\Http\Controllers\LawsuitController;
use App\Http\Controllers\OtherLegalServiceController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\LawsuitTaskController;
use App\Http\Controllers\OtherLegalServiceTaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SchedulerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
        ->name('dashboard');

    Route::resource('clients', ClientController::class);
    Route::resource('lawyers', LawyerController::class);
    Route::resource('lawsuits', LawsuitController::class);
    Route::resource('other-legal-services', OtherLegalServiceController::class);
    Route::resource('appointments', AppointmentController::class);
    Route::resource('lawsuit-tasks', LawsuitTaskController::class);
    Route::resource('other-legal-service-tasks', OtherLegalServiceTaskController::class);
    Route::resource('users', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Update the routes to avoid conflicts
Route::get('/scheduler/lawsuit-tasks', [SchedulerController::class, 'fetchLawsuitTasks'])->name('scheduler.fetchLawsuitTasks');
Route::get('/scheduler/other-legal-service-tasks', [SchedulerController::class, 'fetchOtherLegalServiceTasks'])->name('scheduler.fetchOtherLegalServiceTasks');

require __DIR__ . '/auth.php';
