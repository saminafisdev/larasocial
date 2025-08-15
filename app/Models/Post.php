<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    protected $fillable = [
        'profile_id',
        'content',
    ];

    protected $appends = ['is_liked']; // Auto-include in JSON

    // Always load counts
    protected $withCount = ['likes', 'comments'];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
    }

    // Accessor for current user's like
    public function getIsLikedAttribute()
    {
        if (!Auth::check()) {
            return false;
        }

        return $this->likes()->where('profile_id', Auth::user()->profile->id)->exists();
    }
}
