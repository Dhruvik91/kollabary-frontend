import { InfluencerSetupContainer } from '@/features/influencer/containers/InfluencerSetupContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Influencer Profile Setup',
    description: 'Complete your influencer profile to start collaborating with brands.',
};

export default function InfluencerSetupPage() {
    return <InfluencerSetupContainer />;
}
