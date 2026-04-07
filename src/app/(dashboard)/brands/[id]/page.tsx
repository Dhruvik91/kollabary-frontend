import React from 'react';
import { BrandDetailContainer } from '@/features/brand/containers/BrandDetailContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Brand Profile | Kollabary',
    description: 'Explore brand details, mission, and active collaboration opportunities.',
};

interface BrandDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
    const { id } = await params;
    
    return (
        <div className="py-8 sm:py-12">
            <BrandDetailContainer brandId={id} />
        </div>
    );
}
