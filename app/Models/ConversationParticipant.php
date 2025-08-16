<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ConversationParticipant extends Pivot
{
  protected $table = 'conversation_profile'; // your pivot table name

  protected $fillable = [
    'conversation_id',
    'profile_id',
    'joined_at',
  ];

  public function profile()
  {
    return $this->belongsTo(Profile::class);
  }

  public function conversation()
  {
    return $this->belongsTo(Conversation::class);
  }
}
