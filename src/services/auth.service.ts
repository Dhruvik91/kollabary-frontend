import { apiClient } from '@/lib/api-client';
import {
    AuthResponse,
    User,
    LoginCredentials,
    SignupCredentials,
    ForgotPasswordData,
    ResetPasswordData,
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
        return apiClient.post<AuthResponse>('/user-auth/signup', credentials);
    },

    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        return apiClient.post<AuthResponse>('/user-auth/login', credentials);
    },

    /**
     * Logout current user
     */
    async logout(): Promise<{ success: boolean }> {
        return apiClient.post<{ success: boolean }>('/user-auth/logout');
    },

    /**
     * Get current authenticated user
     */
    async getMe(): Promise<User> {
        return apiClient.get<User>('/user-auth/me');
    },

    /**
     * Request password reset email
     */
    async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
        return apiClient.post<{ message: string }>('/user-auth/forgot-password', data);
    },

    /**
     * Reset password using token
     */
    async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
        return apiClient.post<{ message: string }>('/user-auth/reset-password', data);
    },

    /**
     * Initiate Google OAuth flow
     */
    initiateGoogleAuth(): void {
        const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-auth/google`;
        window.location.href = googleAuthUrl;
    },
};
