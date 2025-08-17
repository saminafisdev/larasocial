import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types';
import { type Post } from '@/types/post';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

export function EditPostDialog({ post }: { post: Post }) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, patch, processing, reset } = useForm({
        content: post.content,
    });

    function onPostUpdate(e: React.FormEvent) {
        e.preventDefault();
        toast.promise(
            new Promise((resolve, reject) => {
                patch(`/posts/${post.id}`, {
                    onSuccess: () => {
                        resolve('success');
                        reset();
                    },
                    onError: () => reject(new Error('error')),
                });
            }),
            {
                loading: 'Updating',
                success: 'Post updated successfully',
                error: 'Failed to update post',
            },
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Pencil /> Edit Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={onPostUpdate} className="flex-1 sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold">Edit post</DialogTitle>
                        {/* <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription> */}
                    </DialogHeader>
                    {/* User Info above textarea */}
                    <div className="mb-2 flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/avatar.png" alt="User" />
                            <AvatarFallback>{auth.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-lg font-semibold">{auth.user.name}</span>
                    </div>
                    <div className="grid gap-4">
                        <Textarea
                            defaultValue={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="md:text-2xl"
                            placeholder="What's on your mind?"
                            rows={6}
                        />
                    </div>
                    {/* Add to your post box */}
                    <div className="mt-4 rounded-lg bg-gray-100 px-4 py-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700">Add to your post</span>
                            {/* Lucide icons: Image, Smile, Video */}
                            <span className="flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow hover:bg-blue-50">
                                {/* Image icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" stroke="currentColor" fill="none" />
                                    <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" stroke="currentColor" fill="none" />
                                    <path d="M21 15l-5-5-4 4-3-3-4 4" strokeWidth="2" stroke="currentColor" fill="none" />
                                </svg>
                            </span>
                            <span className="flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow hover:bg-blue-50">
                                {/* Smile icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-yellow-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none" />
                                    <path d="M8 15s1.5 2 4 2 4-2 4-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 9h.01M15 9h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow hover:bg-blue-50">
                                {/* Video icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none" />
                                    <path d="M8 7V5a4 4 0 0 1 8 0v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="w-full" type="submit" disabled={processing}>
                                Update Post
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
