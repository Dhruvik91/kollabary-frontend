import { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupContainer } from '@/features/auth/SignupContainer';

export const metadata: Metadata = {
    title: 'Sign Up | Kollabary',
    description: 'Create your Kollabary account to start collaborating with influencers and brands.',
    openGraph: {
        title: 'Sign Up | Kollabary',
        description: 'Create your Kollabary account',
        type: 'website',
    },
};

export default function SignupPage() {
    return (
        <AuthLayout
            title="Create an account"
            description="Get started with Kollabary today"
        >
            <SignupContainer />
        </AuthLayout>
    );
}
