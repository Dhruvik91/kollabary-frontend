import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auctionService } from '@/services/auction.service';
import { CreateAuctionDto, CreateBidDto } from '@/types/auction.types';
import { toast } from 'sonner';

export const auctionKeys = {
  all: ['auctions'] as const,
  lists: () => [...auctionKeys.all, 'list'] as const,
  list: (filters: any) => [...auctionKeys.lists(), filters] as const,
  details: () => [...auctionKeys.all, 'detail'] as const,
  detail: (id: string) => [...auctionKeys.details(), id] as const,
  myBids: () => [...auctionKeys.all, 'my-bids'] as const,
  myAuctions: () => [...auctionKeys.all, 'my-auctions'] as const,
};

export const useAuctions = (filters?: any) => {
  return useQuery({
    queryKey: auctionKeys.list(filters),
    queryFn: () => auctionService.getAuctions(filters),
  });
};

export const useInfiniteAuctions = (filters?: any) => {
  return useInfiniteQuery({
    queryKey: [...auctionKeys.list(filters), 'infinite'],
    queryFn: ({ pageParam = 1 }) => 
      auctionService.getAuctions({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useMyAuctions = () => {
  return useQuery({
    queryKey: auctionKeys.myAuctions(),
    queryFn: () => auctionService.getMyAuctions(),
  });
};

export const useInfiniteMyAuctions = (options?: { enabled?: boolean }) => {
    return useInfiniteQuery({
      queryKey: [...auctionKeys.myAuctions(), 'infinite'],
      queryFn: ({ pageParam = 1 }) => 
        auctionService.getMyAuctions({ page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.page < lastPage.meta.totalPages) {
          return lastPage.meta.page + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      enabled: options?.enabled ?? true,
    });
};

export const useMyBids = () => {
  return useQuery({
    queryKey: auctionKeys.myBids(),
    queryFn: () => auctionService.getMyBids(),
  });
};

export const useInfiniteMyBids = (options?: { enabled?: boolean }) => {
    return useInfiniteQuery({
      queryKey: [...auctionKeys.myBids(), 'infinite'],
      queryFn: ({ pageParam = 1 }) => 
        auctionService.getMyBids({ page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.page < lastPage.meta.totalPages) {
          return lastPage.meta.page + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      enabled: options?.enabled ?? true,
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
      queryClient.invalidateQueries({ queryKey: auctionKeys.myAuctions() });
      toast.success('Auction created successfully!');
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
  });
};

export const useDeleteAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => auctionService.deleteAuction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: auctionKeys.myAuctions() });
      toast.success('Auction deleted successfully!');
    },
  });
};

export const usePlaceBid = (auctionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBidDto) => auctionService.placeBid(auctionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.detail(auctionId) });
      queryClient.invalidateQueries({ queryKey: auctionKeys.myBids() });
      toast.success('Bid placed successfully!');
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
      toast.success('Bid accepted successfully!');
    },
  });
};

export const useRejectBid = (auctionId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (bidId: string) => auctionService.rejectBid(bidId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: auctionKeys.detail(auctionId) });
        toast.success('Bid rejected successfully');
      },
    });
};
