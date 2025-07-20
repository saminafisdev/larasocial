import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell, House, MessageCircle, Settings, Users } from 'lucide-react';

export function LeftSidebar() {
    const links = [
        { href: '/', icon: <House className="h-9 w-9" />, label: 'Home' },
        { href: '/friends', icon: <Users className="h-9 w-9" />, label: 'Friends' },
        { href: '/messages', icon: <MessageCircle className="h-9 w-9" />, label: 'Messages' },
        { href: '/notifications', icon: <Bell className="h-9 w-9" />, label: 'Notifications' },
        { href: '/settings', icon: <Settings className="h-9 w-9" />, label: 'Settings' },
    ];

    const { auth } = usePage<SharedData>().props;
    return (
        <aside className="fixed top-[56px] left-0 hidden h-[calc(100vh-56px)] w-80 flex-col overflow-y-auto rounded-lg bg-white p-6 shadow md:flex">
            {/* Profile Button */}
            <Button variant="ghost" className="mb-6 w-full justify-start rounded-lg px-4 py-8 text-lg font-medium hover:bg-gray-100">
                <Link href="/@johndoe" className="flex h-full w-full items-center">
                    <img
                        src="https://picsum.photos/id/91/600"
                        alt="John Doe"
                        className="mr-4 h-12 w-12 rounded-full border-2 border-blue-200 object-cover shadow"
                    />
                    <span className="text-lg font-semibold text-gray-900">{auth.user.name}</span>
                </Link>
            </Button>
            {/* Navigation Links */}
            {links.map((link) => (
                <Button key={link.href} variant="ghost" className="w-full justify-start rounded-lg px-4 py-6 text-lg font-medium">
                    <Link href={link.href} className="flex h-full w-full items-center">
                        <span className="mr-4">{link.icon}</span>
                        <span className="text-lg">{link.label}</span>
                    </Link>
                </Button>
            ))}
        </aside>
    );
}
