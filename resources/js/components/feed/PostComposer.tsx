import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function PostComposer() {
    return (
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <Dialog>
                    <form className="flex-1 sm:max-w-[600px]">
                        <DialogTrigger asChild>
                            <Input
                                type="text"
                                placeholder="What's on your mind?"
                                className="cursor-default rounded-full border-none bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle className="text-center text-xl font-bold">Create a post</DialogTitle>
                                {/* <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription> */}
                            </DialogHeader>
                            <div className="grid gap-4">
                                <Textarea className="md:text-2xl" placeholder="What's on your mind?" rows={6} />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button className="w-full" type="submit" disabled>
                                        Post
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
                <Button className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700">Post</Button>
            </div>
        </div>
    );
}
