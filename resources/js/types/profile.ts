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
}
