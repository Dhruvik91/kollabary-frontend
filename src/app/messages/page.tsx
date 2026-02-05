import { MessagingContainer } from '@/features/messaging/container/MessagingContainer';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Messages | Kollabary',
    description: 'Chat with brands and influencers.',
};

export default function MessagesPage() {
    return (
        <div className="bg-gradient-to-br from-background via-blue-500/5 to-background min-h-screen">
            <Suspense fallback={
                <div className="flex h-screen items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            }>
                <MessagingContainer />
            </Suspense>
        </div>
    );
}
