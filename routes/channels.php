<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chat.{profile1Id}.{profile2Id}', function ($user, $profile1Id, $profile2Id) {
    if ($user->profile) {
        return (int) $user->profile->id === (int) $profile1Id || (int) $user->profile->id === (int) $profile2Id;
    }
    return false;
});