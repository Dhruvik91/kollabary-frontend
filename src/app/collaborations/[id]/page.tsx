import { Metadata } from 'next';
import { CollaborationDetailContainer } from '@/components/features/collaboration/container/CollaborationDetailContainer';

export const metadata: Metadata = {
    title: 'Collaboration Details',
    description: 'View and manage collaboration details, timeline, and deliverables.',
};

export default function CollaborationDetailPage() {
    return (
        <div className="bg-gradient-to-bl from-background via-purple-500/5 to-background min-h-screen">
            <CollaborationDetailContainer />
        </div>
    );
}
