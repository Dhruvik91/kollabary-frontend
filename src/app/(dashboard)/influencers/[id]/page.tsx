import { InfluencerDetailContainer } from '@/features/influencer/containers/InfluencerDetailContainer';
import { Metadata } from 'next';
import { influencerService } from '@/services/influencer.service';

interface InfluencerProfilePageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: InfluencerProfilePageProps): Promise<Metadata> {
    const { id } = await params;
    
    try {
        const influencer = await influencerService.getInfluencerById(id);
        const name = influencer.user?.profile?.fullName || influencer.fullName || 'Influencer';
        const bio = influencer.bio || influencer.user?.profile?.bio || 'View detailed influencer profile and stats.';
        
        return {
            title: `${name} - Profile`,
            description: bio,
            openGraph: {
                title: `${name} | Kollabary`,
                description: bio,
                images: influencer.avatarUrl ? [influencer.avatarUrl] : undefined,
            },
        };
    } catch (error) {
        return {
            title: 'Influencer Profile',
            description: 'View detailed influencer profile and stats.',
        };
    }
}

export default async function InfluencerProfilePage({ params }: InfluencerProfilePageProps) {
    const { id } = await params;
    return <InfluencerDetailContainer />;
}
