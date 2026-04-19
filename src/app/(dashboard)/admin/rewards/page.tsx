import { RewardsConfigContainer } from '@/features/admin/containers/RewardsConfigContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Rewards Configuration | Admin Dashboard',
    description: 'Manage KC Coin rewards and platform costs.',
};

export default function RewardsPage() {
    return <RewardsConfigContainer />;
}
