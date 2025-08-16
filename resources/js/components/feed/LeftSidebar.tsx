import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell, Bookmark, Gamepad2, House, MessageCircle, RefreshCcw, Settings, Users } from 'lucide-react';

import { useEffect, useState } from 'react';

type WeatherData = {
    location: {
        name: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
};

function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = () => {
        setLoading(true);
        setError(null);
        fetch('http://api.weatherapi.com/v1/current.json?key=2e1dabad87db4ccca6c225439251207&q=Dhaka')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch weather');
                return res.json();
            })
            .then((data) => {
                setWeather(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Could not load weather');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="mt-auto flex min-h-[120px] flex-col items-center justify-center rounded-lg bg-blue-50 p-4 text-center shadow-inner">
            <div className="mb-1 flex items-center justify-center gap-2 text-sm text-gray-500">
                Weather
                <Button
                    onClick={fetchWeather}
                    title="Refresh weather"
                    className="ml-1 rounded p-1 hover:bg-blue-500 focus:outline-none"
                    aria-label="Refresh weather"
                    type="button"
                >
                    <RefreshCcw />
                </Button>
            </div>
            {loading ? (
                <div className="text-sm text-gray-400">Loading...</div>
            ) : error ? (
                <div className="text-sm text-red-500">{error}</div>
            ) : weather ? (
                <>
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src={
                                weather.current.condition.icon.startsWith('//')
                                    ? `https:${weather.current.condition.icon}`
                                    : weather.current.condition.icon
                            }
                            alt={weather.current.condition.text}
                            className="h-10 w-10"
                        />
                        <span className="text-2xl font-bold text-blue-700">{Math.round(weather.current.temp_c)}°C</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        {weather.current.condition.text}, {weather.location.name}
                    </div>
                </>
            ) : null}
        </div>
    );
}

export function LeftSidebar() {
    const links = [
        { href: '/', icon: <House className="h-9 w-9" />, label: 'Home' },
        { href: '/friends', icon: <Users className="h-9 w-9" />, label: 'Friends' },
        { href: '/chat', icon: <MessageCircle className="h-9 w-9" />, label: 'Messages' },
        { href: '/notifications', icon: <Bell className="h-9 w-9" />, label: 'Notifications' },
        { href: '/bookmarks', icon: <Bookmark className="h-9 w-9" />, label: 'Bookmarks' },
        { href: '/games', icon: <Gamepad2 className="h-9 w-9" />, label: 'Games' },
        { href: '/settings', icon: <Settings className="h-9 w-9" />, label: 'Settings' },
    ];

    const { auth } = usePage<SharedData>().props;
    return (
        <aside className="fixed top-[56px] left-0 hidden h-[calc(100vh-56px)] w-80 flex-col overflow-y-auto rounded-lg bg-white p-6 shadow md:flex">
            {/* Profile Button */}
            <Button variant="ghost" className="mb-6 w-full justify-start rounded-lg px-4 py-8 text-lg font-medium hover:bg-gray-100">
                <Link href={`/@${auth.user.profile.username}`} className="flex h-full w-full items-center">
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

            {/* Weather Information */}
            <WeatherWidget />
        </aside>
    );
}
