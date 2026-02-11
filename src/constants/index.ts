export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    path: {
        auth: {
            signup: '/user-auth/signup',
            login: '/user-auth/login',
            logout: '/user-auth/logout',
            me: '/user-auth/me',
            forgotPassword: '/user-auth/forgot-password',
            resetPassword: '/user-auth/reset-password',
            google: '/user-auth/google',
            googleCallback: '/user-auth/google/callback',
        },
        collaboration: {
            base: '/collaboration',
            detail: (id: string) => `/collaboration/${id}`,
            status: (id: string) => `/collaboration/${id}/status`,
        }
    }
}

export const FRONTEND_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        CALLBACK: '/auth/callback',
    },
    DASHBOARD: {
        BASE: '/dashboard',
        COLLABORATIONS: '/dashboard/collaborations',
        COLLABORATION_DETAIL: (id: string) => `/dashboard/collaborations/${id}`,
    },
    HOME: '/',
}
