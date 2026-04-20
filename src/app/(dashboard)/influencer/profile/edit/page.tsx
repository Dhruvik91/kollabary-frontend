import { InfluencerEditContainer } from '@/features/influencer/containers/InfluencerEditContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Profile',
    description: 'Update your influencer profile and manage your professional presence.',
};

export default function InfluencerEditPage() {
    return <InfluencerEditContainer />;
}
