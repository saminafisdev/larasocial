import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { MoreHorizontal, Search } from 'lucide-react';
import { useState } from 'react';

interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isOnline: boolean;
    isActive?: boolean;
}

export default function ChatSidebar({ conversations }) {
    console.log('Conversations:', conversations);
    // const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeConversation, setActiveConversation] = useState('1');

    const filteredConversations = conversations.filter(
        (conversation) =>
            conversation.other.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleConversationClick = (conversationId: string) => {
        setActiveConversation(conversationId);
        // Mark conversation as read
        setConversations(conversations.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)));
    };

    const truncateMessage = (message: string, maxLength = 60) => {
        return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
    };

    return (
        <div className="flex h-screen w-full max-w-sm flex-col border-r border-gray-200 bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-gray-200 bg-gray-50 pl-10 focus:bg-white"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        <p>No conversations found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredConversations.map((conversation) => (
                            <Link
                                href={`/chat/${conversation.other.username}`}
                                key={conversation.id}
                                // onClick={() => handleConversationClick(conversation.id)}
                                className={`block cursor-pointer p-4 transition-colors hover:bg-gray-50 ${
                                    activeConversation === conversation.id ? 'border-r-2 border-blue-500 bg-blue-50' : ''
                                }`}
                            >
                                <div className="flex items-start space-x-3">
                                    {/* Avatar with Online Status */}
                                    <div className="relative flex-shrink-0">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={conversation.avatar || '/placeholder.svg'} alt={conversation.name} />
                                            <AvatarFallback className="bg-gray-200 text-gray-600">
                                                {conversation.other.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        {conversation.isOnline && (
                                            <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                                        )}
                                    </div>

                                    {/* Conversation Details */}
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center justify-between">
                                            <h3
                                                className={`truncate text-sm font-medium ${
                                                    conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                                                }`}
                                            >
                                                {conversation.other.name}
                                            </h3>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                                                {conversation.unreadCount > 0 && (
                                                    <Badge className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-500 px-1.5 text-xs text-white hover:bg-blue-600">
                                                        {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <p
                                            className={`truncate text-sm ${
                                                conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'
                                            }`}
                                        >
                                            {truncateMessage(conversation.last_message)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
                <div className="text-center text-xs text-gray-500">
                    {filteredConversations.length} conversation{filteredConversations.length !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
    );
}
