<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'profile_id',
        'content',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
