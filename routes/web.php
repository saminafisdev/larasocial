<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
        $profile = \App\Models\Profile::where('user_id', Auth::id())->first();
        return Inertia::render('profile', [
            'profile' => $profile,
        ]);
    })->name('profile');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
