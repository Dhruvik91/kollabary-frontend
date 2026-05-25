import * as z from 'zod';

/**
 * Collaboration Request form validation schema
 */
export const collaborationSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    proposedTerms: z.string().min(10, 'Please outline your proposed terms'),
    agreedTerms: z.string().optional(),
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

export type CollaborationFormValues = z.infer<typeof collaborationSchema>;
