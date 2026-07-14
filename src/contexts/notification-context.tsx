'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { usePushNotification } from '@/hooks/use-push-notification';
import { FRONTEND_ROUTES, NOTIFICATIONS_STORAGE_KEYS, NOTIFICATIONS_TRIGGERS } from '@/constants';

export type NotificationTriggerSource = 'default' | 'messages' | 'auctions' | 'brands' | 'collaborations' | 'pitches';

export interface NotificationContextType {
    isPermissionModalOpen: boolean;
    triggerSource: NotificationTriggerSource;
    openPermissionModal: (source?: NotificationTriggerSource) => void;
    closePermissionModal: () => void;
    isSubscribed: boolean;
    permission: NotificationPermission;
    loading: boolean;
    isSupported: boolean;
    subscribe: () => Promise<boolean>;
    unsubscribe: () => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationRouteTrigger: React.FC = () => {
    const pathname = usePathname();
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { isSupported, isSubscribed, permission, loading: isPushLoading, openPermissionModal } = useNotification();

    useEffect(() => {
        // Wait for auth and push checks to settle
        if (isAuthLoading || isPushLoading) return;
        // Prompt only authenticated users on supported PWA environments
        if (!isAuthenticated || !isSupported) return;
        // Prompt only if not subscribed
        if (isSubscribed) return;

        // Detect page triggers
        let detectedSource: NotificationTriggerSource | null = null;
        if (pathname === FRONTEND_ROUTES.DASHBOARD.MESSAGES || pathname.startsWith(FRONTEND_ROUTES.DASHBOARD.MESSAGES)) {
            detectedSource = NOTIFICATIONS_TRIGGERS.MESSAGES;
        } else if (pathname === FRONTEND_ROUTES.DASHBOARD.AUCTIONS || pathname.startsWith(FRONTEND_ROUTES.DASHBOARD.AUCTIONS)) {
            detectedSource = NOTIFICATIONS_TRIGGERS.AUCTIONS;
        } else if (pathname === FRONTEND_ROUTES.DASHBOARD.BRANDS || pathname.startsWith(FRONTEND_ROUTES.DASHBOARD.BRANDS)) {
            detectedSource = NOTIFICATIONS_TRIGGERS.BRANDS;
        } else if (pathname === FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS || pathname.startsWith(FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS)) {
            detectedSource = NOTIFICATIONS_TRIGGERS.COLLABORATIONS;
        } else if (pathname === FRONTEND_ROUTES.DASHBOARD.PITCHES || pathname.startsWith(FRONTEND_ROUTES.DASHBOARD.PITCHES)) {
            detectedSource = NOTIFICATIONS_TRIGGERS.PITCHES;
        }

        if (!detectedSource) return;

        // Verify the 24-hour dismissal cooldown
        try {
            const dismissedTime = localStorage.getItem(NOTIFICATIONS_STORAGE_KEYS(detectedSource));
            if (dismissedTime) {
                const ONE_DAY_MS = 24 * 60 * 60 * 1000;
                if (Date.now() - parseInt(dismissedTime, 10) < ONE_DAY_MS) {
                    return;
                }
            }
        } catch (e) {
            // ignore localStorage blockages
        }

        // Trigger modal with detected page context
        openPermissionModal(detectedSource);
    }, [pathname, isAuthenticated, isAuthLoading, isPushLoading, isSupported, isSubscribed, permission, openPermissionModal]);

    return null;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const [triggerSource, setTriggerSource] = useState<NotificationTriggerSource>(NOTIFICATIONS_TRIGGERS.DEFAULT);
    const pushNotification = usePushNotification();

    const openPermissionModal = (source: NotificationTriggerSource = NOTIFICATIONS_TRIGGERS.DEFAULT) => {
        setTriggerSource(source);
        setIsPermissionModalOpen(true);
    };

    const closePermissionModal = () => {
        setIsPermissionModalOpen(false);
    };

    return (
        <NotificationContext.Provider
            value={{
                isPermissionModalOpen,
                triggerSource,
                openPermissionModal,
                closePermissionModal,
                isSubscribed: pushNotification.isSubscribed,
                permission: pushNotification.permission,
                loading: pushNotification.loading,
                isSupported: pushNotification.isSupported,
                subscribe: pushNotification.subscribe,
                unsubscribe: pushNotification.unsubscribe,
            }}
        >
            {children}
            <NotificationRouteTrigger />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
