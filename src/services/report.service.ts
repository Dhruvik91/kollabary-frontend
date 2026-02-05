import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { Report, CreateReportDto } from '@/types/report';

class ReportService {
    async createReport(data: CreateReportDto) {
        return httpService.post<Report>(API_CONFIG.path.report.base, data);
    }

    async deleteReport(id: string) {
        return httpService.post<void>(API_CONFIG.path.report.delete(id), {});
    }
}

export const reportService = new ReportService();
