import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { Collaboration } from '@/constants/interface';

class CollaborationService {
    async getMyCollaborations(): Promise<Collaboration[]> {
        const response = await httpService.get<Collaboration[]>(
            API_CONFIG.path.collaboration.base
        );
        return response.data;
    }

    async getById(id: string): Promise<Collaboration> {
        const response = await httpService.get<Collaboration>(
            API_CONFIG.path.collaboration.detail(id)
        );
        return response.data;
    }

    async create(data: any): Promise<Collaboration> {
        const response = await httpService.post<Collaboration>(
            API_CONFIG.path.collaboration.base,
            data
        );
        return response.data;
    }

    async updateStatus(id: string, status: string): Promise<Collaboration> {
        const response = await httpService.patch<Collaboration>(
            API_CONFIG.path.collaboration.status(id),
            { status }
        );
        return response.data;
    }
}

export default new CollaborationService();
