import { useMutation } from '@tanstack/react-query';
import { uploadService } from '@/services/upload.service';
import { toast } from 'sonner';

export function useFileUpload() {
    return useMutation({
        mutationFn: async (file: File) => {
            return await uploadService.uploadFile(file);
        },
        onSuccess: () => {
            toast.success('File uploaded successfully');
        },
        onError: () => {
            toast.error('Failed to upload file');
        },
    });
}
