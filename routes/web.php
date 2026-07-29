<?php

use App\Http\Controllers\ContactController;
use App\Models\Event;
use App\Models\Release;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use League\CommonMark\CommonMarkConverter;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/music', function () {
    $releases = Cache::remember('releases.index', 600, fn () => Release::orderBy('release_date', 'desc')->get());

    return Inertia::render('music', ['releases' => $releases]);
})->name('music');

Route::get('/events', function () {
    $events = Cache::remember('events.index', 600, fn () => Event::orderBy('event_date', 'desc')->get());

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

// Legal pages
Route::get('/privacy', function () {
    $converter = new CommonMarkConverter(['html_input' => 'escape', 'allow_unsafe_links' => false]);
    $markdown = file_get_contents(base_path('legal/PRIVACY_POLICY.md')) ?: '';
    $html = $converter->convert($markdown)->getContent();

    return Inertia::render('legal/Privacy', ['content' => $html]);
})->name('privacy');

Route::get('/terms', function () {
    $converter = new CommonMarkConverter(['html_input' => 'escape', 'allow_unsafe_links' => false]);
    $markdown = file_get_contents(base_path('legal/TERMS_OF_SERVICE.md')) ?: '';
    $html = $converter->convert($markdown)->getContent();

    return Inertia::render('legal/Terms', ['content' => $html]);
})->name('terms');

Route::get('/cookies', function () {
    $converter = new CommonMarkConverter(['html_input' => 'escape', 'allow_unsafe_links' => false]);
    $markdown = file_get_contents(base_path('legal/COOKIE_POLICY.md')) ?: '';
    $html = $converter->convert($markdown)->getContent();

    return Inertia::render('legal/Cookies', ['content' => $html]);
})->name('cookies');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
