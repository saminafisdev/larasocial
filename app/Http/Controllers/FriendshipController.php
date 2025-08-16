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
        $user = auth()->user();

        $friends = Friendship::where(function ($q) use ($user) {
            $q->where('sender_id', $user->id)
                ->orWhere('receiver_id', $user->id);
        })->where('status', 'accepted')->get();

        $friendUsers = $friends->map(function ($friendship) use ($user) {
            return $friendship->sender_id === $user->id ? $friendship->receiver : $friendship->sender;
        });

        return response()->json(['friends' => $friendUsers]);
    }
}
