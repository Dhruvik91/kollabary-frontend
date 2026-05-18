import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants';

export const notificationsService = {
    /**
     * Get the VAPID public key from backend
     */
    getVapidPublicKey: async () => {
        const response = await httpService.get<{ publicKey: string }>(
            API_CONFIG.path.notifications.vapidKey
        );
        return response.data;
    },

    /**
     * Register a new push subscription
     */
    subscribe: async (subscription: PushSubscription) => {
        const response = await httpService.post<{ success: boolean; message: string }>(
            API_CONFIG.path.notifications.subscribe,
            subscription
        );
        return response.data;
    },

    /**
     * Unregister an existing push subscription
     */
    unsubscribe: async (endpoint: string) => {
        const response = await httpService.post<{ success: boolean; message: string }>(
            API_CONFIG.path.notifications.unsubscribe,
            { endpoint }
        );
        return response.data;
    }
};
