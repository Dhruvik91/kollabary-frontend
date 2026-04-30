'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminInfluencerForm } from '../components/AdminInfluencerForm';
import { useCreateInfluencer } from '@/hooks/use-admin.hooks';
import { CreateInfluencerFormData } from '@/lib/validations/admin.validation';
import { FRONTEND_ROUTES } from '@/constants';
import { BackButton } from '@/components/shared/BackButton';

import { PageHeader } from '@/components/shared/PageHeader';
import { UserPlus } from 'lucide-react';

export function AdminInfluencerContainer() {
    const router = useRouter();
    const { mutate: createInfluencer, isPending } = useCreateInfluencer();

    const handleSubmit = (data: CreateInfluencerFormData) => {
        createInfluencer(data, {
            onSuccess: () => {
                // Success toast is handled in the hook
                // We could redirect or stay on page. Staying might be better for bulk creation.
                // For now, let's just stay.
            }
        });
    };

    return (
        <div className="mx-auto max-w-5xl space-y-8 pb-10">
            <PageHeader
                label="Direct Provisioning"
                title="Create"
                highlightedTitle="Influencer"
                subtitle="Create and manage influencer accounts within the platform."
                icon={UserPlus}
            />

            <div className="flex flex-col items-center justify-center pt-8">
                <AdminInfluencerForm
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                />
            </div>
        </div>
    );
}
