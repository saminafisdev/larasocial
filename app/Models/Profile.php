<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

}
