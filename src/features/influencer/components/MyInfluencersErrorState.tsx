import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MyInfluencersErrorStateProps {
    onRetry: () => void;
}

export const MyInfluencersErrorState = ({ onRetry }: MyInfluencersErrorStateProps) => {
    return (
        <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                <AlertCircle size={40} />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black">Something went wrong</h2>
                <p className="text-muted-foreground text-lg">
                    We couldn't load your collaborated influencers. Please try again.
                </p>
            </div>
            <Button
                onClick={onRetry}
                className="px-8 h-12 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20"
            >
                Retry
            </Button>
        </div>
    );
};
