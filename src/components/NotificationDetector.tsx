'use client';

import { useNotificationDetector } from '@/hooks/useNotificationDetector';

/**
 * Component that runs notification detection logic
 * Should be placed once in the app layout
 */
export function NotificationDetector() {
    useNotificationDetector();
    return null;
}
