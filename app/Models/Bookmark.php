<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bookmark extends Model
{
    protected $fillable = [
        'profile_id',
        'post_id',
    ];

    /**
     * Get the user that owns the bookmark.
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    /**
     * Get the post that is bookmarked.
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
