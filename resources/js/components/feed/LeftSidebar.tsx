import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Bell, House, MessageCircle, Settings, Users } from 'lucide-react';

export function LeftSidebar() {
    const links = [
        { href: '/', icon: <House className="h-9 w-9" />, label: 'Home' },
        { href: '/friends', icon: <Users className="h-9 w-9" />, label: 'Friends' },
        { href: '/messages', icon: <MessageCircle className="h-9 w-9" />, label: 'Messages' },
        { href: '/notifications', icon: <Bell className="h-9 w-9" />, label: 'Notifications' },
        { href: '/settings', icon: <Settings className="h-9 w-9" />, label: 'Settings' },
    ];
    return (
        <aside className="fixed top-[56px] left-0 hidden h-[calc(100vh-56px)] w-80 flex-col overflow-y-auto rounded-lg bg-white p-6 shadow md:flex">
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
