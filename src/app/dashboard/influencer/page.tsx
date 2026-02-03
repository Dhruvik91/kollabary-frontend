import { InfluencerDashboardContainer } from '@/components/features/dashboard/container/InfluencerDashboardContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Influencer Dashboard',
    description: 'Track your collaborations and earnings.',
};

export default function InfluencerDashboardPage() {
    return (
        <div className="bg-gradient-to-tr from-background via-purple-500/5 to-background min-h-screen">
            <InfluencerDashboardContainer />
        </div>
    );
}
