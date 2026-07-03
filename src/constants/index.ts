import { BRAND } from "zod/v3";

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
            firebaseLogin: '/user-auth/firebase-login',
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
            status: '/influencer/status',
            account: '/influencer/account',
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
            userAddCoins: (id: string) => `/admin/users/${id}/coins`,
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
            status: '/profile/status',
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
            config: '/referrals/config',
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
        },
        pitch: {
            base: '/pitches',
            sent: '/pitches/sent',
            received: '/pitches/received',
            admin: '/pitches/admin',
            status: (id: string) => `/pitches/${id}/status`,
            detail: (id: string) => `/pitches/${id}`,
        },
        notifications: {
            subscribe: '/notifications/subscribe',
            unsubscribe: '/notifications/unsubscribe',
            vapidKey: '/notifications/vapid-key',
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
            USER_DETAIL: (id: string) => `/admin/users/${id}`,
        },
        TOP_UP: '/top-up',
        ORDERS: '/orders',
        PITCHES: '/pitch',
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
    PUSH_PROMPT_DISMISSED: 'push-prompt-dismissed',
    PUSH_SUBSCRIBED: 'push-subscribed',
} as const;

export const CONSENT_STORAGE_KEYS = {
    AUCTION_CREATE: 'consent-auction-create',
    BID_PLACE: 'consent-bid-place',
    COLLAB_REQUEST: 'consent-collab-request',
    PITCH_CREATE: 'consent-pitch-create',
} as const;

/**
 * localStorage keys used to persist auto-saved form drafts.
 * Drafts are cleared automatically after a successful submit or after 7 days.
 */
export const DRAFT_STORAGE_KEYS = {
    INFLUENCER_SETUP: 'draft-influencer-setup',
    PROFILE_SETUP: 'draft-profile-setup',
} as const;

export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "support@kollabary.com"

export const BASE_IMAGE_URL = "https://kollabary.s3.ap-south-1.amazonaws.com"

export const COIN_URL = `${BASE_IMAGE_URL}/kollabary-coin.png`;

export const TIER_IMAGES = {
    RISING_CREATOR: `${BASE_IMAGE_URL}/rising_creator.png`,
    EMERGING_PARTNER: `${BASE_IMAGE_URL}/emerging_partner.png`,
    TRUSTED_COLLABORATOR: `${BASE_IMAGE_URL}/trusted_collaborator.png`,
    PRO_INFLUENCER: `${BASE_IMAGE_URL}/pro_influencer.png`,
    ELITE_CREATOR: `${BASE_IMAGE_URL}/elite_creator.png`,
    KOLLABARY_ICON: `${BASE_IMAGE_URL}/kollabary_icon.png`,
}

export const LANDING_PAGE_IMAGES_URL = {
    BRAND: `${BASE_IMAGE_URL}/brand_landing.png`,
    INFLUENCER: `${BASE_IMAGE_URL}/creator_landing.png`,
    KCOINS: `${BASE_IMAGE_URL}/kcoins_landing.png`,
    REVIEWS: `${BASE_IMAGE_URL}/review_landing.png`,
}

export const SOCIAL_PLATFORMS = [
    { label: 'Instagram', value: 'instagram' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'TikTok', value: 'tiktok' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Twitter / X', value: 'twitter_x' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Threads', value: 'threads' },
    { label: 'Pinterest', value: 'pinterest' },
    { label: 'Snapchat', value: 'snapchat' },
    { label: 'Twitch', value: 'twitch' },
    { label: 'Discord', value: 'discord' },
    { label: 'Reddit', value: 'reddit' },
    { label: 'Telegram', value: 'telegram' },
    { label: 'WhatsApp Channels', value: 'whatsapp_channels' },
    { label: 'Medium', value: 'medium' },
    { label: 'Substack', value: 'substack' },
    { label: 'Quora', value: 'quora' },
    { label: 'Spotify Podcast', value: 'spotify_podcast' },
    { label: 'Apple Podcast', value: 'apple_podcast' },
    { label: 'Podcast', value: 'podcast' },
    { label: 'Blog / Website', value: 'blog_website' },
    { label: 'UGC Content', value: 'ugc_content' },
    { label: 'Email Newsletter', value: 'email_newsletter' },
    { label: 'Community Promotion', value: 'community_promotion' },
    { label: 'Live Streaming', value: 'live_streaming' },
    { label: 'Gaming Content', value: 'gaming_content' },
    { label: 'Short-form Video', value: 'short_form_video' },
    { label: 'Long-form Video', value: 'long_form_video' },
    { label: 'Other', value: 'other' },
];

export const MAX_UPLOAD_SIZE_MB = 30;
export const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;


