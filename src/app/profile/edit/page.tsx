import { ProfileEditContainer } from '@/components/features/profile/container/ProfileEditContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Profile',
    description: 'Manage your Kollabary profile and social connections.',
};

export default function ProfileEditPage() {
    return (
        <div className="bg-gradient-to-tr from-background via-purple-500/5 to-background min-h-screen">
            <ProfileEditContainer />
        </div>
    );
}
