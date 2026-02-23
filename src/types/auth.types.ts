export enum UserRole {
    USER = 'USER',
    INFLUENCER = 'INFLUENCER',
    ADMIN = 'ADMIN',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
}

export interface Profile {
    id: string;
    fullName: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    firstName?: string;
    lastName?: string;
}

export interface User {
    id: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    profile?: Profile;
    influencerProfile?: { id: string };
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    token: string;
    newPassword: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export interface AuthError {
    message: string;
    statusCode?: number;
}

export interface SuccessResponse {
    success: boolean;
}

export interface MessageResponse {
    message: string;
}
