'use client';

import { useNotificationStore } from '@/stores/notificationStore';
import { NotificationItem } from '@/components/NotificationItem';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function NotificationList() {
    const { notifications, markAllAsRead, clearAll } = useNotificationStore();
    const unreadCount = useNotificationStore((state) => state.getUnreadCount());

    if (notifications.length === 0) {
        return (
            <div className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-3" />
                <h3 className="font-semibold mb-1">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                    You're all caught up!
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col max-h-[500px]">
            {/* Header */}
            <div className="p-3 border-b border-glass-border flex items-center justify-between bg-glass/50">
                <div>
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <p className="text-xs text-muted-foreground">
                            {unreadCount} unread
                        </p>
                    )}
                </div>
                <div className="flex gap-1">
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="h-8 text-xs hover:bg-primary/10"
                        >
                            <CheckCheck className="h-3 w-3 mr-1" />
                            Mark all read
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="h-8 text-xs text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Clear
                    </Button>
                </div>
            </div>

            {/* List */}
            <ScrollArea className="flex-1">
                <div className="divide-y divide-glass-border">
                    {notifications.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
