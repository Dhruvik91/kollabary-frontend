import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { Auction, Bid, CreateAuctionDto, CreateBidDto } from '@/types/auction.types';

export const auctionService = {
    /**
     * Fetch all collaboration auctions with optional filters
     */
    getAuctions: async (filters?: { status?: string; category?: string }): Promise<Auction[]> => {
        const response = await httpService.get<Auction[]>(API_CONFIG.path.auction.base, { 
            params: filters 
        });
        return response.data;
    },

    /**
     * Fetch auctions created by the current user
     */
    getMyAuctions: async (): Promise<Auction[]> => {
        const response = await httpService.get<Auction[]>(API_CONFIG.path.auction.my);
        return response.data;
    },

    /**
     * Fetch detailed information for a single auction
     */
    getAuctionDetail: async (id: string): Promise<Auction> => {
        const response = await httpService.get<Auction>(API_CONFIG.path.auction.detail(id));
        return response.data;
    },

    /**
     * Create a new collaboration auction
     */
    createAuction: async (data: CreateAuctionDto): Promise<Auction> => {
        const response = await httpService.post<Auction>(API_CONFIG.path.auction.base, data);
        return response.data;
    },

    /**
     * Place a bid on an active auction
     */
    placeBid: async (id: string, data: CreateBidDto): Promise<Bid> => {
        const response = await httpService.post<Bid>(API_CONFIG.path.auction.bids(id), data);
        return response.data;
    },

    /**
     * Accept a specific bid for an auction
     */
    acceptBid: async (id: string): Promise<void> => {
        const response = await httpService.post<void>(API_CONFIG.path.auction.acceptBid(id));
        return response.data;
    },

    /**
     * Update an existing auction's details
     */
    updateAuction: async (id: string, data: Partial<CreateAuctionDto>): Promise<Auction> => {
        const response = await httpService.patch<Auction>(API_CONFIG.path.auction.detail(id), data);
        return response.data;
    },

    /**
     * Delete an auction
     */
    deleteAuction: async (id: string): Promise<void> => {
        const response = await httpService.delete<void>(API_CONFIG.path.auction.detail(id));
        return response.data;
    },
};
