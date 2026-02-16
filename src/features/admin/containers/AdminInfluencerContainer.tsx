'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminInfluencerForm } from '../components/AdminInfluencerForm';
import { useCreateInfluencer } from '@/hooks/use-admin.hooks';
import { CreateInfluencerFormData } from '@/lib/validations/admin.validation';
import { FRONTEND_ROUTES } from '@/constants';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            {/* Navigation & Header */}
            <div className="flex flex-col gap-4">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="group w-fit -ml-2 text-muted-foreground hover:text-foreground"
                >
                    <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Overview
                </Button>

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Influencer Management</h1>
                    <p className="text-muted-foreground">
                        Create and manage influencer accounts within the platform.
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center pt-8">
                <AdminInfluencerForm
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                />
            </div>
        </div>
    );
}
