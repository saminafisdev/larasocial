<?php

use Illuminate\Support\Facades\Broadcast;

// CHANGE THIS: Channel now expects profile IDs
Broadcast::channel('chat.{profile1Id}.{profile2Id}', function ($user, $profile1Id, $profile2Id) {
    // Check if the authenticated user's profile ID matches either of the channel's profile IDs.
    // Ensure the user has a profile and its ID matches.
    if ($user->profile) {
        return (int) $user->profile->id === (int) $profile1Id || (int) $user->profile->id === (int) $profile2Id;
    }
    return false; // User has no profile, or doesn't match
});
