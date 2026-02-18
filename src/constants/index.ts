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
            createInfluencer: '/user-auth/admin/create-influencer',
        },
        collaboration: {
            base: '/collaboration',
            detail: (id: string) => `/collaboration/${id}`,
            status: (id: string) => `/collaboration/${id}/status`,
        },
        ranking: {
            breakdown: (id: string) => `/ranking/breakdown/${id}`,
            weights: '/ranking/weights',
            tierGuide: '/ranking/tier-guide',
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
        },
        report: {
            base: "/report",
            delete: (id: string) => `/report/${id}/delete`,
        },
        admin: {
            stats: '/admin/stats',
            reports: '/admin/reports',
            reportUpdate: (id: string) => `/admin/reports/${id}/status`,
            verifications: '/admin/verifications',
            verificationUpdate: (id: string) => `/admin/verifications/${id}/status`,
            subscription: '/admin/subscription/plan',
        },
        verification: {
            base: '/verification',
            myRequests: '/verification/my-requests',
            approve: (id: string) => `/verification/approve/${id}`,
            reject: (id: string) => `/verification/reject/${id}`,
        },
        profile: {
            base: '/profile',
            me: '/profile',
            search: '/profile/search',
        },
        uploads: {
            base: '/uploads',
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
        INFLUENCER_SETUP: '/influencer/setup',
        INFLUENCER_PROFILE: '/influencer/profile',
        INFLUENCER_EDIT: '/influencer/profile/edit',
        INFLUENCER_DETAIL: (id: string) => `/influencers/${id}`,
        PROFILE: '/profile',
        PROFILE_SETUP: '/profile/setup',
        ADMIN: {
            OVERVIEW: '/admin/overview',
            REPORTS: '/admin/reports',
            VERIFICATIONS: '/admin/verifications',
            SUBSCRIPTIONS: '/admin/subscriptions',
            RANKING: '/admin/ranking',
            INFLUENCERS: '/admin/influencers',
        }
    },
    HOME: '/',
}
