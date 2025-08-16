<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = [];

    public function participants()
    {
        return $this->belongsToMany(Profile::class, 'conversation_profile')
            ->withPivot('joined_at');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
