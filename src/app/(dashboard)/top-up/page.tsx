import { TopUpContainer } from '@/features/top-up/TopUpContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Top Up KC Coins | Kollabary',
    description: 'Purchase KC coins to boost your collaborations and auctions.',
};

export default function TopUpPage() {
    return <TopUpContainer />;
}
