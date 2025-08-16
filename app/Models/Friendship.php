<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Friendship extends Model
{
    protected $fillable = ['sender_profile_id', 'receiver_profile_id', 'status'];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'sender_profile_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'receiver_profile_id');
    }
}
