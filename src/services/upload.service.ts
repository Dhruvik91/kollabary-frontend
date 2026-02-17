import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';

export interface UploadResponse {
    url: string;
    key: string;
}

export const uploadService = {
    /**
     * Upload a file to the backend
     */
    uploadFile: async (file: File): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await httpService.post<UploadResponse>(
            API_CONFIG.path.uploads.base,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    },
};
