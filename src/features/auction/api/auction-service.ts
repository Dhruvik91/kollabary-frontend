import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants";
import { Auction, Bid, CreateAuctionDto, CreateBidDto } from "@/types/auction.types";

export const auctionService = {
  getAuctions: async (filters?: { status?: string; category?: string }) => {
    const response = await httpService.get<Auction[]>(API_CONFIG.path.auction.base, { params: filters });
    return response.data;
  },

  getMyAuctions: async () => {
    const response = await httpService.get<Auction[]>(API_CONFIG.path.auction.my);
    return response.data;
  },

  getAuctionDetail: async (id: string) => {
    const response = await httpService.get<Auction>(API_CONFIG.path.auction.detail(id));
    return response.data;
  },

  createAuction: async (data: CreateAuctionDto) => {
    const response = await httpService.post<Auction>(API_CONFIG.path.auction.base, data);
    return response.data;
  },

  placeBid: async (id: string, data: CreateBidDto) => {
    const response = await httpService.post<Bid>(API_CONFIG.path.auction.bids(id), data);
    return response.data;
  },

  acceptBid: async (id: string) => {
    const response = await httpService.post<any>(API_CONFIG.path.auction.acceptBid(id));
    return response.data;
  },

  updateAuction: async (id: string, data: Partial<CreateAuctionDto>) => {
    const response = await httpService.patch<Auction>(API_CONFIG.path.auction.detail(id), data);
    return response.data;
  },

  deleteAuction: async (id: string) => {
    const response = await httpService.delete<void>(API_CONFIG.path.auction.detail(id));
    return response.data;
  },
};
