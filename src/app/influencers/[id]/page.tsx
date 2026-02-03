import { InfluencerDetailContainer } from '@/components/features/influencer/container/InfluencerDetailContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Influencer Profile',
    description: 'View influencer profile and request collaboration.',
};

export default function InfluencerDetailPage() {
    return (
        <div className="bg-gradient-to-tr from-background via-primary/5 to-background min-h-screen">
            <InfluencerDetailContainer />
        </div>
    );
}
