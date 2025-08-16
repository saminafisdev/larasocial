import ChatSidebar from '@/components/chat/chat-sidebar';
import { type PropsWithChildren } from 'react';

export default function ChatLayout({ conversations, children }: PropsWithChildren) {
    console.log('Conversations:', conversations);
    return (
        <div className="flex h-screen bg-gray-100">
            <ChatSidebar conversations={conversations} />
            <div className="flex flex-1 items-center justify-center">
                <div className="text-center text-gray-500">
                    <h2 className="mb-2 text-xl font-semibold">Select a conversation</h2>
                    <p>Choose a conversation from the sidebar to start chatting</p>
                </div>
            </div>
        </div>
    );
}
