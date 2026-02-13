import { AdminRankingContainer } from '@/features/admin/containers/AdminRankingContainer';

export const metadata = {
    title: 'Admin Ranking | Kollabary',
    description: 'Adjust algorithm weights and manage global score recalculation.',
};

export default function AdminRankingPage() {
    return <AdminRankingContainer />;
}
