import CommentComposer from '@/components/feed/CommentComposer';
import { FeedPost } from '@/components/feed/FeedPost';
import type { Post } from '@/types/post';

export default function Post({ post }: { post: Post }) {
    console.log(post);
    return (
        <>
            <FeedPost post={post} />
            <CommentComposer post={post} />
            <div>
                <h2>Comments</h2>
                {post.comments.map((comment) => (
                    <div>
                        <h4>{comment.profile.username}</h4>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
