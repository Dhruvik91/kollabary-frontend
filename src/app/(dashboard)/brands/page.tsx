import { BrandDiscoverContainer } from '@/features/brand/containers/BrandDiscoverContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Discover Brands',
    description: 'Find and connect with top brands for your next collaboration.',
};

export default function BrandsPage() {
    return <BrandDiscoverContainer />;
}
