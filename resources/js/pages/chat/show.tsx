import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatLayout from '@/layouts/chat/layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface User {
    id: number;
    name: string;
    profile_id?: number;
    profile?: {
        avatar?: string;
    };
    username: string;
}

interface Message {
    id: number;
    sender_profile_id: number;
    receiver_profile_id: number;
    content: string;
    created_at: string;
    sender_name: string;
}

interface ChatPageProps {
    otherUser: User;
    messages: Message[];
    channelName: string;
    auth: {
        user: User;
    };
}

export default function ChatShow({ otherUser, messages: initialMessages, channelName }: ChatPageProps) {
    const { auth } = usePage<ChatPageProps>().props;
    const { data, setData, post, processing, reset } = useForm({
        content: '',
    });

    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEcho(channelName, '.message.new', (e: Message) => {
        setMessages((prevMessages) => {
            if (!prevMessages.some((msg) => msg.id === e.id)) {
                return [...prevMessages, e];
            }
            return prevMessages;
        });
    });

    // useEffect(() => {
    //     if (window.Echo) {
    //         window.Echo.private(channelName)
    //             .listen('.message.new', (e: Message) => {
    //                 setMessages((prevMessages) => {
    //                     if (!prevMessages.some((msg) => msg.id === e.id)) {
    //                         return [...prevMessages, e];
    //                     }
    //                     return prevMessages;
    //                 });
    //             })
    //             .error((error: any) => console.error('Echo error:', error));
    //     } else {
    //         console.warn('Echo is not defined. Make sure you have included the Echo library.');
    //     }

    //     return () => {
    //         if (window.Echo) {
    //             window.Echo.leave(channelName);
    //         }
    //     };
    // }, [channelName]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        messageInputRef.current?.focus();
    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.content.trim()) return;

        // // Optimistic update
        // const tempId = Date.now();
        // setMessages((prev) => [
        //     ...prev,
        //     {
        //         id: tempId,
        //         sender_profile_id: auth.user.profile_id!,
        //         receiver_profile_id: otherUser.profile_id!,
        //         content: data.content,
        //         created_at: 'Just now',
        //         sender_name: 'You',
        //     },
        // ]);

        post(route('chat.store', otherUser.profile_id), {
            onSuccess: () => {
                reset('content');
                // Optional: reload only messages from server to ensure sync
                router.reload({ only: ['messages'] });
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <ChatLayout>
            <Head title={`Chat with ${otherUser.name}`} />
            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="mx-auto flex w-full max-w-5xl gap-8">
                    <section className="flex h-[calc(100vh-104px)] flex-1 flex-col rounded-lg bg-white shadow">
                        <div className="flex items-center gap-3 border-b px-6 py-4">
                            <img
                                src={otherUser.profile?.avatar || `https://ui-avatars.com/api/?name=${otherUser.name}&background=random&color=fff`}
                                alt={otherUser.name}
                                className="h-10 w-10 rounded-full border-2 border-blue-200 object-cover"
                            />
                            <Link href={`/@${otherUser.username}`} className="text-lg font-semibold">
                                {otherUser.name}
                            </Link>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 px-6 py-4">
                            {messages.length === 0 ? (
                                <div className="mt-10 text-center text-gray-500">No messages yet. Start the conversation!</div>
                            ) : (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender_profile_id === auth.user.profile.id ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs rounded-2xl px-4 py-2 text-base shadow ${
                                                msg.sender_profile_id === auth.user.profile.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border bg-white text-gray-900'
                                            }`}
                                        >
                                            <div className="mb-1 text-xs font-semibold">
                                                {msg.sender_profile_id === auth.user.profile_id ? 'You' : msg.sender_name}
                                            </div>
                                            {msg.content}
                                            <div className="mt-1 text-right text-xs text-gray-400">{msg.created_at}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t px-6 py-4">
                            <Input
                                type="text"
                                placeholder="Type a message..."
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="flex-1 rounded-full border-none bg-gray-100 px-5 py-2 shadow-sm"
                                disabled={processing}
                                ref={messageInputRef}
                            />
                            <Button
                                type="submit"
                                className="rounded-full bg-blue-600 px-6 py-2 text-base font-medium text-white hover:bg-blue-700"
                                disabled={processing || !data.content.trim()}
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    </section>
                </div>
            </main>
        </ChatLayout>
    );
}
