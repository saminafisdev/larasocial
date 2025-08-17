<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendshipController extends Controller
{
    public function sendRequest(Profile $profile)
    {
        $authProfile = Auth::user()->profile;

        if ($authProfile->id === $profile->id) {
            return response()->json(['error' => 'Cannot send request to yourself'], 400);
        }

        $existing = Friendship::where(function ($q) use ($authProfile, $profile) {
            $q->where('sender_profile_id', $authProfile->id)->where('receiver_profile_id', $profile->id);
        })->orWhere(function ($q) use ($authProfile, $profile) {
            $q->where('sender_profile_id', $profile->id)->where('receiver_profile_id', $authProfile->id);
        })->first();

        if ($existing) {
            if ($existing->status === 'rejected') {
                $existing->delete(); // Optional: allow resending
            } else {
                return response()->json(['error' => 'Already requested or friends.'], 400);
            }
        }

        Friendship::create([
            'sender_profile_id' => $authProfile->id,
            'receiver_profile_id' => $profile->id,
            'status' => 'pending',
        ]);

        // Flash success message and redirect
        return redirect()->back()->with('success', 'Friend request sent!');
    }

    public function acceptRequest(Profile $profile)
    {
        $authProfile = Auth::user()->profile;

        $request = Friendship::where('sender_profile_id', $profile->id)
            ->where('receiver_profile_id', $authProfile->id)
            ->where('status', 'pending')
            ->firstOrFail();

        $request->update(['status' => 'accepted']);

        return redirect()->back()->with('success', 'Friend request accepted!');
    }

    public function rejectRequest(Profile $profile)
    {
        $authProfile = Auth::user()->profile;

        $request = Friendship::where('sender_profile_id', $profile->id)
            ->where('receiver_profile_id', $authProfile->id)
            ->where('status', 'pending')
            ->firstOrFail();

        // $request->update(['status' => 'rejected']);
        $request->delete();

        return redirect()->back()->with('success', 'Friend request declined.');
    }

    public function cancelRequest(Profile $profile)
    {
        $authProfile = Auth::user()->profile;

        $request = Friendship::where('sender_profile_id', $authProfile->id)
            ->where('receiver_profile_id', $profile->id)
            ->where('status', 'pending')
            ->firstOrFail();

        $request->delete();

        return redirect()->back()->with('success', 'Friend request cancelled.');
    }

    public function unfriendRequest(Profile $profile)
    {
        $authProfile = Auth::user()->profile;

        $request = Friendship::where('sender_profile_id', $authProfile->id)
            ->where('receiver_profile_id', $profile->id)
            ->where('status', 'accepted')
            ->firstOrFail();

        $request->delete();

        return redirect()->back()->with('success', 'Friend request cancelled.');
    }


    public function index()
    {
        // Get the ID of the authenticated user's profile.
        $currentProfileId = Auth::user()->profile->id;

        // First, get the IDs of all profiles that have any relationship with the current user.
        // This includes pending, accepted, and rejected requests to prevent re-sending.
        $relatedProfileIds = Friendship::query()
            ->where('sender_profile_id', $currentProfileId)
            ->orWhere('receiver_profile_id', $currentProfileId)
            ->pluck('sender_profile_id', 'receiver_profile_id')
            ->keys()
            ->merge(Friendship::query()
                ->where('sender_profile_id', $currentProfileId)
                ->orWhere('receiver_profile_id', $currentProfileId)
                ->pluck('sender_profile_id', 'receiver_profile_id')
                ->values()
            )
            ->unique()
            ->toArray();

        // Add the current user's own profile ID to the list of exclusions.
        $relatedProfileIds[] = $currentProfileId;

        // Finally, get all profiles that are not in the list of related IDs.
        $nonFriends = Profile::with('user')->whereNotIn('id', $relatedProfileIds)->get();

        // Return the collection of non-friend profiles as a JSON response.
        return inertia('friends', [
            'suggestedFriends' => $nonFriends
        ]);
    }
}
