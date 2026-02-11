import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FRONTEND_ROUTES } from './constants';

/**
 * Middleware for handling role-based redirection and route protection.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the access token from cookies
    const accessToken = request.cookies.get('access_token')?.value;
    const isAuthenticated = !!accessToken;

    // Public routes that should be accessible only to guests
    const authRoutes = [
        FRONTEND_ROUTES.AUTH.LOGIN,
        FRONTEND_ROUTES.AUTH.SIGNUP,
        FRONTEND_ROUTES.AUTH.FORGOT_PASSWORD,
        FRONTEND_ROUTES.AUTH.RESET_PASSWORD,
    ];

    // Check if the current route is an auth route
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Redirect authenticated users trying to access auth routes to the dashboard overview
    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL(FRONTEND_ROUTES.DASHBOARD.OVERVIEW, request.url));
    }

    // Special handling for the root path
    if (pathname === '/') {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL(FRONTEND_ROUTES.DASHBOARD.OVERVIEW, request.url));
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
        FRONTEND_ROUTES.DASHBOARD.DISCOVER,
        FRONTEND_ROUTES.DASHBOARD.PROJECTS,
        '/influencers',
        // Assuming INFLUENCER_DETAIL is a dynamic route like /influencers/:id
        // We protect it by checking if the pathname starts with the base path for influencer details.
        // If FRONTEND_ROUTES.DASHBOARD.INFLUENCER_DETAIL(id) returns '/influencers/some-id',
        // then checking for '/influencers/' is sufficient.
        '/influencers/',
    ];

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!isAuthenticated && isProtectedRoute) {
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
