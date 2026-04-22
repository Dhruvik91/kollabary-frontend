import { AdminUsersContainer } from '@/features/admin/containers/AdminUsersContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'User Management | Admin | Kollabary',
    description: 'Moderate platform users and manage account status.',
};

export default function AdminUsersPage() {
    return <AdminUsersContainer />;
}
