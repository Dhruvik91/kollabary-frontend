import { ProfileDetailContainer } from '@/features/profile/containers/ProfileDetailContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Profile | Kollabary',
    description: 'View and manage your personal profile details.',
};

export default function ProfilePage() {
    return <ProfileDetailContainer />;
}
