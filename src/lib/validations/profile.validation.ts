import * as z from 'zod';

/**
 * Brand/User Profile form validation schema
 */
export const profileSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be at most 30 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores (no spaces or special characters)'),
    fullName: z.string().min(2, 'Full name is required'),
    bio: z.string().max(300, 'Bio must be less than 300 characters').optional(),
    location: z.string().min(2, 'Location is required').optional(),
    avatarUrl: z.string().optional(),
    socials: z.array(z.object({
        platform: z.string().min(1, 'Platform name is required'),
        url: z.string().url('Invalid URL format'),
    })),
    categories: z.array(z.string()).min(1, 'At least one category is required'),
    website: z.string().url('Invalid URL format').optional().or(z.literal('')),
    industry: z.string().optional(),
    companySize: z.string().optional(),
    brandTone: z.string().optional(),
    contactEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
    contactPhone: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
