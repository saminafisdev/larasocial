import { RightSidebar } from '@/components/feed/RightSidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@inertiajs/react';
import { HatGlasses } from 'lucide-react';

export default function Friends({ suggestedFriends }) {
    console.log(suggestedFriends);
    return (
        <>
            {/* <MainNavbar /> */}
            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="flex w-full max-w-7xl gap-8">
                    {/* <LeftSidebar /> */}
                    <div className="ml-0 flex max-w-2xl flex-1 flex-col gap-6">
                        <h1 className="mb-4 text-2xl font-bold">Friends</h1>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {suggestedFriends.map((friend) => (
                                <div key={friend.id} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow">
                                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                        <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
                                        <AvatarFallback className="text-2xl">
                                            <HatGlasses className="h-12 w-12" />
                                        </AvatarFallback>
                                    </Avatar>{' '}
                                    <div>
                                        <div className="text-lg font-semibold">{friend.user.name}</div>
                                        <div className="text-sm text-gray-500">@{friend.username}</div>
                                    </div>
                                    <Link
                                        href={`/@${friend.username}`}
                                        className="ml-auto rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        View
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <RightSidebar />
                </div>
            </main>
        </>
    );
}
