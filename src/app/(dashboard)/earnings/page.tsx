import { EarningsContainer } from '@/features/wallet/containers/EarningsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Earnings | Kollabary',
    description: 'Track your earnings and KC coin transactions.',
};

export default function EarningsPage() {
    return <EarningsContainer />;
}
