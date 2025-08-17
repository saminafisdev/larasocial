import { FeedPost } from '@/components/feed/FeedPost';
import EditProfile from '@/components/profile/edit-profile';
import FriendButton from '@/components/profile/friend-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Post } from '@/types/post';
import { Profile } from '@/types/profile';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Cake, Calendar, GraduationCap, HatGlasses, MapPin } from 'lucide-react';

interface Props {
    profile: Profile;
    posts: Post[];
}

export default function ProfilePage({ profile, posts }: Props) {
    const { auth } = usePage<SharedData>().props;

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
                                <div className="text-lg font-bold text-gray-900">{profile.friends_count}</div>
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
                            <FriendButton profileId={profile.id} friendshipStatus={profile.friendship_status} />
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
                    {profile.education && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <GraduationCap className="h-4 w-4" />
                            <span className="text-sm">{profile.education}</span>
                        </div>
                    )}
                    {profile.date_of_birth && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Cake className="h-4 w-4" />
                            <span className="text-sm">{format(profile.date_of_birth, 'MMMM dd')}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Joined {format(profile.created_at, 'MMMM yyyy')}</span>
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
