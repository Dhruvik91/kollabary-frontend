export type NotificationType = 'message' | 'collaboration' | 'review' | 'system';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    createdAt: Date;
    read: boolean;
    data?: any; // Additional metadata for the notification
}

export interface CreateNotificationDto {
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    data?: any;
}
