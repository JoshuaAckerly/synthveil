<?php

use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\ReleaseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::resource('releases', ReleaseController::class)->except(['show']);
    Route::resource('events', EventController::class)->except(['show']);
    Route::resource('contacts', ContactController::class)->only(['index', 'show', 'destroy']);
});