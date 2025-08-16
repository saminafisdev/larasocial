<?php

use App\Http\Controllers\ChatController;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Profile;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Feed
    // Mahfuj
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

    // Post detail
    Route::get('/{username}/posts/{post}', function ($username, Post $post) {
        $post->load([
            'profile.user',
            'comments.profile.user'
        ]);

        if ($post->profile->username !== $username) {
            abort(404);
        }

        $post->updated_at_human = $post->updated_at->diffForHumans();
        $post->comments->transform(function ($comment) {
            $comment->updated_at_human = $comment->updated_at->diffForHumans();
            return $comment;
        });

        return Inertia::render('post', [
            'post' => $post,
        ]);
    })->name('posts.show');

    // Create a new post
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

    // Delete a post
    Route::delete('/posts/{post}', function (Post $post) {
        if ($post->profile->user_id !== Auth::id()) {
            abort(403);
        }

        $post->delete();
        return redirect()->route('feed');
    })->name('posts.destroy');

    // Likes
    Route::post('/posts/{post}/like', function (Post $post) {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }

        $profileId = $user->profile->id;
        $like = $post->likes()->where('profile_id', $profileId)->first();

        if ($like) {
            // Unlike the post
            $like->delete();
        } else {
            // Like the post
            $post->likes()->create(['profile_id' => $profileId]);
        }

        return back();
    })->name('posts.like');

    // Comments
    Route::post('/{username}/posts/{post}/comments', function (String $username, Post $post) {
        $validated = request()->validate([
            'content' => 'required|string',
        ]);

        Comment::create([
            'content' => $validated['content'],
            'profile_id' => Auth::user()->profile->id,
            'post_id' => $post->id,
        ]);

        return redirect()->route('posts.show', ['username' => $username, 'post' => $post->id]);
    });

    Route::get('/friends', function () {
        return Inertia::render('friends');
    })->name('friends');

    // Messages
    // Route::get('/messages', function () {
    //     return Inertia::render('messages');
    // })->name('messages');

    Route::get('/chat', [ChatController::class, 'index'])->name('chat');

    Route::get('/chat/{otherProfile:username}', [ChatController::class, 'show'])->name('chat.show');

    // Route to send a message to a specific receiver profile
    // {receiverProfile} will be route-model bound to a Profile instance
    Route::post('/chat/{receiverProfile}/send', [ChatController::class, 'store'])->name('chat.store');


    // Profile
    Route::get('/@{username}', function ($username) {
        $profile = Profile::with(['user'])->where('username', $username)->firstOrFail();
        $posts = $profile->posts()->with(['profile.user'])->withCount(['likes', 'comments'])->latest()->get();
        return Inertia::render('profile', [
            'profile' => $profile,
            'posts' => $posts
        ]);
    })->name('profile');


    // Bookmark
    Route::post('/posts/{post}/bookmark', function (Post $post) {
        $user = Auth::user();

        $profileId = $user->profile->id;
        $bookmark = $post->bookmarks()->where('profile_id', $profileId)->first();

        if ($bookmark) {
            // Remove bookmark
            $bookmark->delete();
        } else {
            // Add bookmark
            $post->bookmarks()->create(['profile_id' => $profileId]);
        }

        return back();
    })->name('posts.bookmark');

    Route::get('/bookmarks', function () {
        $user = Auth::user();

        $bookmarks = $user->profile->bookmarks()->with(['post.profile.user'])->latest()->get();

        return Inertia::render('bookmarks', [
            'bookmarks' => $bookmarks,
        ]);
    })->name('bookmarks');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
