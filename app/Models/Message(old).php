<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    protected $fillable = [
        'sender_profile_id',
        'receiver_profile_id',
        'content',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function senderProfile(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'sender_profile_id')->withDefault([
            'name' => 'Deleted User'
        ]);
    }

    public function receiverProfile(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'receiver_profile_id')->withDefault([
            'name' => 'Deleted User'
        ]);
    }
}
