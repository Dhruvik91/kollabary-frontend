import { UserRole, User } from '@/types/auth.types';

export enum Permission {
    // Admin Permissions
    VIEW_ADMIN_DASHBOARD = 'VIEW_ADMIN_DASHBOARD',
    MANAGE_USERS = 'MANAGE_USERS',
    MANAGE_REPORTS = 'MANAGE_REPORTS',
    MANAGE_VERIFICATIONS = 'MANAGE_VERIFICATIONS',
    MANAGE_SUBSCRIPTIONS = 'MANAGE_SUBSCRIPTIONS',
    MANAGE_RANKING_WEIGHTS = 'MANAGE_RANKING_WEIGHTS',

    // Influencer Permissions
    MANAGE_INFLUENCER_PROFILE = 'MANAGE_INFLUENCER_PROFILE',

    // Shared Permissions
    VIEW_MESSAGES = 'VIEW_MESSAGES',
    SEND_MESSAGES = 'SEND_MESSAGES',
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    [UserRole.ADMIN]: [
        Permission.VIEW_ADMIN_DASHBOARD,
        Permission.MANAGE_USERS,
        Permission.MANAGE_REPORTS,
        Permission.MANAGE_VERIFICATIONS,
        Permission.MANAGE_SUBSCRIPTIONS,
        Permission.MANAGE_RANKING_WEIGHTS,
        Permission.VIEW_MESSAGES,
        Permission.SEND_MESSAGES,
    ],
    [UserRole.INFLUENCER]: [
        Permission.MANAGE_INFLUENCER_PROFILE,
        Permission.VIEW_MESSAGES,
        Permission.SEND_MESSAGES,
    ],
    [UserRole.USER]: [
        Permission.VIEW_MESSAGES,
        Permission.SEND_MESSAGES,
    ],
};

/**
 * Checks if a user has a specific role
 */
export const hasRole = (user: User | null | undefined, role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
};

/**
 * Checks if a user has a specific permission
 */
export const hasPermission = (user: User | null | undefined, permission: Permission): boolean => {
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.includes(permission);
};
