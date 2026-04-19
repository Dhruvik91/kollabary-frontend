import { ReferralConfigContainer } from '@/features/admin/containers/ReferralConfigContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Referral Configuration | Admin Dashboard',
    description: 'Manage referral rewards and system settings.',
};

export default function ReferralsPage() {
    return <ReferralConfigContainer />;
}
