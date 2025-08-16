<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Profile extends Model
{
    protected $fillable = [
        'username',
        'bio',
        'avatar',
        'location',
    ];

    protected $appends = ['friendship_status', 'friends_count'];


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

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    public function sentFriendRequests()
    {
        return $this->hasMany(Friendship::class, 'sender_profile_id')->where('status', 'pending');
    }

    public function receivedFriendRequests()
    {
        return $this->hasMany(Friendship::class, 'receiver_profile_id')->where('status', 'pending');
    }

    public function friends()
    {
        return $this->belongsToMany(Profile::class, 'friendships', 'sender_profile_id', 'receiver_profile_id')
            ->wherePivot('status', 'accepted')
            ->withTimestamps();
    }

    public function getFriendshipStatusAttribute()
    {
        $authProfile = Auth::user()?->profile;

        if (!$authProfile || $authProfile->id === $this->id) {
            return null;
        }

        $friendship = Friendship::where(function ($q) use ($authProfile) {
            $q->where('sender_profile_id', $authProfile->id)
                ->where('receiver_profile_id', $this->id);
        })->orWhere(function ($q) use ($authProfile) {
            $q->where('sender_profile_id', $this->id)
                ->where('receiver_profile_id', $authProfile->id);
        })->first();

        if ($friendship) {
            if ($friendship->status === 'pending') {
                return $friendship->sender_profile_id === $authProfile->id
                    ? 'pending_sent'
                    : 'pending_received';
            } elseif ($friendship->status === 'accepted') {
                return 'friends';
            } elseif ($friendship->status === 'rejected') {
                return 'rejected';
            }
        }

        return null;
    }


    public function getFriendsCountAttribute()
    {
        $sent = Friendship::where('sender_profile_id', $this->id)
            ->where('status', 'accepted')
            ->count();

        $received = Friendship::where('receiver_profile_id', $this->id)
            ->where('status', 'accepted')
            ->count();

        return $sent + $received;
    }
}
