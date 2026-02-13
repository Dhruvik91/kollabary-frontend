'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2 } from 'lucide-react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ReportSchema, ReportFormValues, REPORT_REASONS } from '@/lib/validations/report';
import { useSubmitReport } from '@/hooks/queries/useReport';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetId: string;
    targetType: 'influencer' | 'review' | 'user';
    targetName: string;
}

/**
 * ReportModal - A smart component for handling content reporting.
 * Follows AI guidelines for forms, accessibility, and tokens.
 */
export const ReportModal = ({
    isOpen,
    onClose,
    targetId,
    targetType,
    targetName,
}: ReportModalProps) => {
    const submitReport = useSubmitReport();

    const form = useForm<ReportFormValues>({
        resolver: zodResolver(ReportSchema),
        defaultValues: {
            reason: '',
            description: '',
        },
    });

    const onSubmit = (values: ReportFormValues) => {
        submitReport.mutate(
            {
                targetId,
                targetType,
                reason: values.reason,
                description: values.description,
            },
            {
                onSuccess: () => {
                    form.reset();
                    onClose();
                },
            }
        );
    };

    return (
        <AnimatedModal
            isOpen={isOpen}
            onClose={onClose}
            title="Report Content"
            description={`You are reporting "${targetName}". Please provide details below.`}
            size="md"
        >
            <div className="space-y-8 py-2">
                <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 rounded-2xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-bold">Community Safety Notice</AlertTitle>
                    <AlertDescription className="text-xs">
                        Reporting is for serious violations of our community guidelines.
                        Misuse of this feature may lead to account restrictions.
                    </AlertDescription>
                </Alert>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Reason for reporting</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-14 rounded-2xl border-border/50 bg-muted/20 focus:ring-primary/20 focus:border-primary/30 transition-all">
                                                <SelectValue placeholder="Select a violation type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="rounded-2xl border-border/50">
                                            {REPORT_REASONS.map((reason) => (
                                                <SelectItem key={reason} value={reason} className="rounded-xl">
                                                    {reason}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs font-bold" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Detailed Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Provide specific details about the violation..."
                                            className="min-h-[140px] rounded-2xl border-border/50 bg-muted/20 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none p-4"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs font-bold" />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4 justify-end pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={onClose}
                                className="rounded-2xl font-bold px-8 h-12 hover:bg-muted"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={submitReport.isPending}
                                className="rounded-2xl font-bold px-10 h-12 shadow-xl shadow-destructive/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                {submitReport.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Report'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AnimatedModal>
    );
};
