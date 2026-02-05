import { useMutation } from '@tanstack/react-query';
import { reportService } from '@/services/report.service';
import { CreateReportDto } from '@/types/report';

export function useCreateReport() {
    return useMutation({
        mutationFn: async (data: CreateReportDto) => {
            const response = await reportService.createReport(data);
            return response.data;
        },
    });
}

export function useDeleteReport() {
    return useMutation({
        mutationFn: async (id: string) => {
            await reportService.deleteReport(id);
        },
    });
}
