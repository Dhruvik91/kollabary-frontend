export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  path: {
    userAuth: {
      login: "/user-auth/login",
      signup: "/user-auth/signup",
      googleLogin: "/user-auth/google",
      me: "/user-auth/me",
      logout: "/user-auth/logout",
      forgotPassword: "/user-auth/forgot-password",
      resetPassword: "/user-auth/reset-password",
    },
    influencer: {
      profile: "/influencer/profile",
      search: "/influencer/search",
      detail: (id: string) => `/influencer/${id}`,
    },
    collaboration: {
      base: "/collaboration",
      detail: (id: string) => `/collaboration/${id}`,
      status: (id: string) => `/collaboration/${id}/status`,
    },
    profile: {
      base: "/profile",
      search: "/profile/search",
      detail: (id: string) => `/profile/${id}`,
    },
    messaging: {
      base: "/messaging",
      conversation: "/messaging/conversation",
      messages: (id: string) => `/messaging/conversation/${id}/messages`,
      sendMessage: (id: string) => `/messaging/conversation/${id}/message`,
      updateMessage: (id: string) => `/messaging/message/${id}`,
      deleteMessage: (id: string) => `/messaging/message/${id}/delete`,
      deleteConversation: (id: string) => `/messaging/conversation/${id}/delete`,
    },
    review: {
      base: "/review",
      influencer: (id: string) => `/review/influencer/${id}`,
      update: (id: string) => `/review/${id}`,
      delete: (id: string) => `/review/${id}/delete`,
    },
    report: {
      base: "/report",
      delete: (id: string) => `/report/${id}/delete`,
    },
    uploads: "/uploads",
    ranking: {
      breakdown: (id: string) => `/v1/ranking/breakdown/${id}`,
      recalculate: (id: string) => `/v1/ranking/recalculate/${id}`,
      recalculateAll: "/v1/ranking/recalculate-all",
      weights: "/v1/ranking/weights",
    },
    admin: {
      stats: "/v1/admin/stats",
      reports: "/v1/admin/reports",
      reportStatus: (id: string) => `/v1/admin/reports/${id}/status`,
      verifications: "/v1/admin/verifications",
      verificationStatus: (id: string) => `/v1/admin/verifications/${id}/status`,
      subscriptionPlan: "/v1/admin/subscription/plan",
      deletePlan: (id: string) => `/v1/admin/subscription/plan/${id}`,
    },
    subscription: {
      plans: "/v1/subscription/plans",
    },
    verification: {
      request: "/v1/verification/request",
      myRequests: "/v1/verification/my-requests",
    },
  },
};

export const FRONTEND_ROUTES = {
  HOME: '/',
  INFLUENCERS: {
    BASE: '/influencers',
    SEARCH: '/influencers/search',
    DETAIL: (id: string) => `/influencers/${id}`,
  },
  COLLABORATIONS: {
    BASE: '/collaborations',
    DETAIL: (id: string) => `/collaborations/${id}`,
  },
  MESSAGES: {
    BASE: '/messages',
    DETAIL: (id: string) => `/messages/${id}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    CALLBACK: '/auth/callback',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: {
    BASE: '/dashboard',
    BRAND: '/dashboard/brand',
    INFLUENCER: '/dashboard/influencer',
  },
  PROFILE: {
    BASE: '/profile',
    EDIT: '/profile/edit',
    ONBOARDING: {
      BRAND: '/onboarding/brand',
      INFLUENCER: '/onboarding/influencer',
    }
  },
  ADMIN: {
    BASE: '/dashboard/admin',
    USERS: '/dashboard/admin/users',
    INFLUENCERS: '/dashboard/admin/influencers',
    COLLABORATIONS: '/dashboard/admin/collaborations',
  },
}

export const AUTH_TOKEN_KEY = 'auth_token'


export enum ROLES {
  USER = 'USER',
  BRAND = 'USER', // Alias for USER
  INFLUENCER = 'INFLUENCER',
  ADMIN = 'ADMIN',
}

export enum CollaborationStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}


export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "dhruvikgondaliya91@gmail.com"