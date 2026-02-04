import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { Collaboration, CreateCollaborationDto, UpdateCollaborationStatusDto } from '@/types/collaboration';

class CollaborationService {
    async getCollaborations() {
        return httpService.get<Collaboration[]>(API_CONFIG.path.collaboration.base);
    }

    async getCollaborationById(id: string) {
        return httpService.get<Collaboration>(API_CONFIG.path.collaboration.detail(id));
    }

    async createCollaboration(data: CreateCollaborationDto) {
        return httpService.post<Collaboration>(API_CONFIG.path.collaboration.base, data);
    }

    async updateStatus(id: string, status: UpdateCollaborationStatusDto['status']) {
        return httpService.patch<Collaboration>(API_CONFIG.path.collaboration.status(id), { status });
    }
}

export const collaborationService = new CollaborationService();
