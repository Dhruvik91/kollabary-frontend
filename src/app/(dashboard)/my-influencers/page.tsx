import { MyInfluencersContainer } from '@/features/influencer/containers/MyInfluencersContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Influencers | Kollabary',
    description: 'View influencers you have collaborated with before.',
};

export default function MyInfluencersPage() {
    return <MyInfluencersContainer />;
}
