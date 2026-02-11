import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import {
    AuthResponse,
    User,
    LoginCredentials,
    SignupCredentials,
    ForgotPasswordData,
    ResetPasswordData,
    SuccessResponse,
    MessageResponse,
} from '@/types/auth.types';

/**
 * Authentication service
 * Handles all authentication-related API calls
 */
export const authService = {
    /**
     * Sign up a new user
     */
    async signup(credentials: SignupCredentials): Promise<AuthResponse> {
        const response = await httpService.post<AuthResponse>(API_CONFIG.path.auth.signup, credentials);
        return response.data;
    },

    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await httpService.post<AuthResponse>(API_CONFIG.path.auth.login, credentials);
        return response.data;
    },

    /**
     * Logout current user
     */
    async logout(): Promise<SuccessResponse> {
        const response = await httpService.post<SuccessResponse>(API_CONFIG.path.auth.logout);
        return response.data;
    },

    /**
     * Get current authenticated user
     */
    async getMe(): Promise<User> {
        const response = await httpService.get<User>(API_CONFIG.path.auth.me);
        return response.data;
    },

    /**
     * Request password reset email
     */
    async forgotPassword(data: ForgotPasswordData): Promise<MessageResponse> {
        const response = await httpService.post<MessageResponse>(API_CONFIG.path.auth.forgotPassword, data);
        return response.data;
    },

    /**
     * Reset password using token
     */
    async resetPassword(data: ResetPasswordData): Promise<MessageResponse> {
        const response = await httpService.post<MessageResponse>(API_CONFIG.path.auth.resetPassword, data);
        return response.data;
    },

    /**
     * Initiate Google OAuth flow
     */
    initiateGoogleAuth(): void {
        const googleAuthUrl = `${API_CONFIG.baseUrl}${API_CONFIG.path.auth.google}`;
        window.location.href = googleAuthUrl;
    },
};
