import React from 'react';
import { CollaborationDetailContainer } from '@/features/collaboration/containers/CollaborationDetailContainer';

interface PageProps {
    params: {
        id: string;
    };
}

export default function CollaborationDetailPage({ params }: PageProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollaborationDetailContainer id={params.id} />
        </div>
    );
}
