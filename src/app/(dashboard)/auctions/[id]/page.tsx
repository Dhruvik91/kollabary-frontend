import { Metadata } from 'next';
import { auctionService } from '@/services/auction.service';
import { AuctionDetailContainer } from '@/features/auction/containers/AuctionDetailContainer';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const auction = await auctionService.getAuctionDetail(params.id);
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
    return <AuctionDetailContainer id={params.id} />;
}
