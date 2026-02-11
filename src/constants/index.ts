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
        }
    }
}

export const FRONTEND_ROUTES = {
    auth: {
        login: '/auth/login',
        signup: '/auth/signup',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
        callback: '/auth/callback',
    },
    dashboard: '/dashboard',
    home: '/',
}
