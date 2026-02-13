import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from '@/services/report.service';
import { CreateReportDto } from '@/types/report.types';
import { toast } from 'sonner';

export const useSubmitReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReportDto) => reportService.submitReport(data),
        onSuccess: () => {
            toast.success('Report submitted successfully');
            queryClient.invalidateQueries({ queryKey: ['reports'] });
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to submit report';
            toast.error(errorMessage);
        },
    });
};
