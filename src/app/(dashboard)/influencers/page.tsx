import { InfluencerDiscoverContainer } from '@/features/influencer/containers/InfluencerDiscoverContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Discover Influencers | Kollabary',
    description: 'Find the perfect influencers for your next brand collaboration.',
};

export default function DiscoverPage() {
    return <InfluencerDiscoverContainer />;
}
