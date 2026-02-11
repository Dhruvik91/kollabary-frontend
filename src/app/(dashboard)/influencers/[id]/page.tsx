import { InfluencerDetailContainer } from '@/features/influencer/containers/InfluencerDetailContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Influencer Profile | Kollabary',
    description: 'View detailed influencer profile and stats.',
};

export default function InfluencerProfilePage() {
    return <InfluencerDetailContainer />;
}
