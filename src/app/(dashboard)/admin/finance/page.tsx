import { AdminFinanceContainer } from '@/features/admin/containers/AdminFinanceContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Financial Analytics | Admin | Kollabary',
    description: 'Track platform revenue and KC coin sales.',
};

export default function AdminFinancePage() {
    return <AdminFinanceContainer />;
}
