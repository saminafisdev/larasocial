<?php

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/', function () {
        $posts = Post::with(['profile.user', 'comments.profile'])->latest()->get();

        // Add human readable updated_at to each post
        $posts->transform(function ($post) {
            $post->updated_at_human = $post->updated_at->diffForHumans();
            return $post;
        });
        return Inertia::render('feed', [
            'posts' => $posts,
        ]);
    })->name('feed');

    Route::get('/{username}/posts/{post}', function ($username, Post $post) {
        $post->load(['profile.user', 'comments.profile']);
        if ($post->profile->username !== $username) {
            abort(404);
        }

        $post->updated_at_human = $post->updated_at->diffForHumans();

        return Inertia::render('post', [
            'post' => $post,
        ]);
    })->name('posts.show');

    Route::post('/posts', function () {
        $validated = request()->validate([
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'profile_id' => Auth::user()->profile->id,
            'content' => $validated['content'],
        ]);

        return redirect()->route('feed');
    })->name('posts.store');

    Route::delete('/posts/{post}', function (Post $post) {
        if ($post->profile->user_id !== Auth::id()) {
            abort(403);
        }

        $post->delete();
        return redirect()->route('feed');
    })->name('posts.destroy');

    // Comments
    Route::post('/{username}/posts/{post}/comments', function (String $username, Post $post) {
        $validated = request()->validate([
            'content' => 'required|string',
        ]);

        Comment::create([
            'content'=> $validated['content'],
            'profile_id' => Auth::user()->profile->id,
            'post_id' => $post->id,
        ]);

        return redirect()->route('posts.show', ['username'=> $username, 'post'=> $post->id]);
    });

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
