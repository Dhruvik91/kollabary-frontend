import { Metadata } from 'next';
import { publicService } from '@/services/public.service';
import { PublicInfluencerProfileContainer } from '@/features/influencer/containers/PublicInfluencerProfileContainer';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    try {
        const data = await publicService.getInfluencerPublicData(id);
        const { fullName, username, bio, avatarUrl } = data;
        const name = fullName || 'Influencer';
        const description = bio || `Connect with ${name} on Kollabary.`;
        const avatar = avatarUrl;
        const uname = username || 'user';

        return {
            title: `${name} (@${uname}) | Kollabary Influencer Profile`,
            description: description,
            openGraph: {
                title: `${name} | Kollabary`,
                description: description,
                images: avatar ? [avatar] : [],
                type: 'profile',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${name} | Kollabary`,
                description: description,
                images: avatar ? [avatar] : [],
            },
        };
    } catch (error) {
        return {
            title: 'Influencer Profile | Kollabary',
        };
    }
}

export default async function InfluencerPublicPage({ params }: Props) {
    const { id } = await params;

    try {
        const influencer = await publicService.getInfluencerPublicData(id);

        if (!influencer) {
            notFound();
        }

        return <PublicInfluencerProfileContainer id={id} initialData={influencer} />;
    } catch (error) {
        console.error('Error loading public influencer profile:', error);
        notFound();
    }
}
