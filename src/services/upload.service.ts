import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';

export interface UploadResponse {
    url: string;
}

class UploadService {
    async uploadFile(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await httpService.post<UploadResponse>(
            API_CONFIG.path.uploads,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data;
    }
}

export const uploadService = new UploadService();
