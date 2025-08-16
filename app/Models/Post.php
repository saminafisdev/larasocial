<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    protected $fillable = [
        'profile_id',
        'content',
    ];

    protected $appends = ['is_liked', 'is_bookmarked'];

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

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    // Accessor for current user's like
    public function getIsLikedAttribute()
    {
        if (!Auth::check()) {
            return false;
        }

        return $this->likes()->where('profile_id', Auth::user()->profile->id)->exists();
    }



    public function getIsBookmarkedAttribute()
    {
        if (!Auth::check()) return false;

        $profileId = Auth::user()->profile->id;

        return $this->bookmarks()->where('profile_id', $profileId)->exists();
    }
}
