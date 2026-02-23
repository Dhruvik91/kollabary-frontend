import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants';
import {
    Collaboration,
    CollaborationFilters,
    PaginatedCollaborationsResponse,
    CreateCollaborationDto,
    UpdateCollaborationStatusDto,
    UpdateCollaborationDto
} from '@/types/collaboration.types';

export const collaborationService = {
    /**
     * Fetch collaborations for the current user with optional filters and pagination
     */
    getCollaborations: async (filters?: CollaborationFilters): Promise<PaginatedCollaborationsResponse> => {
        const params: Record<string, string | number> = {};
        if (filters?.status) params.status = filters.status;
        if (filters?.search) params.search = filters.search;
        if (filters?.page) params.page = filters.page;
        if (filters?.limit) params.limit = filters.limit;

        const response = await httpService.get<PaginatedCollaborationsResponse>(
            API_CONFIG.path.collaboration.base,
            { params },
        );
        return response.data;
    },

    /**
     * Fetch details of a specific collaboration
     */
    getCollaborationDetail: async (id: string) => {
        const response = await httpService.get<Collaboration>(
            API_CONFIG.path.collaboration.detail(id)
        );
        return response.data;
    },

    /**
     * Create a new collaboration request
     */
    createCollaboration: async (data: CreateCollaborationDto) => {
        const response = await httpService.post<Collaboration>(
            API_CONFIG.path.collaboration.base,
            data
        );
        return response.data;
    },

    /**
     * Update the status of a collaboration
     */
    updateCollaborationStatus: async (id: string, data: UpdateCollaborationStatusDto) => {
        const response = await httpService.patch<Collaboration>(
            API_CONFIG.path.collaboration.status(id),
            data
        );
        return response.data;
    },

    /**
     * Update collaboration details
     */
    updateCollaboration: async (id: string, data: UpdateCollaborationDto) => {
        const response = await httpService.patch<Collaboration>(
            API_CONFIG.path.collaboration.detail(id),
            data
        );
        return response.data;
    },

    /**
     * Delete a collaboration
     */
    deleteCollaboration: async (id: string) => {
        const response = await httpService.delete<void>(
            API_CONFIG.path.collaboration.detail(id)
        );
        return response.data;
    },
};
