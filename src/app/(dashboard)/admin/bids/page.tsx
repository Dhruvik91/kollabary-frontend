import { AdminBidsContainer } from '@/features/admin/containers/AdminBidsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Bids',
    description: 'System-wide bid tracking.',
};

export default function AdminBidsPage() {
    return <AdminBidsContainer />;
}
