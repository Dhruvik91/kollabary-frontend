export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    socketUrl: process.env.NEXT_PUBLIC_WS_URL || process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api$/, ''),
    path: {
        auth: {
            signup: '/user-auth/signup',
            login: '/user-auth/login',
            logout: '/user-auth/logout',
            me: '/user-auth/me',
            forgotPassword: '/user-auth/forgot-password',
            resetPassword: '/user-auth/reset-password',
            changePassword: '/user-auth/change-password',
            verifyEmail: '/user-auth/verify-email',
            resendVerifyEmail: '/user-auth/resend-verify-email',
            google: '/user-auth/google',
            googleCallback: '/user-auth/google/callback',
            createInfluencer: '/user-auth/admin/create-influencer',
        },
        collaboration: {
            base: '/collaboration',
            myInfluencers: '/collaboration/my-influencers',
            detail: (id: string) => `/collaboration/${id}`,
            status: (id: string) => `/collaboration/${id}/status`,
        },
        ranking: {
            breakdown: (id: string) => `/ranking/breakdown/${id}`,
            weights: '/ranking/weights',
            tierGuide: '/ranking/tier-guide',
            recalculate: (id: string) => `/ranking/recalculate/${id}`,
            recalculateAll: '/ranking/recalculate-all',
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
            auctions: '/admin/auctions',
            bids: '/admin/bids',
            conversations: '/admin/conversations',
            conversationMessages: (id: string) => `/admin/conversations/${id}/messages`,
            kcSettings: '/admin/kc-settings',
            kcSettingUpdate: (key: string) => `/admin/kc-settings/${key}`,
            finance: '/admin/finance',
            orders: '/admin/orders',
            users: '/admin/users',
            userStatusUpdate: (id: string) => `/admin/users/${id}/status`,
            userBulkStatus: '/admin/users/bulk-status',
            userVerify: (id: string) => `/admin/users/${id}/verify`,
        },
        verification: {
            base: '/verification/request',
            myRequests: '/verification/my-requests',
            approve: (id: string) => `/verification/approve/${id}`,
            reject: (id: string) => `/verification/reject/${id}`,
        },
        profile: {
            base: '/profile',
            me: '/profile',
            search: '/profile/search',
            brand: (id: string) => `/profile/brand/${id}`,
        },
        uploads: {
            base: '/uploads',
        },
        subscription: {
            plans: '/subscription/plans',
        },
        auction: {
            base: '/auctions',
            my: '/auctions/my',
            detail: (id: string) => `/auctions/${id}`,
            bids: (id: string) => `/auctions/${id}/bids`,
            acceptBid: (id: string) => `/auctions/bids/${id}/accept`,
            rejectBid: (id: string) => `/auctions/bids/${id}/reject`,
            myBids: '/auctions/my/bids',
        },
        public: {
            influencer: (id: string) => `/public/influencer/${id}`,
            influencerBySlug: (slug: string) => `/public/influencer/p/${slug}`,
            brand: (id: string) => `/public/brand/${id}`,
        },
        wallet: {
            base: '/kc-wallet',
            my: '/kc-wallet/my',
        },
        transaction: {
            base: '/kc-transactions',
            my: '/kc-transactions/my',
        },
        referral: {
            base: '/referrals',
            stats: '/referrals/stats',
        },
        topUp: {
            plans: '/top-up/plans',
            initiate: '/payment/top-up/initiate',
            verify: '/payment/top-up/verify',
            cancel: (id: string) => `/payment/top-up/cancel/${id}`,
            sync: (id: string) => `/payment/top-up/sync/${id}`,
            myOrders: '/payment/my-orders',
        },
        adminTopUp: {
            plans: '/admin/top-up/plans',
            planUpdate: (id: string) => `/admin/top-up/plans/${id}`,
        }

    }
}

export const FRONTEND_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        VERIFY_EMAIL: '/auth/verify-email',
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
        REFERRALS: '/referrals',
        INFLUENCERS: '/influencers',
        BRANDS: '/brands',
        MY_INFLUENCERS: '/my-influencers',
        PROJECTS: '/projects',
        OVERVIEW: '/overview',
        INFLUENCER_SETUP: '/influencer/setup',
        INFLUENCER_PROFILE: '/influencer/profile',
        INFLUENCER_EDIT: '/influencer/profile/edit',
        INFLUENCER_DETAIL: (id: string) => `/influencers/${id}`,
        BRAND_DETAIL: (id: string) => `/brands/${id}`,
        PROFILE: '/profile',
        PROFILE_SETUP: '/profile/setup',
        AUCTIONS: '/auctions',
        AUCTION_DETAIL: (id: string) => `/auctions/${id}`,
        AUCTION_CREATE: '/auctions/create',
        AUCTION_EDIT: (id: string) => `/auctions/${id}/edit`,
        ADMIN: {
            OVERVIEW: '/admin/overview',
            REPORTS: '/admin/reports',
            VERIFICATIONS: '/admin/verifications',
            SUBSCRIPTIONS: '/admin/subscriptions',
            RANKING: '/admin/ranking',
            INFLUENCERS: '/admin/influencers',
            AUCTIONS: '/admin/auctions',
            BIDS: '/admin/bids',
            CONVERSATIONS: '/admin/conversations',
            REWARDS: '/admin/rewards',
            REFERRALS: '/admin/referrals',
            TOP_UP: '/admin/top-up',
            FINANCE: '/admin/finance',
            ORDERS: '/admin/orders',
            USERS: '/admin/users',
        },
        TOP_UP: '/top-up',
    },
    HOME: '/',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    COOKIES: '/cookies',
    ABOUT: '/about',
    CAREERS: '/careers',
    PRESS: '/press',
    CONTACT: '/contact',
    BLOG: '/blog',
    DOCS: '/docs',
    GUIDES: '/guides',
    HELP_CENTER: '/help-center',
    PRICING: '/pricing',
    SOLUTIONS: '/solutions',
    MARKETING_DISCOVER: '/discover',
    MARKETING_CAMPAIGNS: '/marketing-campaigns',
    MARKETING_ANALYTICS: '/marketing-analytics',
    PUBLIC_SHAREABLE: {
        INFLUENCER: (id: string) => `/i/${id}`,
        BRAND: (id: string) => `/b/${id}`,
        INFLUENCER_PREFIX: '/i/',
        BRAND_PREFIX: '/b/',
    },
}

export const AUTH_STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    USER_ROLE: 'user_role',
} as const;

export const PWA_STORAGE_KEYS = {
    INSTALL_DISMISSED: 'pwa-install-dismissed',
    INSTALLED: 'pwa-installed',
} as const;

export const CONSENT_STORAGE_KEYS = {
    AUCTION_CREATE: 'consent-auction-create',
    BID_PLACE: 'consent-bid-place',
    COLLAB_REQUEST: 'consent-collab-request',
} as const;



export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "support@kollabary.com"

export const COIN_URL = "https://kollabary.s3.ap-south-1.amazonaws.com/kollabary-coin.png";