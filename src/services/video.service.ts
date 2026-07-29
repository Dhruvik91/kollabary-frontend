import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import {
  VideoForSale,
  CreateVideoForSaleDto,
  UpdateVideoForSaleDto,
  SearchVideosForSaleDto,
  PaginatedResponse,
} from '@/types/video.types';

/**
 * Video service
 * Handles all video-for-sale related API calls
 */
export const videoService = {
  /**
   * Post a new video for sale (Influencer only)
   */
  async createVideo(dto: CreateVideoForSaleDto): Promise<VideoForSale> {
    const response = await httpService.post<VideoForSale>(API_CONFIG.path.videoForSale.base, dto);
    return response.data;
  },

  /**
   * List and search all videos for sale
   */
  async getVideos(dto: SearchVideosForSaleDto): Promise<PaginatedResponse<VideoForSale>> {
    const response = await httpService.get<PaginatedResponse<VideoForSale>>(
      API_CONFIG.path.videoForSale.base,
      {
        params: dto,
      }
    );
    return response.data;
  },

  /**
   * List current influencer’s videos for sale
   */
  async getMyVideos(params?: { page?: number; limit?: number }): Promise<PaginatedResponse<VideoForSale>> {
    const response = await httpService.get<PaginatedResponse<VideoForSale>>(
      API_CONFIG.path.videoForSale.my,
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Get details of a video for sale
   */
  async getVideoDetail(id: string): Promise<VideoForSale> {
    const response = await httpService.get<VideoForSale>(API_CONFIG.path.videoForSale.detail(id));
    return response.data;
  },

  /**
   * Update a video for sale
   */
  async updateVideo(id: string, dto: UpdateVideoForSaleDto): Promise<VideoForSale> {
    const response = await httpService.patch<VideoForSale>(API_CONFIG.path.videoForSale.detail(id), dto);
    return response.data;
  },

  /**
   * Delete a video for sale (Owner or Admin only)
   */
  async deleteVideo(id: string): Promise<void> {
    const response = await httpService.delete<void>(API_CONFIG.path.videoForSale.detail(id));
    return response.data;
  },
};
