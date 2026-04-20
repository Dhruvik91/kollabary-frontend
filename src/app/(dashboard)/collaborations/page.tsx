import { CollaborationListContainer } from '@/features/collaboration/containers/CollaborationListContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Collaborations',
    description: 'Manage and track your influencer collaboration projects.',
};

export default function CollaborationsPage() {
    return <CollaborationListContainer />;
}
