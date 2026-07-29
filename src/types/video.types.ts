import { User } from './auth.types';

export interface VideoForSale {
  id: string;
  influencerId: string;
  influencer?: User;
  title: string;
  description?: string;
  videoUrl: string;
  price?: number;
  categories?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateVideoForSaleDto {
  title: string;
  description?: string;
  videoUrl: string;
  price?: number;
  categories?: string[];
}

export interface UpdateVideoForSaleDto {
  title?: string;
  description?: string;
  videoUrl?: string;
  price?: number;
  categories?: string[];
}

export interface SearchVideosForSaleDto {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  influencerId?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
