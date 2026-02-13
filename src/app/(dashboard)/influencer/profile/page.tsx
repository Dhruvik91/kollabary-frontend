import { InfluencerMyProfileContainer } from '@/features/influencer/containers/InfluencerMyProfileContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Profile | Kollabary',
    description: 'Manage your creator profile and track your performance.',
};

export default function InfluencerProfilePage() {
    return <InfluencerMyProfileContainer />;
}
