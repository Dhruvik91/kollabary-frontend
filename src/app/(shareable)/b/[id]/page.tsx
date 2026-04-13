import { Metadata } from 'next';
import { publicService } from '@/services/public.service';
import { PublicProfileDetailContainer } from '@/features/profile/containers/PublicProfileDetailContainer';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    try {
        const brand = await publicService.getBrandPublicData(id);
        const name = brand.fullName;
        const bio = brand.bio || `View ${name}'s brand profile on Kollabary.`;
        const avatar = brand.avatarUrl;

        return {
            title: `${name} (@${brand.username}) | Kollabary Brand Profile`,
            description: bio,
            openGraph: {
                title: `${name} | Kollabary`,
                description: bio,
                images: avatar ? [avatar] : [],
                type: 'profile',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${name} | Kollabary`,
                description: bio,
                images: avatar ? [avatar] : [],
            },
        };
    } catch (error) {
        return {
            title: 'Brand Profile | Kollabary',
        };
    }
}

export default async function BrandPublicPage({ params }: Props) {
    const { id } = await params;

    try {
        const brand = await publicService.getBrandPublicData(id);

        if (!brand) {
            notFound();
        }

        return <PublicProfileDetailContainer id={id} />;
    } catch (error) {
        console.error('Error loading public brand profile:', error);
        notFound();
    }
}
