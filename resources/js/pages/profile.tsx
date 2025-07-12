import { RightSidebar } from '@/components/feed/RightSidebar';
import { Button } from '@/components/ui/button';
import { UserRoundPen } from 'lucide-react';

export default function Profile() {
    return (
        <>
            {/* <MainNavbar /> */}
            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="flex w-full max-w-7xl gap-8">
                    {/* <LeftSidebar /> */}
                    <div className="ml-0 flex flex-1 flex-col gap-6">
                        {/* Cover Photo Section */}
                        <div className="relative mb-8 w-full rounded-lg bg-white shadow">
                            <div className="h-48 w-full rounded-t-lg bg-gray-200">
                                <img
                                    src="https://picsum.photos/id/177/1200"
                                    alt="Cover"
                                    className="h-48 w-full rounded-t-lg object-cover"
                                    style={{ objectPosition: 'center' }}
                                />
                            </div>
                            {/* Avatar overlays cover */}
                            <div className="absolute top-36 left-1/2 -translate-x-1/2 transform">
                                <img
                                    src="https://picsum.photos/id/91/600"
                                    alt="Profile"
                                    className="h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md"
                                />
                            </div>
                            {/* Edit Cover button (optional) */}
                            <Button className="absolute top-4 right-4 rounded-full bg-white/80 px-4 py-1 text-sm font-medium text-blue-600 shadow hover:bg-white">
                                Edit Cover
                            </Button>
                            {/* Profile Info below avatar */}
                            <div className="flex flex-col items-center px-4 pt-20 pb-8">
                                <div className="text-2xl font-bold">John Doe</div>
                                <div className="text-lg text-gray-500">@johndoe</div>
                                <div className="mt-2 max-w-xl text-center text-gray-700">
                                    This is a sample profile bio. You can update this section to show user information, interests, and more.
                                </div>
                                <Button className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-base font-medium text-white hover:bg-blue-700">
                                    Edit Profile <UserRoundPen />
                                </Button>
                            </div>
                        </div>
                        {/* Recent Posts */}
                        <div className="mt-2">
                            <h2 className="mb-4 text-xl font-semibold">Recent Posts</h2>
                            <div className="flex flex-col gap-4">
                                {[1, 2, 3].map((id) => (
                                    <div key={id} className="rounded-lg bg-white p-4 shadow">
                                        <div className="font-semibold">Post Title {id}</div>
                                        <div className="mt-1 text-gray-700">This is a sample post content for the profile page.</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <RightSidebar />
                </div>
            </main>
        </>
    );
}
