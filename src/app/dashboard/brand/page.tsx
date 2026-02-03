import { BrandDashboardContainer } from '@/components/features/dashboard/container/BrandDashboardContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Brand Dashboard',
    description: 'Manage your campaigns and partners.',
};

export default function BrandDashboardPage() {
    return (
        <div className="bg-gradient-to-br from-background via-primary/5 to-background min-h-screen">
            <BrandDashboardContainer />
        </div>
    );
}
