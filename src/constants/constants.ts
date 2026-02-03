export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
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
      profile: "/v1/influencer/profile",
      search: "/v1/influencer/search",
      detail: (id: string) => `/v1/influencer/${id}`,
    },
    collaboration: {
      base: "/v1/collaboration",
      detail: (id: string) => `/v1/collaboration/${id}`,
      status: (id: string) => `/v1/collaboration/${id}/status`,
    },
    profile: {
      base: "/v1/profile",
    },
    uploads: "/v1/uploads",
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