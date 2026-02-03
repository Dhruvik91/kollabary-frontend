import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_CONFIG, FRONTEND_ROUTES, ROLES } from '@/constants/constants';

const PUBLIC_PATHS = new Set<string>([
  FRONTEND_ROUTES.HOME,
  FRONTEND_ROUTES.AUTH.LOGIN,
  FRONTEND_ROUTES.AUTH.SIGNUP,
  FRONTEND_ROUTES.AUTH.CALLBACK,
  FRONTEND_ROUTES.AUTH.FORGOT_PASSWORD,
  FRONTEND_ROUTES.AUTH.RESET_PASSWORD,
  FRONTEND_ROUTES.INFLUENCERS.BASE,
  FRONTEND_ROUTES.INFLUENCERS.SEARCH,
]);

const DASHBOARD_ROUTES: Record<string, string> = {
  [ROLES.ADMIN]: FRONTEND_ROUTES.ADMIN.BASE,
  [ROLES.INFLUENCER]: FRONTEND_ROUTES.DASHBOARD.INFLUENCER,
  [ROLES.USER]: FRONTEND_ROUTES.DASHBOARD.BRAND,
};

interface ApiEnvelope<T> {
  statusCode: number;
  data: T | null;
  isError: boolean;
  message?: string | string[];
  error?: string;
}

interface BackendUser {
  id: string;
  email: string;
  role: ROLES;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: Record<string, any>;
}

async function fetchCurrentUser(req: NextRequest): Promise<BackendUser | null> {
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.path.userAuth.me}`, {
      headers: {
        cookie: req.headers.get('cookie') ?? '',
      },
    });

    if (!res.ok) return null;

    const envelope = (await res.json()) as ApiEnvelope<BackendUser>;
    if (!envelope || envelope.isError || !envelope.data) return null;

    return envelope.data;
  } catch {
    return null;
  }
}

function getDashboardRoute(role: ROLES | null | undefined): string {
  if (!role) return FRONTEND_ROUTES.HOME;
  return DASHBOARD_ROUTES[role] ?? FRONTEND_ROUTES.HOME;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PATHS.has(pathname) ||
    pathname.startsWith('/influencers/'); // Allow influencer detail pages

  const isAppRoute =
    pathname.startsWith(FRONTEND_ROUTES.DASHBOARD.BASE) ||
    pathname.startsWith(FRONTEND_ROUTES.COLLABORATIONS.BASE) ||
    pathname.startsWith(FRONTEND_ROUTES.PROFILE.BASE) ||
    pathname.startsWith(FRONTEND_ROUTES.ADMIN.BASE);

  // Only do work for routes we care about
  if (!isPublic && !isAppRoute) {
    return NextResponse.next();
  }

  const user = await fetchCurrentUser(req);

  // Unauthenticated users
  if (!user) {
    if (isAppRoute) {
      const url = req.nextUrl.clone();
      url.pathname = FRONTEND_ROUTES.AUTH.LOGIN;
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    // Public routes stay public
    return NextResponse.next();
  }

  // Authenticated users on login/signup routes -> redirect to dashboard
  const authRoutesToRedirect = [FRONTEND_ROUTES.AUTH.LOGIN, FRONTEND_ROUTES.AUTH.SIGNUP];
  if (isPublic && (pathname === FRONTEND_ROUTES.HOME || authRoutesToRedirect.includes(pathname))) {
    const url = req.nextUrl.clone();
    url.pathname = getDashboardRoute(user.role);
    url.searchParams.delete('next');
    return NextResponse.redirect(url);
  }

  // Enforce role-based access for admin routes
  if (pathname.startsWith(FRONTEND_ROUTES.ADMIN.BASE) && user.role !== ROLES.ADMIN) {
    const url = req.nextUrl.clone();
    url.pathname = getDashboardRoute(user.role);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/dashboard/:path*',
    '/collaborations/:path*',
    '/profile/:path*',
    '/influencers/:path*',
  ],
};
