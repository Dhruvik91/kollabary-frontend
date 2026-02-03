import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';

class AuthService {
    async forgotPassword(email: string) {
        return httpService.post(API_CONFIG.path.userAuth.forgotPassword, { email });
    }

    async resetPassword(data: { token: string; newPassword: string }) {
        return httpService.post(API_CONFIG.path.userAuth.resetPassword, data);
    }
}

export const authService = new AuthService();
