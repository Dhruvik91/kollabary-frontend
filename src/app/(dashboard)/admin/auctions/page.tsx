import { AdminAuctionsContainer } from '@/features/admin/containers/AdminAuctionsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Auctions',
    description: 'System-wide auction oversight.',
};

export default function AdminAuctionsPage() {
    return <AdminAuctionsContainer />;
}
