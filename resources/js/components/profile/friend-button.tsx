import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type Profile } from '@/types/profile';
import { router } from '@inertiajs/react';
import { Heart, HeartCrack, UserRoundCheck, UserRoundCog, UserRoundMinus, UserRoundPlus, UserRoundX } from 'lucide-react';
import { toast } from 'sonner';

export default function FriendButton({ profileId, friendshipStatus }: { profileId: number; friendshipStatus: Profile['friendship_status'] }) {
    const handleSendRequest = () => {
        router.post(
            `/friends/request/${profileId}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Friend request sent!');
                },
            },
        );
    };

    const handleAcceptRequest = () => {
        router.post(
            `/friends/accept/${profileId}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Friend request accepted!', {
                        icon: <Heart className="h-5 w-5 fill-red-500 text-red-500" />,
                    });
                },
            },
        );
    };

    const handleRejectRequest = () => {
        router.post(
            `/friends/reject/${profileId}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.error('Friend request declined!', {
                        icon: <HeartCrack className="h-5 w-5 text-red-500" />,
                    });
                },
            },
        );
    };

    const handleCancelRequest = () => {
        router.post(
            `/friends/cancel/${profileId}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Friend request cancelled!');
                },
            },
        );
    };

    const handleUnfriendRequest = () => {
        router.post(
            `/friends/unfriend/${profileId}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Unfriended', {
                        icon: <HeartCrack className="h-5 w-5 text-red-500" />,
                    });
                },
            },
        );
    };

    let friendBtn;

    switch (friendshipStatus) {
        case 'friends':
            friendBtn = (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="px-6" variant="outline">
                            <UserRoundCheck /> Friends
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleUnfriendRequest}>
                            <HeartCrack className="text-red-500" /> Unfriend
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
            break;
        case 'pending_sent':
            friendBtn = (
                <Button className="px-6" onClick={handleCancelRequest}>
                    <UserRoundMinus /> Cancel Request
                </Button>
            );
            break;
        case 'pending_received':
            friendBtn = (
                <div>
                    {/* <button onClick={handleAcceptRequest} className="btn btn-sm btn-success">
                            Accept
                        </button>
                        <button onClick={handleRejectRequest} className="btn btn-sm btn-danger">
                            Reject
                        </button> */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="px-6">
                                <UserRoundCog /> Respond
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleAcceptRequest}>
                                <UserRoundCheck /> Accept
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleRejectRequest}>
                                <UserRoundX /> Decline
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
            break;
        case 'rejected':
            friendBtn = (
                <div>
                    <span className="text-red-500">Request rejected ❌</span>
                    <button onClick={handleSendRequest} className="btn btn-sm btn-outline">
                        Send Again
                    </button>
                </div>
            );
            break;
        default:
            friendBtn = (
                <Button className="px-6" onClick={handleSendRequest}>
                    <UserRoundPlus /> Add Friend
                </Button>
            );
    }
    return friendBtn;
}
