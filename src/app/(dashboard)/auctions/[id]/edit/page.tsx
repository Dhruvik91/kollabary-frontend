import { AuctionEditContainer } from '@/features/auction/containers/AuctionEditContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Auction | Kollabary',
    description: 'Update your collaboration auction requirements.',
};

interface EditPageProps {
    params: { id: string };
}

export default async function EditAuctionPage({ params }: EditPageProps) {
    const { id } = await params;
    return <AuctionEditContainer id={id} />;
}
