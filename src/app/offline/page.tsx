import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
          <WifiOff size={40} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight">You're Offline</h1>
          <p className="text-muted-foreground">
            It looks like you've lost your internet connection. Some features may not be available.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => window.location.reload()}
            className="w-full rounded-xl font-bold"
          >
            Try Again
          </Button>
          
          <Button
            variant="outline"
            asChild
            className="w-full rounded-xl font-bold"
          >
            <Link href="/">Go to Home</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          You can still access previously loaded pages while offline.
        </p>
      </div>
    </div>
  );
}
