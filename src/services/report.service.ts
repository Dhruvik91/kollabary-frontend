import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { CreateReportDto, Report } from '@/types/report.types';

export const reportService = {
    submitReport: async (data: CreateReportDto): Promise<Report> => {
        const response = await httpService.post<Report>(API_CONFIG.path.report.base, data);
        return response.data;
    },

    deleteReport: async (id: string): Promise<void> => {
        await httpService.post(API_CONFIG.path.report.delete(id));
    },
};
