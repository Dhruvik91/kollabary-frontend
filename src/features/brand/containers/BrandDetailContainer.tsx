'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useBrandProfile } from '@/hooks/queries/useProfileQueries';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { FRONTEND_ROUTES } from '@/constants';
import { BackButton } from '@/components/shared/BackButton';
import { BrandDetailHeader } from '../components/BrandDetailHeader';
import { BrandAbout } from '../components/BrandAbout';
import { BrandAuctionList } from '../components/BrandAuctionList';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReportModal } from '@/features/report/components/ReportModal';

interface BrandDetailContainerProps {
    brandId: string;
}

export const BrandDetailContainer = ({ brandId }: BrandDetailContainerProps) => {
    const router = useRouter();
    const { data: brand, isLoading, error } = useBrandProfile(brandId);
    const { mutate: startConversation, isPending: isStartingChat } = useStartConversation();
    const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="relative">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                    <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
                </div>
                <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Uncovering Brand Profile</h3>
                    <p className="text-muted-foreground animate-pulse">Connecting to the business ecosystem...</p>
                </div>
            </div>
        );
    }

    if (error || !brand) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive">
                    <AlertCircle size={32} />
                </div>
                <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Profile Not Found</h3>
                    <p className="text-muted-foreground">We couldn't find the brand profile you're looking for.</p>
                </div>
                <Button onClick={() => router.back()} className="rounded-xl px-8 h-12 font-bold bg-primary shadow-xl shadow-primary/20">
                    Go Back
                </Button>
            </div>
        );
    }

    const handleContact = () => {
        if (brand.user?.id) {
            startConversation(brand.user.id, {
                onSuccess: (conversation) => {
                    router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
                },
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 pb-20 px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <BackButton label="Back to Dashboard" className="p-0 font-bold opacity-70 hover:opacity-100 transition-opacity" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-10 sm:space-y-14 lg:space-y-16"
            >
                <BrandDetailHeader 
                    brand={brand} 
                    isStartingChat={isStartingChat}
                    onContact={handleContact}
                    onReport={() => setIsReportModalOpen(true)}
                />

                <BrandAbout brand={brand} />

                <BrandAuctionList auctions={brand.activeAuctions || []} />
            </motion.div>

            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetId={brand.user?.id || brand.id}
                targetType="user"
                targetName={brand.fullName}
            />
        </div>
    );
};
