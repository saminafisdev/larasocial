import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, ThumbsUp } from 'lucide-react';

interface FeedPostProps {
    id: number;
    user?: string;
    avatar?: string;
    time?: string;
    content?: string;
}

export function FeedPost({
    id,
    user = `User ${id}`,
    avatar = `/avatar${id}.png`,
    time = 'Just now',
    content = 'This is a sample post for the feed. You can replace this with real data.',
}: FeedPostProps) {
    return (
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar} alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">{user}</div>
                    <div className="text-xs text-gray-500">{time}</div>
                </div>
            </div>
            <div className="text-[15px] text-gray-800">{content}</div>
            <div className="mt-2 flex gap-4 border-t pt-2 text-sm text-gray-500">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                    <ThumbsUp className="h-4 w-4" /> Like
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                    <MessageCircle className="h-4 w-4" /> Comment
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                    <Share2 className="h-4 w-4" /> Share
                </Button>
            </div>
        </div>
    );
}
