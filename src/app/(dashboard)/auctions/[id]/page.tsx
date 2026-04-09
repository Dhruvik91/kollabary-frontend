import { AuctionDetailContainer } from '@/features/auction/containers/AuctionDetailContainer';
import { Metadata } from 'next';
import { auctionService } from '@/services/auction.service';

interface AuctionDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: AuctionDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    
    try {
        const auction = await auctionService.getAuctionDetail(id);
        const title = auction.title || 'Auction Detail';
        const description = auction.description || 'Browse and bid on exclusive collaboration opportunities.';
        
        return {
            title: `${title} - Opportunity`,
            description: description,
            openGraph: {
                title: `${title} | Kollabary`,
                description: description,
            },
        };
    } catch (error) {
        return {
            title: 'Auction Detail',
            description: 'View detailed collaboration opportunity.',
        };
    }
}

export default async function AuctionDetailPage({ params }: AuctionDetailPageProps) {
    const { id } = await params;
    return <AuctionDetailContainer id={id} />;
}
