import { FeedPost } from '@/components/feed/FeedPost';
import type { Post } from '@/types/post';

export default function Post({ post }: { post: Post }) {
    return <FeedPost post={post} />;
}
