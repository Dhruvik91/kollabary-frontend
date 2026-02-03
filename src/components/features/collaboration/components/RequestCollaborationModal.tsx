'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCreateCollaboration } from '@/hooks/useCollaborations';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const collaborationSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Please provide more details about the project'),
    budget: z.coerce.number().min(1, 'Budget is required'),
    deadline: z.string().optional(),
});

type CollaborationFormValues = z.infer<typeof collaborationSchema>;

interface RequestCollaborationModalProps {
    isOpen: boolean;
    onClose: () => void;
    influencerId: string;
    influencerName: string;
}

export function RequestCollaborationModal({
    isOpen,
    onClose,
    influencerId,
    influencerName
}: RequestCollaborationModalProps) {
    const { mutate: createCollaboration, isPending } = useCreateCollaboration();
    const { toast } = useToast();

    const form = useForm<CollaborationFormValues>({
        resolver: zodResolver(collaborationSchema),
        defaultValues: {
            title: '',
            description: '',
            budget: 0,
            deadline: '',
        },
    });

    const onSubmit = (data: CollaborationFormValues) => {
        createCollaboration(
            { ...data, influencerId },
            {
                onSuccess: () => {
                    toast({
                        title: 'Proposal Sent!',
                        description: `Your collaboration request has been sent to ${influencerName}.`,
                    });
                    onClose();
                    form.reset();
                },
                onError: (err: any) => {
                    toast({
                        title: 'Failed to send proposal',
                        description: err?.response?.data?.message || 'Please try again later.',
                        variant: 'destructive',
                    });
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] glass-enhanced border-white/10">
                <DialogHeader>
                    <DialogTitle>Collaboration Proposal</DialogTitle>
                    <DialogDescription>
                        Send a message to {influencerName} with your project details and budget.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Campaign Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Summer Collection Push 2024" className="bg-white/5" {...field} />
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
                                    <FormLabel>Project Brief</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe what you're looking for..."
                                            className="bg-white/5 min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Budget ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="bg-white/5" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deadline (Optional)</FormLabel>
                                        <FormControl>
                                            <Input type="date" className="bg-white/5" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Proposal'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
