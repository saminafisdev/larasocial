import React, { useState, useEffect, useRef } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui Button
import { Send } from 'lucide-react'; // Assuming lucide-react for icon
import { useEcho } from '@laravel/echo-react';

// Define types for Inertia props
interface UserProp {
    user_id: number;
    name: string;
    profile_id: number;
    avatar?: string;
}

interface Message {
    id: number;
    sender_profile_id: number;
    receiver_profile_id: number;
    content: string;
    created_at: string;
    sender_name: string;
    sender_avatar?: string;
}

interface ChatPageProps {
    otherUser: UserProp;
    messages: Message[];
    channelName: string;
    authProfileId: number; // Passed from the backend
    auth: { // Globally shared auth user (from AppServiceProvider)
        user: {
            id: number;
            name: string;
            profile: {
                id: number;
                avatar?: string;
            };
        };
    };
}

export default function ChatShow({ otherUser, messages: initialMessages, channelName, authProfileId }: ChatPageProps) {
    const { auth } = usePage<ChatPageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    });

    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEcho(
        channelName,
        '.message.new',
        (e: Message) => {
            console.log('New message received via Reverb:', e);
            setMessages((prevMessages) => {
                // Prevent duplicates if the message is also added from post success
                if (!prevMessages.some(msg => msg.id === e.id)) {
                    return [...prevMessages, e];
                }
                return prevMessages;
            });
        }
    )

    // Effect for handling incoming messages via WebSocket
    // useEffect(() => {
    //     if (window.Echo) {
    //         console.log('Attempting to listen to channel:', channelName);
    //         window.Echo.private(channelName)
    //             .listen('.message.new', (e: Message) => {
    //                 console.log('New message received via Reverb:', e);
    //                 setMessages((prevMessages) => {
    //                     // Prevent duplicates if the message is also added from post success
    //                     if (!prevMessages.some(msg => msg.id === e.id)) {
    //                         return [...prevMessages, e];
    //                     }
    //                     return prevMessages;
    //                 });
    //             })
    //             .error((error: any) => {
    //                 console.error('Error listening to channel:', error);
    //             });
    //     }

    //     return () => {
    //         if (window.Echo) {
    //             window.Echo.leave(channelName);
    //             console.log('Left channel:', channelName);
    //         }
    //     };
    // }, [channelName]);

    // Effect to scroll to the bottom whenever messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Effect to focus input on component mount
    useEffect(() => {
        if (messageInputRef.current) {
            messageInputRef.current.focus();
        }
    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.content.trim()) {
            return; // Don't send empty messages
        }

        post(route('chat.store', otherUser.profile_id), { // Pass otherUser's profile_id
            onSuccess: (response) => {
                const newMessage = response.props.message as Message;
                setMessages((prevMessages) => {
                    if (!prevMessages.some(msg => msg.id === newMessage.id)) {
                        return [...prevMessages, newMessage];
                    }
                    return prevMessages;
                });
                reset('content');
                scrollToBottom();
            },
            onError: (err) => {
                console.error('Error sending message:', err);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <>
            <Head title={`Chat with ${otherUser.name}`} />

            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="flex w-full max-w-5xl mx-auto gap-8">
                    <section className="flex h-[calc(100vh-104px)] flex-1 flex-col rounded-lg bg-white shadow">
                        <div className="flex items-center gap-3 border-b px-6 py-4">
                            <img
                                src={otherUser.avatar || `https://ui-avatars.com/api/?name=${otherUser.name}&background=random&color=fff`}
                                alt={otherUser.name}
                                className="h-10 w-10 rounded-full border-2 border-blue-200 object-cover"
                            />
                            <div className="text-lg font-semibold">{otherUser.name}</div>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 px-6 py-4">
                            {messages.length === 0 ? (
                                <div className="text-center text-gray-500 mt-10">No messages yet. Start the conversation!</div>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender_profile_id === authProfileId ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-xs rounded-2xl px-4 py-2 text-base shadow ${msg.sender_profile_id === authProfileId ? 'bg-blue-600 text-white' : 'border bg-white text-gray-900'}`}
                                        >
                                            <div className="font-semibold text-xs mb-1">
                                                {msg.sender_profile_id === authProfileId ? 'You' : msg.sender_name}
                                            </div>
                                            {msg.content}
                                            <div className="mt-1 text-right text-xs text-gray-400">
                                                {msg.created_at}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t px-6 py-4">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="flex-1 rounded-full border-none bg-gray-100 px-5 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                                disabled={processing}
                                ref={messageInputRef}
                            />
                            <Button type="submit" className="rounded-full bg-blue-600 px-6 py-2 text-base font-medium text-white hover:bg-blue-700" disabled={processing || !data.content.trim()}>
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}