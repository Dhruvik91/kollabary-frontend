import { ProfileSetupContainer } from '@/features/profile/containers/ProfileSetupContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Profile | Kollabary',
    description: 'Update your personal profile details and social presence.',
};

export default function ProfileEditPage() {
    return <ProfileSetupContainer mode="edit" />;
}
