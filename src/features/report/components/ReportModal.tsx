'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Button } from '@/components/ui/button';
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
            <div className="space-y-6 py-4">
                <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-600 dark:text-amber-500 text-sm">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <p>
                        Reporting is for serious violations of our community guidelines.
                        Misuse of this feature may lead to account restrictions.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Reason for reporting</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12 rounded-xl focus:ring-primary/20">
                                                <SelectValue placeholder="Select a reason" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="rounded-xl">
                                            {REPORT_REASONS.map((reason) => (
                                                <SelectItem key={reason} value={reason}>
                                                    {reason}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Detailed Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Please describe the issue in detail..."
                                            className="min-h-[120px] rounded-xl focus:ring-primary/20 resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 justify-end pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="rounded-xl font-bold px-6"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={submitReport.isPending}
                                className="rounded-xl font-bold px-8 shadow-xl shadow-red-500/20"
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
