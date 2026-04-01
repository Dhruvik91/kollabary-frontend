import * as z from 'zod';
import { CollaborationType } from '@/types/influencer.types';

export const auctionSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(100),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    minBudget: z.coerce.number().min(0).optional(),
    maxBudget: z.coerce.number().min(0).optional(),
    deadline: z.string().min(1, 'Deadline is required'),
    category: z.nativeEnum(CollaborationType).optional(),
});

export const bidSchema = z.object({
    amount: z.coerce.number().min(1, 'Bid amount must be at least 1'),
    proposal: z.string().min(20, 'Proposal must be at least 20 characters'),
});

export type AuctionFormValues = z.infer<typeof auctionSchema>;
export type BidFormValues = z.infer<typeof bidSchema>;
