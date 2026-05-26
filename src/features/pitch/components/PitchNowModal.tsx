'use client';

import posthog from 'posthog-js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { useCreatePitch } from '@/hooks/use-pitch.hooks';
import { useActionConsent } from '@/hooks/use-action-consent';
import { useConfetti } from '@/contexts/confetti-context';
import { UserProfile } from '@/services/profile.service';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import Image from 'next/image';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { pitchSchema, PitchFormValues } from '@/lib/validations/pitch.validation';

interface PitchNowModalProps {
    isOpen: boolean;
    onClose: () => void;
    brand: UserProfile;
}

export const PitchNowModal = ({
    isOpen,
    onClose,
    brand
}: PitchNowModalProps) => {
    const createPitch = useCreatePitch();
    const { triggerConfetti } = useConfetti();

    const form = useForm<PitchFormValues>({
        resolver: zodResolver(pitchSchema),
        defaultValues: {
            message: '',
            workUrl: '',
        },
    });

    const { executeWithConsent, ConsentModalElement } = useActionConsent({
        actionType: 'PITCH_CREATE',
        title: 'Confirm Pitch Request',
        actionName: 'Send Pitch'
    });

    const onSubmit = async (data: PitchFormValues) => {
        executeWithConsent(async () => {
            try {
                await createPitch.mutateAsync({
                    targetId: brand.user?.id || '',
                    message: data.message,
                    workUrl: data.workUrl?.trim() || undefined
                });
                posthog.capture('pitch_sent', {
                    brand_id: brand.user?.id,
                    has_work_url: !!data.workUrl?.trim(),
                });
                triggerConfetti({ numberOfPieces: 500 });
                onClose();
                form.reset();
            } catch (error) {
                // Error handled by hook toast
            }
        });
    };

    return (
        <>
            <AnimatedModal
                isOpen={isOpen}
                onClose={onClose}
                title={
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                            <Sparkles size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tight uppercase">Pitch to Brand</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Collaboration Request</span>
                        </div>
                    </div>
                }
                size="md"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Brand Info Mini Card */}
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-card border border-border/50 relative shrink-0">
                                {brand.avatarUrl || brand.profileImage ? (
                                    <Image
                                        src={brand.avatarUrl || brand.profileImage || ''}
                                        alt={brand.fullName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-black italic text-primary bg-primary/5">
                                        {brand.fullName.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-sm truncate uppercase tracking-tight">{brand.fullName}</h4>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target Brand</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="workUrl"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-black uppercase tracking-[0.15em] text-foreground/70 px-1">
                                            Reference Work (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="bg-background/50"
                                                message='Work Image or Video'
                                                maxSize={100}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <div className="flex items-center justify-between px-1">
                                            <FormLabel className="text-xs font-black uppercase tracking-[0.15em] text-foreground/70">
                                                Your Pitch Message
                                            </FormLabel>
                                            <span className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                                {(field.value || '').length} / 1000
                                            </span>
                                        </div>
                                        <FormControl>
                                            <div className="relative group">
                                                <Textarea
                                                    placeholder="Why should this brand collaborate with you? Highlight your value, audience fit, and creative ideas..."
                                                    {...field}
                                                    className="min-h-[200px] rounded-3xl border-border/50 bg-background/50 focus:bg-background focus:ring-primary/20 focus:border-primary/30 transition-all resize-none p-6 font-medium leading-relaxed placeholder:text-muted-foreground/50 scrollbar-none"
                                                    maxLength={1000}
                                                />
                                                <div className="absolute inset-0 rounded-3xl bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest border-border/50 hover:bg-muted transition-all"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!form.watch('message')?.trim() || createPitch.isPending}
                                className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-2"
                            >
                                {createPitch.isPending ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Pitch
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </AnimatedModal>

            {ConsentModalElement}
        </>
    );
};
