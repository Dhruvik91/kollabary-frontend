import { Metadata } from 'next';
import { SettingsContainer } from '@/components/features/settings/SettingsContainer';

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Manage your account settings and preferences',
};

export default function SettingsPage() {
    return <SettingsContainer />;
}
