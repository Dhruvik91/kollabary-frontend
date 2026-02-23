import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FRONTEND_ROUTES } from './constants';

/**
 * Middleware for handling role-based redirection and route protection.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the access token and user role from cookies
    const accessToken = request.cookies.get('access_token')?.value;
    const userRole = request.cookies.get('user_role')?.value;
    // Authenticated only if we have both. This allows us to clear user_role client-side
    // to break infinite loops when the token is actually invalid.
    const isAuthenticated = !!accessToken && !!userRole;

    const ADMIN_DASHBOARD = FRONTEND_ROUTES.DASHBOARD.ADMIN.OVERVIEW;
    const USER_DASHBOARD = FRONTEND_ROUTES.DASHBOARD.OVERVIEW;

    /**
     * Helper to get the correct dashboard based on role
     */
    const getDashboardUrl = (role?: string) => {
        if (role === 'ADMIN') return ADMIN_DASHBOARD;
        return USER_DASHBOARD;
    };

    // Public routes that should be accessible only to guests
    const authRoutes = [
        FRONTEND_ROUTES.AUTH.LOGIN,
        FRONTEND_ROUTES.AUTH.SIGNUP,
        FRONTEND_ROUTES.AUTH.FORGOT_PASSWORD,
        FRONTEND_ROUTES.AUTH.RESET_PASSWORD,
    ];

    // Check if the current route is an auth route
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // STALE SESSION PROTECTION:
    // If we are at an auth route (like login) and have an access token but NO user role,
    // it means the user was likely kicked back here by a 401 error.
    // We MUST let them stay here so they can re-authenticate.
    if (isAuthRoute && accessToken && !userRole) {
        return NextResponse.next();
    }

    // Redirect authenticated users trying to access auth routes to their respective dashboard
    if (isAuthenticated && isAuthRoute) {
        const dashboardUrl = getDashboardUrl(userRole);
        // Only redirect if we're not already going to the correct dashboard path
        if (pathname !== dashboardUrl) {
            return NextResponse.redirect(new URL(dashboardUrl, request.url));
        }
    }

    // Special handling for the root path
    if (pathname === '/') {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
        }
        // Guests at '/' see the landing page (stay where they are)
        return NextResponse.next();
    }

    // Protected routes (everything else except static files and auth routes)
    // In this app, nearly all other routes like /collaborations, /overview, /messages are protected
    const protectedRoutes = [
        FRONTEND_ROUTES.DASHBOARD.OVERVIEW,
        FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS,
        FRONTEND_ROUTES.DASHBOARD.MESSAGES,
        FRONTEND_ROUTES.DASHBOARD.SETTINGS,
        FRONTEND_ROUTES.DASHBOARD.USERS,
        FRONTEND_ROUTES.DASHBOARD.ANALYTICS,
        FRONTEND_ROUTES.DASHBOARD.CAMPAIGNS,
        FRONTEND_ROUTES.DASHBOARD.EARNINGS,
        FRONTEND_ROUTES.DASHBOARD.INFLUENCERS,
        FRONTEND_ROUTES.DASHBOARD.PROJECTS,
        FRONTEND_ROUTES.DASHBOARD.INFLUENCER_SETUP,
        '/influencer/',
        '/influencers',
        '/influencers/',
    ];

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Protected Admin Routes
    if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL(USER_DASHBOARD, request.url));
    }

    if (!isAuthenticated && (isProtectedRoute || pathname.startsWith('/admin'))) {
        const loginUrl = new URL(FRONTEND_ROUTES.AUTH.LOGIN, request.url);
        // Optional: save the intended destination to redirect back after login
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Config to match all relevant paths
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
