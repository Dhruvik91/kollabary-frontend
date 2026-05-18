import { useState, useEffect, useCallback } from 'react';
import { notificationsService } from '@/services/notifications.service';
import { toast } from 'sonner';

// Helper to convert VAPID public key
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function usePushNotification() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [loading, setLoading] = useState(true);
    const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

    // Initial check for push subscription status
    const checkSubscription = useCallback(async (reg: ServiceWorkerRegistration) => {
        try {
            const sub = await reg.pushManager.getSubscription();
            setIsSubscribed(!!sub);
            setPermission(Notification.permission);
        } catch (error) {
            console.error('Error checking push subscription status:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
            setLoading(false);
            return;
        }

        // Get active registration or register a new one for push if none
        navigator.serviceWorker.ready.then((reg) => {
            setSwRegistration(reg);
            checkSubscription(reg);
        }).catch((err) => {
            console.error('Service worker is not ready:', err);
            setLoading(false);
        });
    }, [checkSubscription]);

    const subscribe = async () => {
        if (!swRegistration) {
            toast.error('Notifications service is not ready yet');
            return false;
        }

        setLoading(true);
        try {
            // 1. Request permission
            const perm = await Notification.requestPermission();
            setPermission(perm);
            if (perm !== 'granted') {
                toast.error('Notification permission was denied');
                setLoading(false);
                return false;
            }

            // 2. Fetch VAPID public key
            const { publicKey } = await notificationsService.getVapidPublicKey();
            if (!publicKey) {
                throw new Error('VAPID public key was not returned from backend');
            }

            const applicationServerKey = urlBase64ToUint8Array(publicKey);

            // 3. Register to push manager
            const subscription = await swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey,
            });

            // 4. Send subscription payload to backend database
            await notificationsService.subscribe(subscription);
            setIsSubscribed(true);
            toast.success('Successfully subscribed to Push Notifications!');
            return true;
        } catch (error: any) {
            console.error('Failed to subscribe to push notifications:', error);
            toast.error(error.message || 'Failed to enable push notifications');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const unsubscribe = async () => {
        if (!swRegistration) {
            toast.error('Notifications service is not ready yet');
            return false;
        }

        setLoading(true);
        try {
            const sub = await swRegistration.pushManager.getSubscription();
            if (sub) {
                // 1. Send unregister request to backend database
                await notificationsService.unsubscribe(sub.endpoint);
                
                // 2. Unsubscribe browser client
                await sub.unsubscribe();
            }
            setIsSubscribed(false);
            toast.success('Unsubscribed from Push Notifications.');
            return true;
        } catch (error: any) {
            console.error('Failed to unsubscribe from push notifications:', error);
            toast.error(error.message || 'Failed to disable push notifications');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        isSubscribed,
        permission,
        loading,
        subscribe,
        unsubscribe,
        isSupported: typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window,
    };
}
