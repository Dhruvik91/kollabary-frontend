import { AdminTopUpContainer } from '@/features/admin/top-up/AdminTopUpContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manage Top-up Plans | Admin | Kollabary',
    description: 'Create and manage KC coin packages.',
};

export default function AdminTopUpPage() {
    return <AdminTopUpContainer />;
}
