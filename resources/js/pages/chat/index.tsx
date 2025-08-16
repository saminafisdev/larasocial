import ChatLayout from '@/layouts/chat/layout';

export default function ChatIndex({ conversations }) {
    return (
        <ChatLayout conversations={conversations}>
            <div>
                <p>Select a conversation to start chatting</p>
            </div>
        </ChatLayout>
    );
}
