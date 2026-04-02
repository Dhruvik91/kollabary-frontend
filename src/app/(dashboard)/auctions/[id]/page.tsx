import { Metadata } from 'next';
import { use } from 'react';
import { auctionService } from '@/services/auction.service';
import { AuctionDetailContainer } from '@/features/auction/containers/AuctionDetailContainer';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { id } = await params;
        const auction = await auctionService.getAuctionDetail(id);
        return {
            title: `${auction.title} | Auctions | Kollabary`,
            description: auction.description.substring(0, 160),
            openGraph: {
                title: auction.title,
                description: auction.description.substring(0, 160),
                type: 'article',
            }
        };
    } catch {
        return {
            title: 'Auction Details | Kollabary',
        };
    }
}

export default function AuctionDetailPage({ params }: Props) {
    const { id } = use(params);
    return <AuctionDetailContainer id={id} />;
}
