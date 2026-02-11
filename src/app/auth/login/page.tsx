import { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginContainer } from '@/features/auth/LoginContainer';

export const metadata: Metadata = {
    title: 'Sign In | Kollabary',
    description: 'Sign in to your Kollabary account to access your dashboard and manage collaborations.',
    openGraph: {
        title: 'Sign In | Kollabary',
        description: 'Sign in to your Kollabary account',
        type: 'website',
    },
};

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome back"
            description="Sign in to your account to continue"
        >
            <LoginContainer />
        </AuthLayout>
    );
}
