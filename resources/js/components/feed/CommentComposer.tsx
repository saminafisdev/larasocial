import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@/types/post';
import { useForm } from '@inertiajs/react';
import { SendHorizontal } from 'lucide-react';

export default function CommentComposer({ post }: { post: Post }) {
    const {
        data,
        setData,
        post: postHook,
        reset,
    } = useForm({
        content: '',
    });

    const postComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postHook(`/${post.profile?.username}/posts/${post.id}/comments`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Post a comment</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={postComment}>
                    <div className="flex flex-col items-end rounded-lg border border-input focus-within:border-ring">
                        <Textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="flex-1 resize-none rounded-md border-none shadow-none focus-visible:border-none focus-visible:ring-0"
                            required
                        />
                        <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className={`rounded-full ${!data.content ? 'cursor-not-allowed' : 'cursor-pointer'} group`}
                            disabled={!data.content}
                        >
                            <SendHorizontal className="text-gray-400 transition-colors group-hover:text-blue-500" />
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
