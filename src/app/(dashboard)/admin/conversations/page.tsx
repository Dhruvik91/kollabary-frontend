import { AdminConversationsContainer } from '@/features/admin/containers/AdminConversationsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Conversations',
    description: 'Platform messaging moderation and audit.',
};

export default function AdminConversationsPage() {
    return <AdminConversationsContainer />;
}
