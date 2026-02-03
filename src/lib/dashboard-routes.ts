import { ROLES, FRONTEND_ROUTES } from '@/constants/constants';

export function getDashboardRoute(role: string | null) {
    if (!role) return FRONTEND_ROUTES.AUTH.LOGIN;

    switch (role) {
        case ROLES.ADMIN:
            return FRONTEND_ROUTES.ADMIN.BASE;
        case ROLES.INFLUENCER:
            return FRONTEND_ROUTES.DASHBOARD.INFLUENCER;
        case ROLES.USER:
            return FRONTEND_ROUTES.DASHBOARD.BRAND;
        default:
            return FRONTEND_ROUTES.HOME;
    }
}
