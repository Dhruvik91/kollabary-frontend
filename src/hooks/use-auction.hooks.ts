import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auctionService } from '@/services/auction.service';
import { CreateAuctionDto, CreateBidDto } from '@/types/auction.types';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSocket } from '@/contexts/socket-context';

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
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleAuctionCreated = () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
    };

    const handleAuctionDeleted = () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
    };

    socket.on('auction_created', handleAuctionCreated);
    socket.on('auction_deleted', handleAuctionDeleted);

    return () => {
      socket.off('auction_created', handleAuctionCreated);
      socket.off('auction_deleted', handleAuctionDeleted);
    };
  }, [socket, queryClient]);

  return useQuery({
    queryKey: auctionKeys.list(filters),
    queryFn: () => auctionService.getAuctions(filters),
  });
};

export const useInfiniteAuctions = (filters?: any) => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleAuctionCreated = () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
    };

    const handleAuctionDeleted = () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
    };

    socket.on('auction_created', handleAuctionCreated);
    socket.on('auction_deleted', handleAuctionDeleted);

    return () => {
      socket.off('auction_created', handleAuctionCreated);
      socket.off('auction_deleted', handleAuctionDeleted);
    };
  }, [socket, queryClient]);

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
    const queryClient = useQueryClient();
    const { socket } = useSocket();

    useEffect(() => {
      if (!socket || !options?.enabled) return;

      const handleAuctionEvents = () => {
        queryClient.invalidateQueries({ queryKey: auctionKeys.myAuctions() });
      };

      socket.on('auction_created', handleAuctionEvents);
      socket.on('auction_updated', handleAuctionEvents);
      socket.on('auction_deleted', handleAuctionEvents);

      return () => {
        socket.off('auction_created', handleAuctionEvents);
        socket.off('auction_updated', handleAuctionEvents);
        socket.off('auction_deleted', handleAuctionEvents);
      };
    }, [socket, queryClient, options?.enabled]);

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
    const queryClient = useQueryClient();
    const { socket } = useSocket();

    useEffect(() => {
      if (!socket || !options?.enabled) return;

      const handleBidEvents = () => {
        queryClient.invalidateQueries({ queryKey: auctionKeys.myBids() });
      };

      socket.on('new_bid', handleBidEvents);
      socket.on('bid_accepted', handleBidEvents);
      socket.on('bid_rejected', handleBidEvents);

      return () => {
        socket.off('new_bid', handleBidEvents);
        socket.off('bid_accepted', handleBidEvents);
        socket.off('bid_rejected', handleBidEvents);
      };
    }, [socket, queryClient, options?.enabled]);

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
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket || !id) return;

    // Join the auction room
    socket.emit('join_auction', id);

    const handleNewBid = (newBid: any) => {
      // Update auction detail with new bid
      queryClient.setQueryData(auctionKeys.detail(id), (oldData: any) => {
        if (!oldData) return oldData;
        const updatedBids = [newBid, ...(oldData.bids || [])];
        return { ...oldData, bids: updatedBids };
      });
      toast.info(`New bid placed: $${newBid.amount}`);
    };

    const handleAuctionUpdated = (updatedAuction: any) => {
      queryClient.setQueryData(auctionKeys.detail(id), updatedAuction);
    };

    const handleAuctionDeleted = () => {
      toast.error('This auction has been deleted');
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
    };

    const handleBidAccepted = () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.detail(id) });
      toast.success('A bid has been accepted!');
    };

    socket.on('new_bid', handleNewBid);
    socket.on('auction_updated', handleAuctionUpdated);
    socket.on('auction_deleted', handleAuctionDeleted);
    socket.on('bid_accepted', handleBidAccepted);

    return () => {
      socket.emit('leave_auction', id);
      socket.off('new_bid', handleNewBid);
      socket.off('auction_updated', handleAuctionUpdated);
      socket.off('auction_deleted', handleAuctionDeleted);
      socket.off('bid_accepted', handleBidAccepted);
    };
  }, [socket, id, queryClient]);

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
