'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function GTMPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            // Logic for GTM page view tracking can go here
            // window.dataLayer?.push({
            //   event: 'pageview',
            //   page: pathname,
            // });
        }
    }, [pathname, searchParams]);

    return null;
}
