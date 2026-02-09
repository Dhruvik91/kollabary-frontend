'use client';

import { useEffect, useRef } from 'react';
import { useMyConversations } from './useMessaging';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAuth } from '@/providers/auth-provider';

/**
 * Hook that monitors APIs for changes and generates notifications
 * Should be used once in the app layout
 */
export function useNotificationDetector() {
    const { user } = useAuth();
    const { data: conversations } = useMyConversations();
    const { addNotification, lastCheckTime, updateLastCheckTime, notifications } = useNotificationStore();

    // Track which conversations we've already notified about
    const notifiedConversations = useRef(new Set<string>());

    useEffect(() => {
        if (!user || !conversations) return;

        // Check for new messages
        conversations.forEach((conv) => {
            if (!conv.lastMessageAt) return;

            const lastMessageTime = new Date(conv.lastMessageAt);
            const notificationKey = `${conv.id}-${lastMessageTime.getTime()}`;

            // Only notify if:
            // 1. Message is newer than last check time
            // 2. We haven't already notified about this specific message
            // 3. The last message wasn't sent by the current user
            if (
                lastMessageTime > lastCheckTime &&
                !notifiedConversations.current.has(notificationKey)
            ) {
                const otherUser = conv.userOne.id === user.id ? conv.userTwo : conv.userOne;

                // Check if notification already exists
                const existingNotification = notifications.find(
                    n => n.data?.conversationId === conv.id &&
                        new Date(n.createdAt).getTime() === lastMessageTime.getTime()
                );

                if (!existingNotification) {
                    addNotification({
                        type: 'message',
                        title: 'New Message',
                        message: `${otherUser.name || otherUser.email} sent you a message`,
                        link: `/messages?id=${conv.id}`,
                        data: { conversationId: conv.id, timestamp: lastMessageTime.getTime() },
                    });

                    notifiedConversations.current.add(notificationKey);
                }
            }
        });

        // Update last check time after processing
        updateLastCheckTime();
    }, [conversations, user]);

    // Clean up old notification keys periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (notifiedConversations.current.size > 100) {
                notifiedConversations.current.clear();
            }
        }, 60000); // Every minute

        return () => clearInterval(interval);
    }, []);
}
