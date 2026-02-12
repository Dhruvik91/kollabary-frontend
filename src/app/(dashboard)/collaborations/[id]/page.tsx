import { use } from 'react';
import { CollaborationDetailContainer } from '@/features/collaboration/containers/CollaborationDetailContainer';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function CollaborationDetailPage({ params }: PageProps) {
    const resolvedParams = use(params);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollaborationDetailContainer id={resolvedParams.id} />
        </div>
    );
}
