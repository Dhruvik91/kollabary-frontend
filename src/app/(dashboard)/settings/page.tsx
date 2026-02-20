import { InfluencerSettingsContainer } from '@/features/influencer/containers/InfluencerSettingsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings | Kollabary',
    description: 'Manage your availability, security, collaboration types, and account verification.',
};

export default function SettingsPage() {
    return <InfluencerSettingsContainer />;
}
