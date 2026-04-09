import { MessagingCenter } from '@/features/messaging/containers/MessagingCenter';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Messages',
    description: 'Chat with your collaborators and manage campaign communications.',
};

export default function MessagesPage() {
    return (
        <MessagingCenter />
    );
}
