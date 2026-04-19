import { ReferralContainer } from '@/features/referral/containers/ReferralContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Referrals | Kollabary',
    description: 'Invite your friends and earn KC coins.',
};

export default function ReferralsPage() {
    return <ReferralContainer />;
}
