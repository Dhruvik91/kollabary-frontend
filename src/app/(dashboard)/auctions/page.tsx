import { AuctionListContainer } from '@/features/auction/containers/AuctionListContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Collaboration Auctions | Kollabary',
    description: 'Browse and bid on exclusive collaboration opportunities from top brands.',
};

export default function AuctionsPage() {
    return <AuctionListContainer />;
}
