<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/', function () {
        return Inertia::render('feed');
    })->name('feed');


    Route::get('/friends', function () {
        return Inertia::render('friends');
    })->name('friends');

    Route::get('/messages', function () {
        return Inertia::render('messages');
    })->name('messages');

    Route::get('/@johndoe', function () {
        return Inertia::render('profile');
    })->name('profile');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
