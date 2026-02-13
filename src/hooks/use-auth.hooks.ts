import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import {
    LoginCredentials,
    SignupCredentials,
    ForgotPasswordData,
    ResetPasswordData,
    User,
    AuthResponse,
} from '@/types/auth.types';
import axios from 'axios';
import { FRONTEND_ROUTES } from '@/constants';

/**
 * Query key factory for authentication
 */
export const authKeys = {
    all: ['auth'] as const,
    me: () => [...authKeys.all, 'me'] as const,
};

/**
 * Hook to get current authenticated user
 */
export function useMe(enabled = true) {
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: authService.getMe,
        enabled,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Hook to handle user signup
 */
export function useSignup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: SignupCredentials) => authService.signup(credentials),
        onSuccess: (data: AuthResponse) => {
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: authKeys.me() });

            // Set role cookie for middleware (accessible by JS)
            document.cookie = `user_role=${data.user.role}; path=/; max-age=604800; samesite=lax`;

            toast.success('Account created successfully!', {
                description: 'Welcome to Kollabary',
            });

            // Reload to trigger middleware redirection
            window.location.href = '/';
        },
        onError: (error: Error) => {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error.message || 'Failed to create account. Please try again.';

            toast.error('Signup failed', {
                description: message,
            });
            return message;
        },
    });
}

/**
 * Hook to handle user login
 */
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
        onSuccess: (data: AuthResponse) => {
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: authKeys.me() });

            // Set role cookie for middleware (accessible by JS)
            document.cookie = `user_role=${data.user.role}; path=/; max-age=604800; samesite=lax`;

            toast.success('Login successful!', {
                description: `Welcome back, ${data.user.email}`,
            });

            // Reload to trigger middleware redirection
            window.location.href = '/';
        },
        onError: (error: Error) => {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error.message || 'Failed to login. Please try again.';

            toast.error('Login failed', {
                description: message,
            });
            return message;
        },
    });
}

/**
 * Hook to handle user logout
 */
export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            // Clear all queries
            queryClient.clear();

            // Clear role cookie
            document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax';

            toast.success('Logged out successfully');

            // Trigger full refresh to clear any state and trigger middleware
            window.location.href = FRONTEND_ROUTES.AUTH.LOGIN;
        },
        onError: (error: Error) => {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error.message || 'Failed to logout. Please try again.';

            toast.error('Logout failed', {
                description: message,
            });
            return message;
        },
    });
}

/**
 * Hook to handle forgot password
 */
export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
        onSuccess: (data) => {
            toast.success('Email sent!', {
                description: data.message,
            });
        },
        onError: (error: Error) => {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error.message || 'Failed to send reset email. Please try again.';

            toast.error('Request failed', {
                description: message,
            });
            return message;
        },
    });
}

/**
 * Hook to handle password reset
 */
export function useResetPassword() {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
        onSuccess: (data) => {
            toast.success('Password reset successful!', {
                description: data.message,
            });

            // No redirection here, let the user manually go to login or 
            // the component state handle the success view.
        },
        onError: (error: Error) => {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error.message || 'Failed to reset password. Please try again.';

            toast.error('Reset failed', {
                description: message,
            });
            return message;
        },
    });
}

/**
 * Hook to initiate Google OAuth
 */
export function useGoogleAuth() {
    return {
        initiateGoogleAuth: authService.initiateGoogleAuth,
    };
}
