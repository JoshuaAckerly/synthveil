<?php

use App\Http\Controllers\ContactController;
use App\Models\Event;
use App\Models\Release;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/music', function () {
    $releases = Release::orderBy('release_date', 'desc')->get();

    return Inertia::render('music', ['releases' => $releases]);
})->name('music');

Route::get('/events', function () {
    $events = Event::orderBy('event_date', 'desc')->get();

    return Inertia::render('events', ['events' => $events]);
})->name('events');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:contact')->name('contact.store');

Route::redirect('/register', '/', 301);
Route::redirect('/forgot-password', '/', 301);
Route::redirect('/reset-password', '/', 301);
Route::redirect('/reset-password/*', '/', 301);
Route::redirect('/email-verification', '/', 301);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
