import { Metadata } from 'next';
import { VerifyEmailContainer } from '@/features/auth/VerifyEmailContainer';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Verify Email | Kollabary',
    description: 'Verify your email address to activate your Kollabary account.',
};

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContainer />
        </Suspense>
    );
}
