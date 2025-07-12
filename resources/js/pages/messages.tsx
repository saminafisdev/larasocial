import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useState } from 'react';

const mockChats = [
    { id: 1, name: 'Alice Smith', avatar: 'https://picsum.photos/id/24/200', lastMessage: 'Hey, how are you?', unread: 2 },
    { id: 2, name: 'Bob Johnson', avatar: 'https://picsum.photos/id/25/200', lastMessage: 'Let’s catch up soon!', unread: 0 },
    { id: 3, name: 'Charlie Lee', avatar: 'https://picsum.photos/id/26/200', lastMessage: 'Sent you the files.', unread: 1 },
    { id: 4, name: 'Diana Prince', avatar: 'https://picsum.photos/id/27/200', lastMessage: 'See you tomorrow!', unread: 0 },
];

const mockMessages = [
    { id: 1, sender: 'Alice Smith', text: 'Hey, how are you?', time: '10:00 AM', mine: false },
    { id: 2, sender: 'John Doe', text: 'I’m good! How about you?', time: '10:01 AM', mine: true },
    { id: 3, sender: 'Alice Smith', text: 'Doing well, thanks!', time: '10:02 AM', mine: false },
];

export default function Messages() {
    const [selectedChat, setSelectedChat] = useState(mockChats[0]);

    return (
        <>
            {/* <MainNavbar /> */}
            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="flex w-full gap-8">
                    {/* Left Sidebar */}
                    {/* <LeftSidebar /> */}
                    {/* Chat Details/Main Section */}
                    <section className="flex h-[calc(100vh-104px)] flex-1 flex-col rounded-lg bg-white shadow">
                        {/* Chat Header */}
                        <div className="flex items-center gap-3 border-b px-6 py-4">
                            <img
                                src={selectedChat.avatar}
                                alt={selectedChat.name}
                                className="h-10 w-10 rounded-full border-2 border-blue-200 object-cover"
                            />
                            <div className="text-lg font-semibold">{selectedChat.name}</div>
                        </div>
                        {/* Messages */}
                        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 px-6 py-4">
                            {mockMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-xs rounded-2xl px-4 py-2 text-base shadow ${msg.mine ? 'bg-blue-600 text-white' : 'border bg-white text-gray-900'}`}
                                    >
                                        {msg.text}
                                        <div className="mt-1 text-right text-xs text-gray-400">{msg.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Message Input */}
                        <form className="flex items-center gap-2 border-t px-6 py-4">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 rounded-full border-none bg-gray-100 px-5 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                            <Button type="submit" className="rounded-full bg-blue-600 px-6 py-2 text-base font-medium text-white hover:bg-blue-700">
                                <Send />
                            </Button>
                        </form>
                    </section>

                    {/* Chats Sidebar (now on the right) */}
                    <aside className="h-[calc(100vh-104px)] w-80 flex-shrink-0 overflow-y-auto rounded-lg bg-white p-4 shadow">
                        <h2 className="mb-4 text-xl font-semibold">Chats</h2>
                        <ul className="space-y-2">
                            {mockChats.map((chat) => (
                                <li key={chat.id}>
                                    <button
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-100 ${selectedChat.id === chat.id ? 'bg-blue-100' : ''}`}
                                        onClick={() => setSelectedChat(chat)}
                                    >
                                        <img
                                            src={chat.avatar}
                                            alt={chat.name}
                                            className="h-10 w-10 rounded-full border-2 border-blue-200 object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">{chat.name}</div>
                                            <div className="truncate text-sm text-gray-500">{chat.lastMessage}</div>
                                        </div>
                                        {chat.unread > 0 && (
                                            <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </main>
        </>
    );
}
