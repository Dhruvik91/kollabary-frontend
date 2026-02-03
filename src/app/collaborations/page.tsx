import { CollaborationListContainer } from '@/components/features/collaboration/container/CollaborationListContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Collaborations',
    description: 'Manage your influencer-brand partnerships.',
};

export default function CollaborationsPage() {
    return (
        <div className="bg-gradient-to-bl from-background via-blue-500/5 to-background min-h-screen">
            <CollaborationListContainer />
        </div>
    );
}
