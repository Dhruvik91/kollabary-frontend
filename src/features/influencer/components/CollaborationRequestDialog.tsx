'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Send } from 'lucide-react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useCreateCollaboration } from '@/hooks/use-collaboration.hooks';
import { CreateCollaborationDto } from '@/types/collaboration.types';

const collaborationSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    proposedTerms: z.string().min(10, 'Please outline your proposed terms'),
    startDate: z.date({
        message: "A start date is required.",
    }),
    endDate: z.date({
        message: "An end date is required.",
    }),
}).refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});

type CollaborationFormValues = z.infer<typeof collaborationSchema>;

interface CollaborationRequestDialogProps {
    influencerId: string;
    influencerName: string;
    children: React.ReactNode;
}

export const CollaborationRequestDialog = ({
    influencerId,
    influencerName,
    children,
}: CollaborationRequestDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const createCollaboration = useCreateCollaboration();

    const form = useForm<CollaborationFormValues>({
        resolver: zodResolver(collaborationSchema),
        defaultValues: {
            title: '',
            description: '',
            proposedTerms: '',
        },
    });

    const onSubmit = async (values: CollaborationFormValues) => {
        const dto: CreateCollaborationDto = {
            influencerId,
            title: values.title,
            description: values.description,
            proposedTerms: {
                details: values.proposedTerms,
            },
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
        };

        createCollaboration.mutate(dto, {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            },
        });
    };

    return (
        <>
            <div onClick={() => setOpen(true)} className="cursor-pointer">
                {children}
            </div>

            <AnimatedModal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Start Collaboration"
                description={
                    <>
                        Send a partnership request to <span className="font-bold text-foreground">{influencerName}</span>.
                    </>
                }
                size="lg"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Campaign Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Summer Collection Launch 2024"
                                            className="h-12 rounded-xl bg-muted/50 border-border/50 focus:ring-primary"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Campaign Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your brand and the goals of this collaboration..."
                                            className="min-h-[120px] rounded-xl bg-muted/50 border-border/50 focus:ring-primary resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="proposedTerms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Proposed Terms & Deliverables</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. 2 Instagram Posts, 1 YouTube Integration, Paid promotion..."
                                            className="min-h-[100px] rounded-xl bg-muted/50 border-border/50 focus:ring-primary resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="font-bold">Start Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "h-12 pl-3 text-left font-normal rounded-xl bg-muted/50 border-border/50",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 rounded-2xl border-border/50" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="font-bold">End Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "h-12 pl-3 text-left font-normal rounded-xl bg-muted/50 border-border/50",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 rounded-2xl border-border/50" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < (form.getValues('startDate') || new Date())
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg"
                            disabled={createCollaboration.isPending}
                        >
                            {createCollaboration.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Sending Request...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-5 w-5" />
                                    Send Request
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </AnimatedModal>
        </>
    );
};
