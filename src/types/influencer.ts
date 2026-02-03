export interface Influencer {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bio: string;
    followers: number;
    engagement: number;
    platforms: string[];
    niches: string[];
    verified: boolean;
}
