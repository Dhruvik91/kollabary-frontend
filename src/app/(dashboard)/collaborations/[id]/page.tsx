import { use } from 'react';
import { CollaborationDetailContainer } from '@/features/collaboration/containers/CollaborationDetailContainer';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    return {
        title: `Collaboration ${id.slice(0, 8)}...`,
        description: 'View collaboration details and manage project milestones.',
    };
}

export default function CollaborationDetailPage({ params }: PageProps) {
    const resolvedParams = use(params);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollaborationDetailContainer id={resolvedParams.id} />
        </div>
    );
}
