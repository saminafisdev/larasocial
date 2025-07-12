import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function RightSidebar() {
    return (
        <aside className="fixed top-[56px] right-0 hidden h-[calc(100vh-56px)] w-80 flex-col overflow-y-auto rounded-lg bg-white p-6 shadow md:flex">
            <div className="mb-4 text-2xl font-bold">Suggestions</div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatar4.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">Jane Doe</div>
                        <div className="text-xs text-gray-500">@janedoe</div>
                    </div>
                    <Button size="sm" className="ml-auto rounded-full bg-blue-600 text-white hover:bg-blue-700">
                        Add
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatar5.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">John Smith</div>
                        <div className="text-xs text-gray-500">@johnsmith</div>
                    </div>
                    <Button size="sm" className="ml-auto rounded-full bg-blue-600 text-white hover:bg-blue-700">
                        Add
                    </Button>
                </div>
            </div>
            <div className="mt-8 text-lg font-semibold">Trends</div>
            <ul className="mt-2 flex flex-col gap-2">
                <li className="text-sm text-gray-700">#laravel</li>
                <li className="text-sm text-gray-700">#reactjs</li>
                <li className="text-sm text-gray-700">#shadcn</li>
                <li className="text-sm text-gray-700">#socialapp</li>
            </ul>
        </aside>
    );
}
