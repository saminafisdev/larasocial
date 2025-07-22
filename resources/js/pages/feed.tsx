import { FeedPost } from '@/components/feed/FeedPost';
import { PostComposer } from '@/components/feed/PostComposer';
import { RightSidebar } from '@/components/feed/RightSidebar';
import { Post } from '@/types/post';

export default function Feed({ posts }: { posts: Post[] }) {
    return (
        <>
            {/* <MainNavbar /> */}
            {/* Main Feed Layout */}
            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="flex w-full max-w-7xl gap-8">
                    {/* Left Sidebar */}
                    {/* <LeftSidebar /> */}
                    {/* Feed Content */}
                    <div className="ml-0 flex flex-1 flex-col gap-6">
                        <PostComposer />
                        {posts.map((post) => (
                            <FeedPost key={post.id} post={post} />
                        ))}
                    </div>
                    {/* Right Sidebar */}
                    <RightSidebar />
                </div>
            </main>
        </>
    );
}
