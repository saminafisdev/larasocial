import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/types/post';
import { Link } from '@inertiajs/react';
import { Bookmark, MessageCircle, Share2, ThumbsUp } from 'lucide-react';

export function FeedPost({ post }: { post: Post }) {
    return (
        <Card className="gap-3 shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={post?.profile?.avatar} alt="User" />
                    <AvatarFallback>{post.profile?.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-base leading-tight font-semibold">{post?.profile?.user.name}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                        <Link href={`/${post.profile?.username}/posts/${post.id}`}>{post.updated_at_human}</Link>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="py-2">
                <div className="mb-4 text-[15px] text-gray-800">{post.content}</div>
                <div>
                    <img src={`https://picsum.photos/id/${post.id}/800/`} className="w-full" alt="" />
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
