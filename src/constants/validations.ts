import * as z from "zod";

export const influencerSchema = z.object({
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    location: z.string().min(2, "Location is required"),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    categories: z.string().min(1, "At least one category is required (comma separated)"),
});

export type InfluencerSchemaType = z.infer<typeof influencerSchema>;
