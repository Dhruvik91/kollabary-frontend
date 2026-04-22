import { AdminOrdersContainer } from '@/features/admin/containers/AdminOrdersContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Order Management | Admin | Kollabary',
    description: 'Audit and manage KC coin transactions.',
};

export default function AdminOrdersPage() {
    return <AdminOrdersContainer />;
}
