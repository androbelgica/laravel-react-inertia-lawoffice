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
use App\Http\Controllers\DashboardController;
use App\Http\Resources\LawsuitTaskResource;
use App\Http\Resources\OtherLegalServiceTaskResource;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('clients', ClientController::class);
    Route::resource('lawyers', LawyerController::class);
    Route::resource('lawsuits', LawsuitController::class);
    Route::resource('other-legal-services', OtherLegalServiceController::class);
    Route::resource('appointments', AppointmentController::class);
    Route::resource('lawsuit-tasks', LawsuitTaskController::class);
    Route::resource('other-legal-service-tasks', OtherLegalServiceTaskController::class);
    Route::resource('users', UserController::class);

    Route::get('/lawsuit-tasks/fetchAll', [LawsuitTaskController::class, 'fetchAll']);
    Route::get('/other-legal-service-tasks/fetchAll', [OtherLegalServiceTaskController::class, 'fetchAll']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
