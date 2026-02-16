import { AdminInfluencerContainer } from '@/features/admin/containers/AdminInfluencerContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Influencer Management | Admin | Kollabary',
    description: 'Admin tool for creating and managing influencer accounts.',
};

export default function AdminInfluencersPage() {
    return <AdminInfluencerContainer />;
}
