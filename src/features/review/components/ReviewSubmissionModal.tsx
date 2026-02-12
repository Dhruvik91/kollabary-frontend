'use client';

import React from 'react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { ReviewForm } from './ReviewForm';
import { Star } from 'lucide-react';

interface ReviewSubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    influencerName: string;
    onSubmit: (data: { rating: number; comment: string }) => void;
    isLoading?: boolean;
    initialData?: { rating: number; comment: string };
    title?: string;
    description?: string;
}

export const ReviewSubmissionModal = ({
    isOpen,
    onClose,
    influencerName,
    onSubmit,
    isLoading,
    initialData,
    title,
    description,
}: ReviewSubmissionModalProps) => {
    return (
        <AnimatedModal
            isOpen={isOpen}
            onClose={onClose}
            title={title || `Review ${influencerName}`}
            description={description || "Provide your honest feedback about this collaboration to help other brands and improve the influencer's ranking."}
            size="md"
        >
            <div className="py-2">
                <ReviewForm
                    initialData={initialData}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    onCancel={onClose}
                />
            </div>
        </AnimatedModal>
    );
};
