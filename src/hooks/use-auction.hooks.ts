import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auctionService } from '@/services/auction.service';
import { CreateAuctionDto, CreateBidDto } from '@/types/auction.types';
import { toast } from 'sonner';

export const auctionKeys = {
  all: ['auctions'] as const,
  lists: () => [...auctionKeys.all, 'list'] as const,
  list: (filters: string) => [...auctionKeys.lists(), { filters }] as const,
  details: () => [...auctionKeys.all, 'detail'] as const,
  detail: (id: string) => [...auctionKeys.details(), id] as const,
  myBids: () => [...auctionKeys.all, 'my-bids'] as const,
  myAuctions: () => [...auctionKeys.all, 'my-auctions'] as const,
};

export const useAuctions = () => {
  return useQuery({
    queryKey: auctionKeys.lists(),
    queryFn: () => auctionService.getAuctions(),
  });
};

export const useMyAuctions = () => {
  return useQuery({
    queryKey: auctionKeys.myAuctions(),
    queryFn: () => auctionService.getMyAuctions(),
  });
};

export const useMyBids = () => {
  return useQuery({
    queryKey: auctionKeys.myBids(),
    queryFn: () => auctionService.getMyBids(),
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
    onError: (error: unknown) => {
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
    onError: (error: unknown) => {
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
    onError: (error: unknown) => {
      console.error('Accept bid error:', error);
      toast.error('Failed to accept bid.');
    },
  });
};

export const useRejectBid = (auctionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bidId: string) => auctionService.rejectBid(bidId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.detail(auctionId) });
      toast.success('Bid rejected.');
    },
    onError: (error: unknown) => {
      console.error('Reject bid error:', error);
      toast.error('Failed to reject bid.');
    },
  });
};

export const useUpdateAuction = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CreateAuctionDto>) => auctionService.updateAuction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
      toast.success('Auction updated successfully!');
    },
    onError: (error: unknown) => {
      console.error('Update auction error:', error);
      toast.error('Failed to update auction.');
    },
  });
};

export const useDeleteAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => auctionService.deleteAuction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
      toast.success('Auction deleted successfully.');
    },
    onError: (error: unknown) => {
      console.error('Delete auction error:', error);
      toast.error('Failed to delete auction.');
    },
  });
};
