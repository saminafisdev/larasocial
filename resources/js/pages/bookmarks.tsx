import { FeedPost } from '@/components/feed/FeedPost';

export default function BookmarksPage({ bookmarks }) {
    return (
        <div className="p-4">
            <h1 className="mb-4 text-3xl font-bold">Bookmarks</h1>
            <div className="space-y-4">
                {bookmarks.length > 0 ? (
                    bookmarks.map((bookmark) => <FeedPost key={bookmark.id} post={bookmark.post} />)
                ) : (
                    <p className="text-center">Bookmark a post to easily access later.</p>
                )}
            </div>
        </div>
    );
}
