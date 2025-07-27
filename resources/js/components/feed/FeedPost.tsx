import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SharedData } from '@/types';
import { Post } from '@/types/post';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Bookmark, Ellipsis, MessageCircle, Pencil, Share2, ThumbsUp, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function FeedPost({ post }: { post: Post }) {
    const { auth } = usePage<SharedData>().props;
    const { delete: destroy } = useForm();

    function deletePost() {
        destroy(`/posts/${post.id}`, {
            onSuccess: () => {
                toast('Post deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete post');
            },
        });
    }

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
                {post.profile?.user.id === auth.user.id && (
                    <CardAction className="ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Ellipsis />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Pencil /> Edit Post
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <Trash2 className="text-red-500" /> Delete Post
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your post.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className="bg-red-800 hover:bg-red-700" onClick={deletePost}>
                                                    Yes, delete post
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardAction>
                )}
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
