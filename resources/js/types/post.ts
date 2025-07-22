export interface Post {
    id: number;
    profile?: {
        avatar?: string;
        bio?: string;
        updated_at?: string;
        username?: string;
        user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string | null;
            created_at: string;
        };
    };
    avatar?: string;
    content?: string;
    updated_at?: string;
    updated_at_human?: string;
}
