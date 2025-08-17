import { User } from '.';

export interface Profile {
    id: number;
    userId: number;
    user: User;
    username: string;
    bio?: string | null;
    avatar?: string | null;
    location?: string | null;
    education?: string | null;
    date_of_birth?: string | null;
    created_at: Date;
    updated_at: Date;
    posts_count?: number | null;
    friendship_status?: 'pending_received' | 'pending_sent' | 'friends' | 'rejected' | null;
    friends_count: number;
}
