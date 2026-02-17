'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    AtSign,
    MapPin,
    AlignLeft,
    Sparkles,
    Link2,
    Plus,
    Trash2,
    Globe
} from 'lucide-react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const profileSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').max(30),
    fullName: z.string().min(2, 'Full name is required'),
    bio: z.string().max(300, 'Bio must be less than 300 characters').optional(),
    location: z.string().min(2, 'Location is required').optional(),
    socials: z.array(z.object({
        platform: z.string().min(1, 'Platform name is required'),
        url: z.string().url('Invalid URL format'),
    })),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;

export interface ProfileFormValues {
    username: string;
    fullName: string;
    bio?: string;
    location?: string;
    socialLinks?: Record<string, string>;
}

interface ProfileSetupFormProps {
    onSubmit: (data: ProfileFormValues) => void;
    initialData?: Partial<ProfileFormValues>;
    isLoading?: boolean;
}

export const ProfileSetupForm = ({
    onSubmit,
    initialData,
    isLoading,
}: ProfileSetupFormProps) => {
    // Transform initial socialLinks object to array for current form logic
    const initialSocials = React.useMemo(() => {
        if (!initialData?.socialLinks) return [];
        return Object.entries(initialData.socialLinks).map(([platform, url]) => ({
            platform,
            url
        }));
    }, [initialData?.socialLinks]);

    const form = useForm<ProfileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: initialData?.username || '',
            fullName: initialData?.fullName || '',
            bio: initialData?.bio || '',
            location: initialData?.location || '',
            socials: initialSocials,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control as any,
        name: "socials",
    });

    const handleFormSubmit = (values: ProfileSchemaType) => {
        // Transform socials array back to object for backend
        const socialLinks: Record<string, string> = {};
        values.socials.forEach(item => {
            if (item.platform && item.url) {
                socialLinks[item.platform.toLowerCase()] = item.url;
            }
        });

        const { socials, ...rest } = values;

        onSubmit({
            ...rest,
            socialLinks
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-zinc-200/50 dark:shadow-none"
                    >
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">Profile Details</h2>
                                    <p className="text-sm text-muted-foreground">Tell us a bit about yourself.</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold flex items-center gap-2">
                                                <User size={14} className="text-primary" />
                                                Full Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} className="h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold flex items-center gap-2">
                                                <AtSign size={14} className="text-primary" />
                                                Username
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="johndoe" {...field} className="h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold flex items-center gap-2">
                                            <MapPin size={14} className="text-primary" />
                                            Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="City, Country" {...field} className="h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold flex items-center gap-2">
                                            <AlignLeft size={14} className="text-primary" />
                                            Bio
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write a brief intro about yourself..."
                                                {...field}
                                                className="min-h-[100px] rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all resize-none px-4 py-3"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="pt-6 border-t border-border/50">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg">Social Presence</h3>
                                            <p className="text-xs text-muted-foreground">Add links to your social profiles</p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => append({ platform: '', url: '' })}
                                        className="rounded-xl border-dashed border-2 hover:border-primary hover:text-primary transition-all gap-2 h-10 px-4"
                                    >
                                        <Plus size={14} />
                                        Add Platform
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {fields.map((field, index) => (
                                            <motion.div
                                                key={field.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="grid grid-cols-[1fr,2fr,auto] gap-3 items-start p-3 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-border/50"
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name={`socials.${index}.platform`}
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-0">
                                                            <FormControl>
                                                                <Input placeholder="e.g. Threads" {...field} className="h-10 rounded-lg bg-background border-none shadow-sm" />
                                                            </FormControl>
                                                            <FormMessage className="text-[10px]" />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name={`socials.${index}.url`}
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-0">
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Link2 size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                                    <Input placeholder="https://..." {...field} className="h-10 rounded-lg bg-background border-none shadow-sm pl-8" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage className="text-[10px]" />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => remove(index)}
                                                    className="h-10 w-10 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {fields.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center py-10 border-2 border-dashed border-border/50 rounded-2xl bg-zinc-50/30 dark:bg-zinc-900/10"
                                        >
                                            <p className="text-xs font-medium text-muted-foreground">No social links added yet. Build your presence!</p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-10">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-12 px-10 rounded-2xl font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2"
                            >
                                {isLoading ? 'Saving...' : 'Complete Setup'}
                                <Sparkles size={18} />
                            </Button>
                        </div>
                    </motion.div>
                </form>
            </Form>
        </div>
    );
};
