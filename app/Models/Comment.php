<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'profile_id',
        'post_id',
        'content',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
