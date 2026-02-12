import { CollaborationListContainer } from '@/features/collaboration/containers/CollaborationListContainer';
import { Handshake } from 'lucide-react';

export default function CollaborationsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <Handshake size={24} />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Collaborations</h1>
                </div>
                <p className="text-muted-foreground text-lg">
                    Manage your active partnerships, review requests, and track campaign progress.
                </p>
            </div>
            <CollaborationListContainer />
        </div>
    );
}
