<?php

namespace App\Events;

use App\Models\Message;
use App\Models\Profile;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Message $message;
    public Profile $senderProfile;
    public Profile $receiverProfile;

    public function __construct(Message $message, Profile $senderProfile, Profile $receiverProfile)
    {
        $this->message = $message;
        $this->senderProfile = $senderProfile;
        $this->receiverProfile = $receiverProfile;
    }

    public function broadcastOn(): array
    {
        $participants = [$this->senderProfile->id, $this->receiverProfile->id];
        sort($participants);
        $channelName = 'chat.' . implode('.', $participants);

        return [
            new PrivateChannel($channelName),
        ];
    }

    public function broadcastAs(): string
    {
        return 'message.new';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'sender_profile_id' => $this->message->sender_profile_id,
            'receiver_profile_id' => $this->message->receiver_profile_id,
            'content' => $this->message->content,
            'created_at' => $this->message->created_at->diffForHumans(),
            'sender_name' => $this->senderProfile->user->name,
            'sender_avatar' => $this->senderProfile->avatar,
        ];
    }
}