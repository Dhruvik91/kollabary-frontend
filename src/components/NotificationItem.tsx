'use client';

import { useNotificationStore } from '@/stores/notificationStore';
import { Notification } from '@/types/notification';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Users, Star, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const iconMap = {
    message: MessageSquare,
    collaboration: Users,
    review: Star,
    system: Bell,
};

const colorMap = {
    message: 'text-blue-500',
    collaboration: 'text-purple-500',
    review: 'text-yellow-500',
    system: 'text-gray-500',
};

interface NotificationItemProps {
    notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
    const router = useRouter();
    const markAsRead = useNotificationStore((state) => state.markAsRead);
    const Icon = iconMap[notification.type];
    const iconColor = colorMap[notification.type];

    const handleClick = () => {
        markAsRead(notification.id);
        if (notification.link) {
            router.push(notification.link);
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            className={cn(
                'w-full p-3 text-left hover:bg-glass-border/30 transition-all flex gap-3 items-start',
                !notification.read && 'bg-primary/5'
            )}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Icon */}
            <div
                className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0',
                    notification.read ? 'bg-secondary' : 'bg-primary/10'
                )}
            >
                <Icon
                    className={cn(
                        'h-5 w-5',
                        notification.read ? 'text-muted-foreground' : iconColor
                    )}
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p
                    className={cn(
                        'text-sm mb-1',
                        !notification.read ? 'font-semibold' : 'font-medium'
                    )}
                >
                    {notification.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                    {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                    })}
                </p>
            </div>

            {/* Unread Indicator */}
            {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
            )}
        </motion.button>
    );
}
