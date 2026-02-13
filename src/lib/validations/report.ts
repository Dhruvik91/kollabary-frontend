import * as z from 'zod';

export const ReportSchema = z.object({
    reason: z.string().min(1, 'Please select a reason for reporting'),
    description: z.string().min(10, 'Please provide more details (at least 10 characters)').max(1000, 'Description is too long'),
});

export type ReportFormValues = z.infer<typeof ReportSchema>;

export const REPORT_REASONS = [
    'Inappropriate content',
    'Spam or misleading',
    'Fake profile/Identity theft',
    'Harassment or hate speech',
    'Intellectual property violation',
    'Other',
];
