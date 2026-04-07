import { DashboardOverviewContainer } from '@/features/dashboard/containers/DashboardOverviewContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Overview',
    description: 'Monitor your collaboration performance and upcoming tasks.',
};

export default function DashboardPage() {
    return <DashboardOverviewContainer />;
}
