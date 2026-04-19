import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { TransactionResponse, TransactionType, TransactionPurpose } from '@/types/wallet.types';

export const transactionService = {
    /**
     * Get current user's KC coin transaction history
     */
    async getMyHistory(params: {
        page?: number;
        limit?: number;
        type?: TransactionType;
        purpose?: TransactionPurpose;
    } = {}): Promise<TransactionResponse> {
        const response = await httpService.get<TransactionResponse>(API_CONFIG.path.transaction.my, { params });
        return response.data;
    },
};
