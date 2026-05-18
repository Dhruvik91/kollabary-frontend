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

/**
 * Admin Top-up Plan form validation schema
 */
export const planSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
    coins: z.coerce.number().min(1, 'Coins must be greater than 0'),
    bonusCoins: z.coerce.number().min(0).default(0),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    isPopular: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

export type PlanFormValues = z.infer<typeof planSchema>;

