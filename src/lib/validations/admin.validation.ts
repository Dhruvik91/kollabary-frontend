import { z } from 'zod';

/**
 * Admin Influencer Creation form validation schema
 */
export const createInfluencerSchema = z
    .object({
        email: z
            .string()
            .min(1, 'Email is required')
            .email('Please provide a valid email address'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z
            .string()
            .min(1, 'Please confirm the password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type CreateInfluencerFormData = z.infer<typeof createInfluencerSchema>;
