<?php

namespace App\Events;

use App\Models\Message;
use App\Models\Profile; // CHANGE: Import Profile
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Message $message;
    public Profile $senderProfile; // CHANGE: Type-hint Profile
    public Profile $receiverProfile; // CHANGE: Type-hint Profile

    /**
     * Create a new event instance.
     */
    public function __construct(Message $message, Profile $senderProfile, Profile $receiverProfile) // CHANGE: Constructor arguments
    {
        $this->message = $message;
        $this->senderProfile = $senderProfile;
        $this->receiverProfile = $receiverProfile;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): array
    {
        // CHANGE: Use profile IDs for channel naming
        $participants = [$this->senderProfile->id, $this->receiverProfile->id];
        sort($participants);
        $channelName = 'chat.' . implode('.', $participants);

        return [
            new PrivateChannel($channelName),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'message.new';
    }

    /**
     * Get the data to broadcast.
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            // CHANGE: Send profile IDs instead of user IDs
            'sender_profile_id' => $this->message->sender_profile_id,
            'receiver_profile_id' => $this->message->receiver_profile_id,
            'content' => $this->message->content,
            'created_at' => $this->message->created_at->diffForHumans(),
            // CHANGE: Use senderProfile for name and avatar
            'sender_name' => $this->senderProfile->user->name, // Assuming Profile has a user relationship
            'sender_avatar' => $this->senderProfile->avatar, // Assuming Profile has an avatar field
        ];
    }
}
