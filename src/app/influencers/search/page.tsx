import { InfluencerSearchContainer } from '@/components/features/influencer/container/InfluencerSearchContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Search Influencers',
    description: 'Find and collaborate with top social media influencers.',
};

export default function InfluencersSearchPage() {
    return (
        <div className="bg-gradient-to-br from-background via-purple-500/5 to-background min-h-screen">
            <InfluencerSearchContainer />
        </div>
    );
}
