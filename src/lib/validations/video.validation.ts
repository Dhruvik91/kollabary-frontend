import * as z from 'zod';

export const videoSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z.string().optional(),
  videoUrl: z.string().url('Must be a valid video URL'),
  price: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number().min(0, 'Price must be greater than or equal to 0').optional()
  ),
  categories: z.array(z.string()).min(1, 'Select at least one category').optional(),
});

export type VideoFormValues = z.infer<typeof videoSchema>;
