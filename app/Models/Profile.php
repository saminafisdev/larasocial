<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    protected $fillable = [
        'username',
        'bio',
        'avatar',
        'location',
        // Add other profile fields here
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class, 'conversation_profile')
            ->withPivot('joined_at');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
