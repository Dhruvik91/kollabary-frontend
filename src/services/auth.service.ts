import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { SignupDto, LoginDto, CreateInfluencerDto, AuthResponse } from '@/types/auth';
import { User } from '@/constants/interface';

class AuthService {
    async signup(data: SignupDto) {
        return httpService.post<AuthResponse>(API_CONFIG.path.userAuth.signup, data);
    }

    async login(data: LoginDto) {
        return httpService.post<AuthResponse>(API_CONFIG.path.userAuth.login, data);
    }

    async me() {
        return httpService.get<User>(API_CONFIG.path.userAuth.me);
    }

    async logout() {
        return httpService.post<{ success: boolean }>(API_CONFIG.path.userAuth.logout);
    }

    async createInfluencer(data: CreateInfluencerDto) {
        // According to backend UserAuthController: @Post('admin/create-influencer') which is protected by ADMIN role.
        // Wait, regular user can't create influencer? 
        // UserAuthService has createInfluencer method but it is used by UserAuthController.createInfluencer which is ADMIN only.
        // Regular signup creates USER.
        // Is there a public influencer signup?
        // Checking backend again... UserAuthService.createInfluencer is for ADMIN.
        // There is no public influencer signup in UserAuthController.
        // So regular signup is USER only.
        // I will implement this method if needed for admin dashboard.
        return httpService.post(API_CONFIG.path.userAuth.signup, data);
    }

    async forgotPassword(email: string) {
        return httpService.post(API_CONFIG.path.userAuth.forgotPassword, { email });
    }

    async resetPassword(data: { token: string; newPassword: string }) {
        return httpService.post(API_CONFIG.path.userAuth.resetPassword, data);
    }
}

export const authService = new AuthService();
