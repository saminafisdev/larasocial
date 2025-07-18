import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark, MessageCircle, Share2, ThumbsUp } from 'lucide-react';

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
        <Card className="gap-3 shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar} alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-base leading-tight font-semibold">{user}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">{time}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="py-2">
                <div className="mb-4 text-[15px] text-gray-800">{content}</div>
                <div>
                    <img src={`https://picsum.photos/id/${id}/800/`} className="w-full" alt="" />
                </div>
            </CardContent>
            <CardFooter className="mt-2 flex justify-between gap-4 border-t pt-2 text-sm text-gray-500">
                <Button variant="ghost" size="lg" className="flex items-center gap-1 px-2">
                    <ThumbsUp className="mr-2 h-4 w-4" /> 103
                </Button>
                <Button variant="ghost" size="lg" className="flex items-center gap-1 px-2">
                    <MessageCircle className="mr-2 h-4 w-4" /> 22
                </Button>
                <Button variant="ghost" size="lg" className="flex items-center gap-1 px-2">
                    <Share2 className="mr-2 h-4 w-4" /> 4.1k
                </Button>
                <Button variant="ghost" size="lg" className="flex items-center gap-1 px-2">
                    <Bookmark className="mr-2 h-4 w-4" /> Save
                </Button>
            </CardFooter>
        </Card>
    );
}
