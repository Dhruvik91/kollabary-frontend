import * as z from 'zod';

/**
 * Pitch form validation schema
 */
export const pitchSchema = z.object({
    message: z.string()
        .min(1, 'Please enter a pitch message')
        .max(1000, 'Pitch message must be at most 1000 characters'),
    workUrl: z.string()
        .url('Please enter a valid URL (e.g. https://example.com/work)')
        .optional()
        .or(z.literal('')),
});

export type PitchFormValues = z.infer<typeof pitchSchema>;
