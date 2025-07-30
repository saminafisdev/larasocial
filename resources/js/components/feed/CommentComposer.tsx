import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Post a comment</CardTitle>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <form id="commentForm" onSubmit={postComment}>
                    <Textarea value={data.content} onChange={(e) => setData('content', e.target.value)} />
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" form="commentForm" variant="secondary" size="icon" className="size-8">
                    <SendHorizontal />
                </Button>
            </CardFooter>
        </Card>
    );
}
