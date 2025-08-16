import CommentComposer from '@/components/feed/CommentComposer';
import { FeedPost } from '@/components/feed/FeedPost';
import { SharedData } from '@/types';
import type { Post } from '@/types/post';
import { usePage } from '@inertiajs/react';

export default function Post({ post }: { post: Post }) {
    const { auth } = usePage<SharedData>().props;
    console.log(post);
    return (
        <>
            <FeedPost post={post} />
            <CommentComposer post={post} />
            <div>
                <h2>Comments</h2>
                {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-x-4 border-b border-gray-200 p-4">
                        <div className="flex-shrink-0">
                            {' '}
                            {/* Prevents the image from shrinking */}
                            <img
                                src="https://picsum.photos/id/177/100"
                                alt="Cover"
                                className="h-10 w-10 rounded-full object-cover" // Maintains aspect ratio
                            />
                        </div>
                        <div className="flex-1">
                            {' '}
                            {/* Allows the content to take the remaining space */}
                            <div className="flex gap-x-3">
                                <h4 className="font-bold">{comment.profile.user.name}</h4>
                                <h5 className="text-gray-600">@{comment.profile.username}</h5>
                                <span>&middot;</span>
                                <p className="text-gray-600">{comment.updated_at_human}</p>
                            </div>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
