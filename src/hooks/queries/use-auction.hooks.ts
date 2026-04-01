import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auctionService } from '@/features/auction/api/auction-service';
import { CreateAuctionDto, CreateBidDto } from '@/types/auction.types';
import { toast } from 'sonner';

export const auctionKeys = {
  all: ['auctions'] as const,
  lists: () => [...auctionKeys.all, 'list'] as const,
  list: (filters: string) => [...auctionKeys.lists(), { filters }] as const,
  details: () => [...auctionKeys.all, 'detail'] as const,
  detail: (id: string) => [...auctionKeys.details(), id] as const,
};

export const useAuctions = () => {
  return useQuery({
    queryKey: auctionKeys.lists(),
    queryFn: () => auctionService.getAuctions(),
  });
};

export const useAuctionDetail = (id: string) => {
  return useQuery({
    queryKey: auctionKeys.detail(id),
    queryFn: () => auctionService.getAuctionDetail(id),
    enabled: !!id,
  });
};

export const useCreateAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAuctionDto) => auctionService.createAuction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
      toast.success('Auction posted successfully!');
    },
    onError: (error: any) => {
      console.error('Create auction error:', error);
      toast.error('Failed to post auction. Please try again.');
    },
  });
};

export const usePlaceBid = (auctionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBidDto) => auctionService.placeBid(auctionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.detail(auctionId) });
      toast.success('Bid placed successfully!');
    },
    onError: (error: any) => {
      console.error('Place bid error:', error);
      toast.error('Failed to place bid. You might have already bid on this auction.');
    },
  });
};

export const useAcceptBid = (auctionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bidId: string) => auctionService.acceptBid(bidId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.detail(auctionId) });
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
      toast.success('Bid accepted! A new collaboration has been created.');
    },
    onError: (error: any) => {
      console.error('Accept bid error:', error);
      toast.error('Failed to accept bid.');
    },
  });
};
