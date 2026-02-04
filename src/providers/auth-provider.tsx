'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { API_CONFIG, FRONTEND_ROUTES, ROLES } from '@/constants/constants';
import { authService } from '@/services/auth.service';
import { getDashboardRoute } from '@/lib/dashboard-routes';
import { User, ApiResponse } from '@/constants/interface';

type AuthUser = {
  id: string;
  email: string;
  role: ROLES;
  name?: string;
};

type UserProfile = User;

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, confirmPassword: string, role: ROLES) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

type AuthResponse = {
  access_token: string;
  user: User;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode; }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const loadUser = async () => {
    try {
      const response = await authService.me();
      const userData = response.data;

      setUser({
        id: userData.id,
        email: userData.email,
        role: userData.role,
        name: userData.name,
      });
      setProfile(userData);
      return userData;
    } catch {
      setUser(null);
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (typeof window === 'undefined') return;

      const url = new URL(window.location.href);
      const urlToken = url.searchParams.get('token');

      if (urlToken && pathname !== FRONTEND_ROUTES.AUTH.RESET_PASSWORD) {
        url.searchParams.delete('token');
        window.history.replaceState({}, '', url.toString());
        const userData = await loadUser();
        const dashboardRoute = getDashboardRoute(userData?.role || null);
        router.replace(dashboardRoute);
        return;
      }

      const isAuthRoute = pathname.startsWith('/auth');
      const isHomePage = pathname === FRONTEND_ROUTES.HOME;
      const isPublicRoute = isAuthRoute || isHomePage;

      const userData = await loadUser();

      if (!userData && !isPublicRoute) {
        router.replace(FRONTEND_ROUTES.AUTH.LOGIN);
        return;
      }

      const authRoutesToRedirect = [FRONTEND_ROUTES.HOME, FRONTEND_ROUTES.AUTH.LOGIN, FRONTEND_ROUTES.AUTH.SIGNUP];
      if (userData && authRoutesToRedirect.includes(pathname)) {
        const dashboardRoute = getDashboardRoute(userData.role);
        router.replace(dashboardRoute);
        return;
      }
    };

    void init();
  }, [router, pathname]);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      const { user: userData } = response.data;

      setUser({
        id: userData.id,
        email: userData.email,
        role: userData.role,
        name: userData.name,
      });
      setProfile(userData);

      const dashboardRoute = getDashboardRoute(userData.role);
      router.push(dashboardRoute);
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const signUp = async (email: string, password: string, confirmPassword: string, role: ROLES) => {
    try {
      const response = await authService.signup({ email, password, confirmPassword });
      const { user: userData } = response.data;

      setUser({
        id: userData.id,
        email: userData.email,
        role: userData.role,
        name: userData.name,
      });
      setProfile(userData);

      // Redirect to profile edit after successful signup
      router.push(FRONTEND_ROUTES.PROFILE.EDIT);
    } catch (err) {
      console.error('Signup failed:', err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setProfile(null);
      router.push(FRONTEND_ROUTES.AUTH.LOGIN);
    }
  };

  const signInWithGoogle = async () => {
    if (typeof window === 'undefined') return;
    window.location.href = `${API_CONFIG.baseUrl}${API_CONFIG.path.userAuth.googleLogin}`;
  };

  const refreshUser = async () => {
    if (typeof window === 'undefined') return;
    await loadUser();
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
