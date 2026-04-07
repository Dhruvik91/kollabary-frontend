import React from 'react';
import { BrandDetailContainer } from '@/features/brand/containers/BrandDetailContainer';
import { Metadata } from 'next';
import { profileService } from '@/services/profile.service';

interface BrandDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: BrandDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    
    try {
        const brand = await profileService.getBrandProfile(id);
        const name = brand.fullName || 'Brand';
        const bio = brand.bio || 'Explore brand details, mission, and active collaboration opportunities.';
        
        return {
            title: `${name} - Brand Profile`,
            description: bio,
            openGraph: {
                title: `${name} | Kollabary`,
                description: bio,
                images: brand.avatarUrl ? [brand.avatarUrl] : undefined,
            },
        };
    } catch (error) {
        return {
            title: 'Brand Profile',
            description: 'Explore brand details, mission, and active collaboration opportunities.',
        };
    }
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
    const { id } = await params;
    
    return (
        <div className="py-8 sm:py-12">
            <BrandDetailContainer brandId={id} />
        </div>
    );
}
