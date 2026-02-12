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
        },
        ranking: {
            breakdown: (id: string) => `/ranking/breakdown/${id}`,
            weights: '/ranking/weights',
        },
        influencer: {
            base: '/influencer',
            search: '/influencer/search',
            myProfile: '/influencer/profile',
            profile: (id: string) => `/influencer/${id}`,
        },
        messaging: {
            conversation: '/messaging/conversation',
            conversationDetail: (id: string) => `/messaging/conversation/${id}`,
            messages: (id: string) => `/messaging/conversation/${id}/messages`,
            sendMessage: (id: string) => `/messaging/conversation/${id}/message`,
            message: (id: string) => `/messaging/message/${id}`,
            deleteMessage: (id: string) => `/messaging/message/${id}/delete`,
            deleteConversation: (id: string) => `/messaging/conversation/${id}/delete`,
        },
        review: {
            base: '/review',
            influencer: (id: string) => `/review/influencer/${id}`,
            update: (id: string) => `/review/${id}`,
            delete: (id: string) => `/review/${id}/delete`,
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
        HOME: '/overview',
        COLLABORATIONS: '/collaborations',
        COLLABORATION_DETAIL: (id: string) => `/collaborations/${id}`,
        MESSAGES: '/messages',
        SETTINGS: '/settings',
        USERS: '/users',
        ANALYTICS: '/analytics',
        CAMPAIGNS: '/campaigns',
        EARNINGS: '/earnings',
        DISCOVER: '/discover',
        PROJECTS: '/projects',
        OVERVIEW: '/overview',
        INFLUENCER_SETUP: '/influencer/setup'
    },
    HOME: '/',
}
