import { AuctionCreateContainer } from '@/features/auction/containers/AuctionCreateContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Post New Auction | Kollabary',
    description: 'Create a new collaboration auction and find the perfect influencer.',
};

export default function CreateAuctionPage() {
    return <AuctionCreateContainer />;
}
