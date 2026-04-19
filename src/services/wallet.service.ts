import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { Wallet } from '@/types/wallet.types';

export const walletService = {
    /**
     * Get current user's wallet balance
     */
    async getMyWallet(): Promise<Wallet> {
        const response = await httpService.get<Wallet>(API_CONFIG.path.wallet.my);
        return response.data;
    },
};
