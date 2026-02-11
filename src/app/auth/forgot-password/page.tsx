import { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { ForgotPasswordContainer } from '@/features/auth/ForgotPasswordContainer';

export const metadata: Metadata = {
    title: 'Forgot Password | Kollabary',
    description: 'Reset your Kollabary account password.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function ForgotPasswordPage() {
    return (
        <AuthLayout
            title="Forgot password?"
            description="No worries, we'll send you reset instructions"
        >
            <ForgotPasswordContainer />
        </AuthLayout>
    );
}
