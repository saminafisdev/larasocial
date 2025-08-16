import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type Profile } from '@/types/profile';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function EditProfile({ profile }: { profile: Profile }) {
    const [open, setOpen] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        username: profile.username ?? '',
        bio: profile.bio ?? '',
        location: profile.location ?? '',
        education: profile.education ?? '',
    });

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/${profile.username}`, {
            onSuccess: () => {
                setOpen(false);
            },
            onError: (errors) => {
                // Handle errors if needed
                console.error(errors);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form id="profile-form" onSubmit={handleUpdateProfile}>
                <DialogTrigger asChild>
                    <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" defaultValue={data.username} onChange={(e) => setData('username', e.target.value)} />
                            {errors.username && <div className="text-sm font-semibold text-red-500">{errors.username}</div>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" defaultValue={data?.bio ?? ''} onChange={(e) => setData('bio', e.target.value)} />
                            {errors.bio && <div className="text-sm font-semibold text-red-500">{errors.bio}</div>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                defaultValue={data.location ?? ''}
                                onChange={(e) => setData('location', e.target.value)}
                            />
                            {errors.location && <div className="text-sm font-semibold text-red-500">{errors.location}</div>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="education">Education</Label>
                            <Input
                                id="education"
                                name="education"
                                defaultValue={data.education ?? ''}
                                onChange={(e) => setData('education', e.target.value)}
                            />
                            {errors.education && <div className="text-sm font-semibold text-red-500">{errors.education}</div>}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button form="profile-form" type="submit" disabled={processing}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
