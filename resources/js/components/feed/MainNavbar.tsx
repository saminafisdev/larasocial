import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, router } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

export function MainNavbar() {
        const cleanup = useMobileNavigation();
    
        const handleLogout = () => {
            cleanup();
            router.flushAll();
        };


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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 hover:bg-gray-100">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatar.png" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                       <DropdownMenuItem asChild>
                <Link className="block w-full text-red-600" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}
