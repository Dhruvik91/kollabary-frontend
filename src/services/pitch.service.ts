import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { Pitch, CreatePitchDto, UpdatePitchStatusDto, PaginatedResponse } from '@/types/pitch.types';

export const pitchService = {
    /**
     * Create a new pitch (Influencer only)
     */
    createPitch: async (data: CreatePitchDto): Promise<Pitch> => {
        const response = await httpService.post<Pitch>(API_CONFIG.path.pitch.base, data);
        return response.data;
    },

    /**
     * Fetch pitches sent by the current influencer
     */
    getSentPitches: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Pitch>> => {
        const response = await httpService.get<PaginatedResponse<Pitch>>(API_CONFIG.path.pitch.sent, {
            params
        });
        return response.data;
    },

    /**
     * Fetch pitches received by the current brand/user
     */
    getReceivedPitches: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Pitch>> => {
        const response = await httpService.get<PaginatedResponse<Pitch>>(API_CONFIG.path.pitch.received, {
            params
        });
        return response.data;
    },

    /**
     * Fetch all pitches (Admin only)
     */
    getAllPitches: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Pitch>> => {
        const response = await httpService.get<PaginatedResponse<Pitch>>(API_CONFIG.path.pitch.admin, {
            params
        });
        return response.data;
    },

    /**
     * Fetch detailed information for a single pitch
     */
    getPitchDetail: async (id: string): Promise<Pitch> => {
        const response = await httpService.get<Pitch>(API_CONFIG.path.pitch.detail(id));
        return response.data;
    },

    /**
     * Update pitch status (Target only)
     */
    updatePitchStatus: async (id: string, data: UpdatePitchStatusDto): Promise<Pitch> => {
        const response = await httpService.patch<Pitch>(API_CONFIG.path.pitch.status(id), data);
        return response.data;
    },
};
