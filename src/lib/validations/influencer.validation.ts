import * as z from 'zod';
import { AvailabilityStatus } from '@/types/influencer.types';

/**
 * Influencer Profile form validation schema
 */
export const influencerProfileSchema = z.object({
    fullName: z.string().min(2, 'Full name is required').max(100, 'Full name is too long'),
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username is too long')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    categories: z.string().min(2, 'At least one category is required'),
    avatarUrl: z.string(),
    bio: z.string().min(10, 'Bio should be at least 10 characters').max(500),
    address: z.string().min(2, 'Address is required'),
    locationCountry: z.string().min(2, 'Country is required'),
    locationCity: z.string().min(2, 'City is required'),
    gender: z.string().optional(),
    languages: z.string().min(2, 'At least one language is required'),
    audienceTopCountries: z.string().optional(),
    audienceGenderRatio: z.object({
        male: z.coerce.number().min(0).max(100).optional(),
        female: z.coerce.number().min(0).max(100).optional(),
        other: z.coerce.number().min(0).max(100).optional(),
    }).optional(),
    audienceAgeBrackets: z.object({
        '13-17': z.coerce.number().min(0).max(100).optional(),
        '18-24': z.coerce.number().min(0).max(100).optional(),
        '25-34': z.coerce.number().min(0).max(100).optional(),
        '35-44': z.coerce.number().min(0).max(100).optional(),
        '45-54': z.coerce.number().min(0).max(100).optional(),
        '55-64': z.coerce.number().min(0).max(100).optional(),
        '65+': z.coerce.number().min(0).max(100).optional(),
    }).optional(),
    minPrice: z.coerce.number().min(0, 'Min price must be positive').optional(),
    maxPrice: z.coerce.number().min(0, 'Max price must be positive').optional(),
    availability: z.nativeEnum(AvailabilityStatus),
    collaborationTypes: z.array(z.string()).min(1, 'Select at least one collaboration type'),
    platforms: z.array(z.object({
        name: z.string(),
        handle: z.string().url('Please enter a valid profile URL (e.g. https://instagram.com/username)'),
        followers: z.coerce.number().min(0, 'Followers must be positive'),
        engagementRate: z.coerce.number().min(0).max(100, 'Engagement rate must be between 0-100').optional(),
    })).min(1, 'Add at least one platform'),
});

export type InfluencerProfileSchemaType = z.infer<typeof influencerProfileSchema>;
