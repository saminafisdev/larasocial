// import { RightSidebar } from '@/components/feed/RightSidebar';
// import { Button } from '@/components/ui/button';
// import { SharedData } from '@/types';
// import type { Profile } from '@/types/profile';
// import { usePage } from '@inertiajs/react';
// import { UserRoundPen } from 'lucide-react';

// export default function Profile({ profile }: { profile: Profile }) {
//     const { auth } = usePage<SharedData>().props;

//     return (
//         <>
//             {/* <MainNavbar /> */}
//             <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
//                 <div className="flex w-full max-w-7xl gap-8">
//                     {/* <LeftSidebar /> */}
//                     <div className="ml-0 flex flex-1 flex-col gap-6">
//                         {/* Cover Photo Section */}
//                         <div className="relative mb-8 w-full rounded-lg bg-white shadow">
//                             <div className="h-48 w-full rounded-t-lg bg-gray-200">
//                                 <img
//                                     src="https://picsum.photos/id/177/1200"
//                                     alt="Cover"
//                                     className="h-48 w-full rounded-t-lg object-cover"
//                                     style={{ objectPosition: 'center' }}
//                                 />
//                             </div>
//                             {/* Avatar overlays cover */}
//                             <div className="absolute top-36 left-1/2 -translate-x-1/2 transform">
//                                 <img
//                                     src="https://picsum.photos/id/91/600"
//                                     alt="Profile"
//                                     className="h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md"
//                                 />
//                             </div>
//                             {/* Edit Cover button (optional) */}
//                             <Button className="absolute top-4 right-4 rounded-full bg-white/80 px-4 py-1 text-sm font-medium text-blue-600 shadow hover:bg-white">
//                                 Edit Cover
//                             </Button>
//                             {/* Profile Info below avatar */}
//                             <div className="flex flex-col items-center px-4 pt-20 pb-8">
//                                 <div className="text-2xl font-bold">{auth.user?.name}</div>
//                                 <div className="text-lg text-gray-500">@{profile.username}</div>
//                                 {profile.bio && <div className="mt-2 max-w-xl text-center text-gray-700">{profile.bio}</div>}
//                                 <Button className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-base font-medium text-white hover:bg-blue-700">
//                                     Edit Profile <UserRoundPen />
//                                 </Button>
//                             </div>
//                         </div>
//                         {/* Recent Posts */}
//                         <div className="mt-2">
//                             <h2 className="mb-4 text-xl font-semibold">Recent Posts</h2>
//                             <div className="flex flex-col gap-4">
//                                 {[1, 2, 3].map((id) => (
//                                     <div key={id} className="rounded-lg bg-white p-4 shadow">
//                                         <div className="font-semibold">Post Title {id}</div>
//                                         <div className="mt-1 text-gray-700">This is a sample post content for the profile page.</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                     <RightSidebar />
//                 </div>
//             </main>
//         </>
//     );
// }

import { FeedPost } from '@/components/feed/FeedPost';
import EditProfile from '@/components/profile/edit-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Post } from '@/types/post';
import { Profile } from '@/types/profile';
import { usePage } from '@inertiajs/react';
import { Calendar, GraduationCap, HatGlasses, MapPin, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';

interface Props {
    profile: Profile;
    posts: Post[];
}

export default function ProfilePage({ profile, posts }: Props) {
    const { auth } = usePage<SharedData>().props;
    // const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cover Photo Section */}
            <div className="relative">
                <div className="h-48 overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 sm:h-64 md:h-80">
                    <img src="/placeholder.svg?height=320&width=800" alt="Cover photo" className="h-full w-full object-cover" />
                </div>

                {/* Profile Picture */}
                <div className="absolute -bottom-16 left-4 sm:left-8">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                        <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
                        <AvatarFallback className="text-2xl">
                            <HatGlasses className="h-12 w-12" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Profile Info Section */}
            <div className="px-4 pt-20 pb-6 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{profile.user.name}</h1>
                        <p className="mt-1 text-gray-600">@{profile.username}</p>

                        {/* Bio */}
                        {profile.bio && <p className="mt-4 leading-relaxed text-gray-700">{profile.bio}</p>}

                        {/* Stats */}
                        <div className="mt-4 flex gap-6">
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">1,234</div>
                                <div className="text-sm text-gray-600">Friends</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{profile.posts_count}</div>
                                <div className="text-sm text-gray-600">Posts</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {auth.user?.id === profile.user.id ? (
                        <EditProfile profile={profile} />
                    ) : (
                        <div className="flex gap-2 sm:mt-0">
                            <Button
                                onClick={handleFollow}
                                className={`px-6 ${isFollowing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                <UserRoundPlus /> Add Friend
                            </Button>
                            <Button variant="outline" className="bg-transparent px-6">
                                Message
                            </Button>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                <div className="mt-6 flex flex-wrap gap-4">
                    {profile.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{profile.location}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                        <GraduationCap className="h-4 w-4" />
                        <span className="text-sm">Stanford University</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Joined March 2020</span>
                    </div>
                </div>

                {/* Interests/Skills */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">UX Design</Badge>
                    <Badge variant="secondary">Photography</Badge>
                    <Badge variant="secondary">Hiking</Badge>
                    <Badge variant="secondary">Travel</Badge>
                    <Badge variant="secondary">Coffee</Badge>
                </div>
            </div>

            {/* Posts Section */}
            <div className="px-4 pb-8 sm:px-8">
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="mb-6 text-xl font-semibold text-gray-900">Recent Posts</h2>

                    {posts.length > 0 ? (
                        <>
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <FeedPost key={post.id} post={post} />
                                ))}
                            </div>
                            {/* Load More Button */}
                            <div className="mt-8 text-center">
                                <Button variant="outline" className="bg-transparent px-8">
                                    Load More Posts
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center">No posts to show</p>
                    )}
                </div>
            </div>
        </div>
    );
}
