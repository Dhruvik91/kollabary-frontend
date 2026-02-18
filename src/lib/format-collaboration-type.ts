import { CollaborationType } from '@/types/influencer.types';

/**
 * Format collaboration type enum values to human-readable labels
 */
export const formatCollaborationType = (type: CollaborationType | string): string => {
    const labels: Record<string, string> = {
        [CollaborationType.SPONSORED_POST]: 'Sponsored Post',
        [CollaborationType.SPONSORED_VIDEO]: 'Sponsored Video',
        [CollaborationType.UGC_CONTENT]: 'UGC Content',
        [CollaborationType.GIVEAWAY]: 'Giveaway',
        [CollaborationType.BRAND_AMBASSADOR]: 'Brand Ambassador',
        [CollaborationType.AFFILIATE_PARTNERSHIP]: 'Affiliate Partnership',
        [CollaborationType.PRODUCT_PLACEMENT]: 'Product Placement',
        [CollaborationType.LIVE_SESSION]: 'Live Session',
        [CollaborationType.EVENT_COVERAGE]: 'Event Coverage',
        [CollaborationType.REVENUE_SHARE]: 'Revenue Share',
    };

    return labels[type] || type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};
