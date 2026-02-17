import { useMutation } from '@tanstack/react-query';
import { uploadService } from '@/services/upload.service';
import { toast } from 'sonner';

export function useUploadFile() {
    return useMutation({
        mutationFn: (file: File) => uploadService.uploadFile(file),
        onSuccess: () => {
            toast.success('File uploaded successfully');
        },
        onError: (error: any) => {
            toast.error('Upload failed', {
                description: error.response?.data?.message || 'Something went wrong while uploading',
            });
        },
    });
}
