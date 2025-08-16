export interface Profile {
    id: number;
    userId: number;
    username: string;
    bio?: string | null;
    avatar?: string | null;
    location?: string | null;
    createdAt: Date;
    updatedAt: Date;
    posts_count?: number | null;
    friendship_status?: 'pending_received' | 'pending_sent' | 'friends' | 'rejected' | null;
    friends_count: number;
}
