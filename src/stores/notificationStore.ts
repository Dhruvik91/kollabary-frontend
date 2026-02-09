import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification, CreateNotificationDto } from '@/types/notification';

interface NotificationStore {
    notifications: Notification[];
    lastCheckTime: Date;
    addNotification: (notification: CreateNotificationDto) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    clearAll: () => void;
    updateLastCheckTime: () => void;
    getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>()(
    persist(
        (set, get) => ({
            notifications: [],
            lastCheckTime: new Date(),

            addNotification: (notification: CreateNotificationDto) => {
                const newNotification: Notification = {
                    ...notification,
                    id: crypto.randomUUID(),
                    createdAt: new Date(),
                    read: false,
                };

                set((state) => ({
                    notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep last 50
                }));
            },

            markAsRead: (id: string) =>
                set((state) => ({
                    notifications: state.notifications.map((n) =>
                        n.id === id ? { ...n, read: true } : n
                    ),
                })),

            markAllAsRead: () =>
                set((state) => ({
                    notifications: state.notifications.map((n) => ({ ...n, read: true })),
                })),

            clearAll: () => set({ notifications: [] }),

            updateLastCheckTime: () => set({ lastCheckTime: new Date() }),

            getUnreadCount: () => get().notifications.filter((n) => !n.read).length,
        }),
        {
            name: 'kollabary-notifications',
            partialize: (state) => ({
                notifications: state.notifications,
                lastCheckTime: state.lastCheckTime,
            }),
        }
    )
);
