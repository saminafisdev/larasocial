import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PostComposer() {
    return (
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input
                    type="text"
                    placeholder="What's on your mind?"
                    className="flex-1 rounded-full border-none bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                <Button className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700">Post</Button>
            </div>
        </div>
    );
}
