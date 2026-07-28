import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { videoService } from '@/services/video.service';
import {
  VideoForSale,
  CreateVideoForSaleDto,
  UpdateVideoForSaleDto,
  SearchVideosForSaleDto,
  PaginatedResponse,
} from '@/types/video.types';
import { toast } from 'sonner';

export const videoKeys = {
  all: ['videos-for-sale'] as const,
  lists: () => [...videoKeys.all, 'list'] as const,
  list: (filters: SearchVideosForSaleDto) => [...videoKeys.lists(), filters] as const,
  myLists: () => [...videoKeys.all, 'my-list'] as const,
  myList: (params?: { page?: number; limit?: number }) => [...videoKeys.myLists(), params] as const,
  details: () => [...videoKeys.all, 'detail'] as const,
  detail: (id: string) => [...videoKeys.details(), id] as const,
};

export const useVideos = (filters: SearchVideosForSaleDto) => {
  return useQuery({
    queryKey: videoKeys.list(filters),
    queryFn: () => videoService.getVideos(filters),
  });
};

export const useInfiniteVideos = (filters: SearchVideosForSaleDto, options?: any) => {
  return useInfiniteQuery<PaginatedResponse<VideoForSale>, Error>({
    queryKey: [...videoKeys.lists(), 'infinite', filters],
    queryFn: ({ pageParam }) =>
      videoService.getVideos({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined,
    ...options,
  });
};

export const useMyVideos = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: videoKeys.myList(params),
    queryFn: () => videoService.getMyVideos(params),
  });
};

export const useInfiniteMyVideos = (limit = 10, options?: any) => {
  return useInfiniteQuery<PaginatedResponse<VideoForSale>, Error>({
    queryKey: [...videoKeys.myLists(), 'infinite', { limit }],
    queryFn: ({ pageParam }) =>
      videoService.getMyVideos({ page: pageParam as number, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined,
    ...options,
  });
};

export const useVideoDetail = (id: string) => {
  return useQuery({
    queryKey: videoKeys.detail(id),
    queryFn: () => videoService.getVideoDetail(id),
    enabled: !!id,
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateVideoForSaleDto) => videoService.createVideo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.all });
      toast.success('Video for sale posted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to post video');
    },
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVideoForSaleDto }) =>
      videoService.updateVideo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: videoKeys.all });
      queryClient.invalidateQueries({ queryKey: videoKeys.detail(id) });
      toast.success('Video details updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update video');
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => videoService.deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.all });
      toast.success('Video deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete video');
    },
  });
};
