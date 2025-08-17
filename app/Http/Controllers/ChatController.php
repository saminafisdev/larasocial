<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function show(Profile $otherProfile)
    {
        $otherProfile->load('user');    

        $authUser = Auth::user();
        if (!$authUser || !$authUser->profile) {
            return redirect()->route('login')->with('error', 'Authentication required or profile missing.');
        }
        $authProfile = $authUser->profile;

        if ($authProfile->id === $otherProfile->id) {
            return redirect()->back()->withErrors(['chat' => 'You cannot chat with yourself.']);
        }

        $messages = Message::query()
            ->where(function ($query) use ($authProfile, $otherProfile) {
                $query->where('sender_profile_id', $authProfile->id)
                      ->where('receiver_profile_id', $otherProfile->id);
            })
            ->orWhere(function ($query) use ($authProfile, $otherProfile) {
                $query->where('sender_profile_id', $otherProfile->id)
                      ->where('receiver_profile_id', $authProfile->id);
            })
            ->with('senderProfile.user:id,name')
            ->orderBy('created_at', 'asc')
            ->get();

        $messagesFormatted = $messages->map(function ($message) {
            return [
                'id' => $message->id,
                'sender_profile_id' => $message->sender_profile_id,
                'receiver_profile_id' => $message->receiver_profile_id,
                'content' => $message->content,
                'created_at' => $message->created_at->diffForHumans(),
                'sender_name' => $message->senderProfile->user->name,
                'sender_avatar' => $message->senderProfile->avatar,
            ];
        })->toArray();

        $participants = [$authProfile->id, $otherProfile->id];
        sort($participants);
        $channelName = 'chat.' . implode('.', $participants);

        return Inertia::render('Chat/Show', [
            'otherUser' => [
                'user_id' => $otherProfile->user->id,
                'name' => $otherProfile->user->name,
                'profile_id' => $otherProfile->id,
                'avatar' => $otherProfile->avatar,
            ],
            'messages' => $messagesFormatted,
            'channelName' => $channelName,
            'authProfileId' => $authProfile->id,
        ]);
    }

    public function store(Request $request, Profile $receiverProfile)
    {
        $request->validate([
            'content' => ['required', 'string', 'max:1000'],
        ]);

        $authUser = Auth::user();
        if (!$authUser || !$authUser->profile) {
            return response()->json(['error' => 'Authentication required or profile missing.'], 401);
        }
        $senderProfile = $authUser->profile;

        $message = Message::create([
            'sender_profile_id' => $senderProfile->id,
            'receiver_profile_id' => $receiverProfile->id,
            'content' => $request->input('content'),
        ]);

        broadcast(new MessageSent($message, $senderProfile, $receiverProfile))->toOthers();

        // return response()->json([
        //     'message' => [
        //         'id' => $message->id,
        //         'sender_profile_id' => $message->sender_profile_id,
        //         'receiver_profile_id' => $message->receiver_profile_id,
        //         'content' => $message->content,
        //         'created_at' => $message->created_at->diffForHumans(),
        //         'sender_name' => $senderProfile->user->name,
        //         'sender_avatar' => $senderProfile->avatar,
        //     ],
        // ]);
        return redirect()->route('chat.show', $receiverProfile->id)->with('success', 'Message sent!');

    }
}