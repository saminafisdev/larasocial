import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';

export function MainNavbar() {
    return (
        <nav className="sticky top-0 z-30 flex w-full items-center justify-between border-b bg-white px-4 py-2 shadow-sm">
            {/* Left: Logo/Title */}
            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-blue-600 select-none">Larasocial</span>
            </div>

            {/* Center: Search Bar */}
            <div className="flex flex-1 justify-center px-4">
                <div className="w-full max-w-md">
                    <input
                        type="search"
                        placeholder="Search Larasocial..."
                        className="rounded-full border-none bg-gray-100 px-5 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Right: Menus */}
            <div className="flex items-center gap-4">
                <div className="flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 hover:bg-gray-100">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
            </div>
        </nav>
    );
}
