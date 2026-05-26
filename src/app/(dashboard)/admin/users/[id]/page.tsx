'use client';

import React, { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { InfluencerDetailContainer } from '@/features/influencer/containers/InfluencerDetailContainer';
import { BrandDetailContainer } from '@/features/brand/containers/BrandDetailContainer';
import { Loader2 } from 'lucide-react';

function UserDetailPageContent() {
    const params = useParams<{ id: string }>();
    const searchParams = useSearchParams();

    const id = params.id;
    const role = searchParams.get('role');

    if (role === 'influencer') {
        return <InfluencerDetailContainer />;
    }

    if (role === 'brand') {
        return <BrandDetailContainer brandId={id} />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <p className="text-lg font-medium text-muted-foreground">
                Invalid user role specified
            </p>
        </div>
    );
}

export default function UserDetailPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading details...</p>
            </div>
        }>
            <UserDetailPageContent />
        </Suspense>
    );
}
