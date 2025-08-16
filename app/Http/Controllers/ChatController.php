<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Profile; // Ensure Profile model is imported
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $profileId = Auth::user()->profile->id;

        // Get all conversations where the logged-in profile is a participant
        $conversations = Conversation::with([
            'participants.user',   // eager load participant profile & user
            // 'messages' => function (Builder $query) {
            //     $query->latest()->limit(1); // latest message
            // }
        ])
            ->whereHas('participants', function (Builder $q) use ($profileId) {
                $q->where('profile_id', $profileId);
            })
            ->get()
            ->map(function ($conversation) use ($profileId) {
                // Pick the "other" participant
                $otherParticipant = $conversation->participants
                    ->where('id', '!=', $profileId)
                    ->first();
                return [
                    'id' => $conversation->id,
                    'other' => [
                        'id' => $otherParticipant?->id,
                        'username' => $otherParticipant?->username,
                        'name' => $otherParticipant?->user->name,
                        'avatar' => $otherParticipant?->avatar_url ?? null,
                    ],
                    'last_message' => $conversation->messages->first()?->body,
                    'last_message_at' => $conversation->messages->first()?->created_at,
                ];
            });

        return Inertia::render('chat/index', [
            'conversations' => $conversations,
        ]);
    }
    /**
     * Display the chat interface for a conversation with a specific user's profile.
     *
     * @param Profile $otherProfile The profile of the user the authenticated user is chatting with.
     * NOTE: The parameter name matches the route segment {otherProfile}.
     */
    public function show(Profile $otherProfile) // Changed from $otherUserProfile to $otherProfile for route binding consistency
    {
        // 1. Ensure the 'user' relationship is loaded on the other participant's profile.
        // This is needed to access otherProfile->user->name, otherProfile->user->id, etc., for display.
        $otherProfile->load('user');

        // 2. Get the authenticated user's profile.
        $authUser = Auth::user();
        if (!$authUser || !$authUser->profile) {
            // Handle case where authenticated user is missing or has no profile
            // This might redirect to login, profile creation, or show an error
            return redirect()->route('login')->with('error', 'Authentication required or profile missing.');
        }
        $authProfile = $authUser->profile;

        // 3. Prevent a user from chatting with their own profile.
        if ($authProfile->id === $otherProfile->id) {
            return redirect()->back()->withErrors(['chat' => 'You cannot chat with yourself.']);
        }

        // 4. Fetch historical messages between the two profiles.
        // Messages where (sender is authProfile AND receiver is otherProfile)
        // OR (sender is otherProfile AND receiver is authProfile)
        $messages = Message::query()
            ->where(function ($query) use ($authProfile, $otherProfile) {
                $query->where('sender_profile_id', $authProfile->id)
                    ->where('receiver_profile_id', $otherProfile->id);
            })
            ->orWhere(function ($query) use ($authProfile, $otherProfile) {
                $query->where('sender_profile_id', $otherProfile->id)
                    ->where('receiver_profile_id', $authProfile->id);
            })
            ->with('senderProfile.user:id,name') // Eager load sender's profile and its associated user's name
            ->orderBy('created_at', 'asc') // Order messages chronologically
            ->get();

        // 5. Format messages for Inertia frontend.
        $messagesFormatted = $messages->map(function ($message) {
            return [
                'id' => $message->id,
                'sender_profile_id' => $message->sender_profile_id,
                'receiver_profile_id' => $message->receiver_profile_id,
                'content' => $message->content,
                'created_at' => $message->created_at->diffForHumans(), // Example formatting
                'sender_name' => $message->senderProfile->user->name, // Access sender's name via profile -> user
                'sender_avatar' => $message->senderProfile->avatar,   // Access sender's avatar from profile
            ];
        })->toArray(); // Ensure it's a plain array for Inertia props

        // 6. Determine the consistent Reverb channel name using profile IDs.
        // Sorting the IDs ensures both participants join the same channel regardless of who initiates.
        $participants = [$authProfile->id, $otherProfile->id];
        sort($participants); // Sort to get consistent order (e.g., [1, 5] always, not [5, 1])
        $channelName = 'chat.' . implode('.', $participants); // e.g., 'chat.1.5'

        // 7. Render the Inertia page with all necessary props.
        return Inertia::render('chat/show', [
            // Pass the other participant's user and profile info to the frontend
            'otherUser' => [
                'user_id' => $otherProfile->user->id, // User ID (for frontend reference)
                'name' => $otherProfile->user->name,   // User Name (for display in header)
                'profile_id' => $otherProfile->id,     // Profile ID (crucial for chat logic on frontend)
                'avatar' => $otherProfile->avatar,     // Profile Avatar
                'username' => $otherProfile->username,
            ],
            'messages' => $messagesFormatted,
            'channelName' => $channelName,
            // Also pass the authenticated user's profile ID for frontend logic (e.g., to determine 'mine' messages)
            'authProfileId' => $authProfile->id,
        ]);
    }

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Store a new message and broadcast it.
     * This method is typically called via a POST request from the frontend.
     *
     * @param Request $request
     * @param Profile $receiverProfile The profile that will receive this message.
     * NOTE: The parameter name matches the route segment {receiverProfile}.
     */
    public function store(Request $request, Profile $receiverProfile)
    {
        $request->validate([
            'content' => ['required', 'string', 'max:1000'],
        ]);

        $authUser = Auth::user();
        if (!$authUser || !$authUser->profile) {
            // With Inertia, redirect with flash instead of JSON
            return redirect()->back()->with('error', 'Authentication required or profile missing.');
        }

        $senderProfile = $authUser->profile;

        $message = Message::create([
            'sender_profile_id'   => $senderProfile->id,
            'receiver_profile_id' => $receiverProfile->id,
            'content'             => $request->input('content'),
        ]);

        broadcast(new MessageSent($message, $senderProfile, $receiverProfile))->toOthers();

        // Inertia flow: redirect back so React/Inertia reloads props
        return redirect()->back()->with('success', 'Message sent!');
    }
}
