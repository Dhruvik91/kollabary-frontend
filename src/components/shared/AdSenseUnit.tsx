'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AdSenseUnitProps {
  slotId?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  fullWidthResponsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const AdSenseUnit = ({
  slotId,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className,
}: AdSenseUnitProps) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.warn('AdSense unit initialization suppressed:', err);
    }
  }, []);

  const clientPublisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-3831930426569586';

  return (
    <div className={cn("my-6 text-center overflow-hidden min-h-[90px] flex items-center justify-center bg-muted/20 rounded-xl border border-border/40 p-2", className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={clientPublisherId}
        {...(slotId ? { 'data-ad-slot': slotId } : {})}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
};
