import { AdminOverviewContainer } from '@/features/admin/containers/AdminOverviewContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Overview',
    description: 'Monitor platform health and growth.',
};

export default function AdminOverviewPage() {
    return <AdminOverviewContainer />;
}
