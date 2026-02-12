import { use } from 'react';
import { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { ResetPasswordContainer } from '@/features/auth/ResetPasswordContainer';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Reset Password | Kollabary',
    description: 'Set a new password for your Kollabary account.',
    robots: {
        index: false,
        follow: false,
    },
};

interface ResetPasswordPageProps {
    searchParams: Promise<{ token?: string }>;
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
    const { token } = use(searchParams);

    // Redirect if no token provided
    if (!token) {
        redirect('/auth/forgot-password');
    }

    return (
        <AuthLayout
            title="Reset password"
            description="Enter your new password below"
        >
            <ResetPasswordContainer token={token} />
        </AuthLayout>
    );
}
