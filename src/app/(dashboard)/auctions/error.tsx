'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { BackButton } from '@/components/shared/BackButton';

export default function AuctionsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Auctions error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="bg-red-500/10 p-6 rounded-full mb-6">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
      <p className="text-gray-400 mt-2 max-w-md mx-auto">
        We encountered an error while loading the auctions. Please try again or contact support if the issue persists.
      </p>
      <div className="flex items-center gap-4 mt-8">
        <Button onClick={() => reset()} className="bg-primary text-black flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
        <BackButton label="Back to Overview" />
      </div>
    </div>
  );
}
