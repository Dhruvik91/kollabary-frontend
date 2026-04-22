'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutGrid,
    AtSign,
    Users,
    Plus,
    Trash2,
    Briefcase,
    MapPin,
    AlignLeft,
    Check,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Instagram,
    Youtube,
    Twitter,
    Globe,
    Link as LinkIcon
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { AvailabilityStatus, CollaborationType } from '@/types/influencer.types';
import { cn } from '@/lib/utils';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { formatCollaborationType } from '@/lib/format-collaboration-type';

const profileSchema = z.object({
    fullName: z.string().min(2, 'Full name is required').max(100, 'Full name is too long'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username is too long').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
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

interface ProfileFormValues {
    fullName: string;
    username: string;
    categories: string;
    avatarUrl: string;
    bio: string;
    address: string;
    locationCountry: string;
    locationCity: string;
    gender?: string;
    languages: string;
    audienceTopCountries?: string;
    audienceGenderRatio?: {
        male?: number;
        female?: number;
        other?: number;
    };
    audienceAgeBrackets?: {
        '13-17'?: number;
        '18-24'?: number;
        '25-34'?: number;
        '35-44'?: number;
        '45-54'?: number;
        '55-64'?: number;
        '65+'?: number;
    };
    minPrice?: number;
    maxPrice?: number;
    availability: AvailabilityStatus;
    collaborationTypes: string[];
    platforms: {
        name: string;
        handle: string;
        followers: number;
        engagementRate?: number;
    }[];
}

interface InfluencerProfileFormProps {
    onSubmit: (data: any) => void;
    initialData?: any;
    isLoading?: boolean;
    submitLabel?: string;
    mode?: 'setup' | 'edit';
}

const steps = [
    { id: 'basics', title: 'The Basics', icon: Briefcase },
    { id: 'platforms', title: 'Your Reach', icon: Users },
    { id: 'demographics', title: 'Demographics', icon: Sparkles },
    { id: 'preferences', title: 'Preferences', icon: LayoutGrid },
];

export const InfluencerProfileForm = ({
    onSubmit,
    initialData,
    isLoading,
    submitLabel,
    mode = 'setup'
}: InfluencerProfileFormProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema) as any,
        defaultValues: {
            fullName: initialData?.fullName || '',
            username: initialData?.user?.username || initialData?.username || '',
            categories: Array.isArray(initialData?.categories) ? initialData.categories.join(', ') : (typeof initialData?.categories === 'string' ? initialData.categories : ''),
            avatarUrl: initialData?.avatarUrl || '',
            bio: initialData?.bio || '',
            address: initialData?.address || '',
            locationCountry: initialData?.locationCountry || '',
            locationCity: initialData?.locationCity || '',
            gender: initialData?.gender || '',
            languages: Array.isArray(initialData?.languages) ? initialData.languages.join(', ') : (typeof initialData?.languages === 'string' ? initialData.languages : 'English'),
            audienceTopCountries: Array.isArray(initialData?.audienceTopCountries) ? initialData.audienceTopCountries.join(', ') : (typeof initialData?.audienceTopCountries === 'string' ? initialData.audienceTopCountries : ''),
            audienceGenderRatio: initialData?.audienceGenderRatio || { male: 0, female: 0, other: 0 },
            audienceAgeBrackets: initialData?.audienceAgeBrackets || { '13-17': 0, '18-24': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55-64': 0, '65+': 0 },
            minPrice: initialData?.minPrice || 0,
            maxPrice: initialData?.maxPrice || 0,
            availability: initialData?.availability || AvailabilityStatus.OPEN,
            collaborationTypes: initialData?.collaborationTypes || [],
            platforms: initialData?.platforms || [{ name: 'Instagram', handle: '', followers: 0, engagementRate: 0 }],
        },
    });

    // Handle form reset when initialData is loaded
    React.useEffect(() => {
        if (initialData) {
            form.reset({
                fullName: initialData.fullName || '',
                username: initialData.user?.username || initialData.username || '',
                categories: Array.isArray(initialData.categories) ? initialData.categories.join(', ') : (typeof initialData.categories === 'string' ? initialData.categories : ''),
                avatarUrl: initialData.avatarUrl || '',
                bio: initialData.bio || '',
                address: initialData.address || '',
                locationCountry: initialData.locationCountry || '',
                locationCity: initialData.locationCity || '',
                gender: initialData.gender || '',
                languages: Array.isArray(initialData.languages) ? initialData.languages.join(', ') : (typeof initialData.languages === 'string' ? initialData.languages : 'English'),
                audienceTopCountries: Array.isArray(initialData.audienceTopCountries) ? initialData.audienceTopCountries.join(', ') : (typeof initialData.audienceTopCountries === 'string' ? initialData.audienceTopCountries : ''),
                audienceGenderRatio: initialData.audienceGenderRatio || { male: 0, female: 0, other: 0 },
                audienceAgeBrackets: initialData.audienceAgeBrackets || { '13-17': 0, '18-24': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55-64': 0, '65+': 0 },
                minPrice: initialData.minPrice || 0,
                maxPrice: initialData.maxPrice || 0,
                availability: initialData.availability || AvailabilityStatus.OPEN,
                collaborationTypes: initialData.collaborationTypes || [],
                platforms: initialData.platforms || [{ name: 'Instagram', handle: '', followers: 0, engagementRate: 0 }],
            });
        }
    }, [initialData, form]);

    const { fields, append, remove } = useFieldArray({
        name: 'platforms',
        control: form.control,
    });

    const nextStep = async (e?: React.MouseEvent | React.KeyboardEvent) => {
        if (e) e.preventDefault();

        const fieldsToValidate = currentStep === 0
            ? ['fullName', 'username', 'categories', 'avatarUrl', 'bio', 'address', 'locationCountry', 'locationCity']
            : currentStep === 1
                ? ['platforms']
                : currentStep === 2
                    ? ['gender', 'languages', 'minPrice', 'maxPrice']
                    : ['collaborationTypes', 'availability'];

        const isValid = await form.trigger(fieldsToValidate as any);
        if (isValid) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleFormSubmit = (data: ProfileFormValues) => {
        // Double check we are on the last step
        if (currentStep !== steps.length - 1) {
            return;
        }

        // Convert comma-separated strings back to arrays for the parent onSubmit
        const formattedValues = {
            ...data,
            categories: typeof data.categories === 'string' 
                ? data.categories.split(',').map(s => s.trim()).filter(Boolean)
                : data.categories,
            languages: typeof data.languages === 'string'
                ? data.languages.split(',').map(s => s.trim()).filter(Boolean)
                : data.languages,
            audienceTopCountries: typeof data.audienceTopCountries === 'string'
                ? data.audienceTopCountries.split(',').map(s => s.trim()).filter(Boolean)
                : [],
            audienceGenderRatio: data.audienceGenderRatio,
            audienceAgeBrackets: data.audienceAgeBrackets,
        };
        
        onSubmit(formattedValues as any);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Prevent default Enter behavior (which might submit the form prematurely)
        if (e.key === 'Enter') {
            e.preventDefault();
            if (currentStep < steps.length - 1) {
                nextStep();
            } else {
                // If on final step, manually trigger submission
                form.handleSubmit(handleFormSubmit)();
            }
        }
    };

    const getStepIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return <Instagram size={18} />;
            case 'youtube': return <Youtube size={18} />;
            case 'twitter': return <Twitter size={18} />;
            default: return <Globe size={18} />;
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Step Progress */}
            <div className="mb-12">
                <div className="flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0" />
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = idx === currentStep;
                        const isCompleted = idx < currentStep;

                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={cn(
                                    "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                    isActive ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-110" :
                                        isCompleted ? "bg-green-500 text-white" : "bg-zinc-100 dark:bg-zinc-900 text-muted-foreground"
                                )}>
                                    {isCompleted ? <Check size={18} /> : <Icon size={18} className="sm:w-5 sm:h-5" />}
                                </div>
                                <span className={cn(
                                    "text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300",
                                    isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-50 hidden sm:block",
                                    !isActive && "hidden xs:hidden"
                                )}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    onKeyDown={handleKeyDown}
                    className="space-y-8"
                >
                    <motion.div
                        layout
                        className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                {currentStep === 0 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                <Sparkles size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black tracking-tight">Personal Details</h2>
                                                <p className="text-sm text-muted-foreground">Tell us about your brand personality.</p>
                                            </div>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold flex items-center gap-2">
                                                        <AtSign size={14} className="text-primary" />
                                                        Full Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. John Doe" {...field} className="h-12 rounded-xl bg-background/50" />
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
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">@</span>
                                                            <Input placeholder="johndoe" {...field} className="h-12 pl-8 rounded-xl bg-background/50" />
                                                        </div>
                                                    </FormControl>
                                                    <FormDescription>Your unique identity. This creates your profile link.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="categories"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold flex items-center gap-2">
                                                        <LayoutGrid size={14} className="text-primary" />
                                                        Categories
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder="e.g. Fitness, Tech, Beauty (comma separated)" 
                                                            {...field}
                                                            className="h-12 rounded-xl bg-background/50" 
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Help brands find you by listing relevant categories.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="avatarUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold flex items-center gap-2">
                                                        <AtSign size={14} className="text-primary" />
                                                        Profile Picture
                                                    </FormLabel>
                                                    <FormControl>
                                                        <ImageUpload
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            onRemove={() => field.onChange('')}
                                                            maxSize={5}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Upload your profile picture (max 5MB)</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="locationCountry"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold flex items-center gap-2">
                                                            <Globe size={14} className="text-primary" />
                                                            Country
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g. United States" {...field} className="h-12 rounded-xl bg-background/50" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="locationCity"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold flex items-center gap-2">
                                                            <MapPin size={14} className="text-primary" />
                                                            City
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g. New York" {...field} className="h-12 rounded-xl bg-background/50" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold flex items-center gap-2">
                                                        <MapPin size={14} className="text-primary" />
                                                        Full Address
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. 123 Main St, San Francisco, CA" {...field} className="h-12 rounded-xl bg-background/50" />
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
                                                        Short Bio
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Share your story and what makes your content unique..."
                                                            {...field}
                                                            className="min-h-[120px] rounded-2xl bg-background/50 resize-none"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Maximum 500 characters.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black tracking-tight">Social Platforms</h2>
                                                <p className="text-sm text-muted-foreground">Where do you share your content?</p>
                                            </div>
                                        </div>

                                        {fields.map((field, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                key={field.id}
                                                className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 border border-border/50 rounded-3xl relative group"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name={`platforms.${index}.name`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs font-bold uppercase tracking-wider">Platform</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="h-11 rounded-xl bg-background/50">
                                                                            <SelectValue placeholder="Select platform" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="rounded-2xl">
                                                                        <SelectItem value="Instagram">Instagram</SelectItem>
                                                                        <SelectItem value="YouTube">YouTube</SelectItem>
                                                                        <SelectItem value="Twitter">Twitter (X)</SelectItem>
                                                                        <SelectItem value="TikTok">TikTok</SelectItem>
                                                                        <SelectItem value="Other">Other</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`platforms.${index}.handle`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs font-bold uppercase tracking-wider">Profile Link</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                        <Input placeholder="https://..." {...field} className="h-11 pl-9 rounded-xl bg-background/50" />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`platforms.${index}.followers`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs font-bold uppercase tracking-wider">Follower Count</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="e.g. 50000"
                                                                        {...field}
                                                                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                                                        className="h-11 rounded-xl bg-background/50"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`platforms.${index}.engagementRate`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs font-bold uppercase tracking-wider">Engagement Rate (%)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        step="0.1"
                                                                        placeholder="e.g. 4.5"
                                                                        {...field}
                                                                        value={field.value ?? ''}
                                                                        onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                                                                        className="h-11 rounded-xl bg-background/50"
                                                                    />
                                                                </FormControl>
                                                                <FormDescription className="text-[10px]">Optional: Average engagement rate</FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-destructive/10 text-destructive hover:bg-destructive shadow-lg hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Trash2 size={14} />
                                                    </Button>
                                                )}
                                            </motion.div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => append({ name: 'Instagram', handle: '', followers: 0, engagementRate: 0 })}
                                            className="w-full h-12 rounded-xl border-dashed border-2 hover:bg-muted/50 transition-all font-bold gap-2"
                                        >
                                            <Plus size={18} />
                                            Add Another Platform
                                        </Button>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                <Sparkles size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black tracking-tight">Demographics & Pricing</h2>
                                                <p className="text-sm text-muted-foreground">Help brands understand your audience and rates.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name="gender"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold">Your Gender</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="h-12 rounded-xl bg-background/50">
                                                                    <SelectValue placeholder="Select gender" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="rounded-2xl">
                                                                <SelectItem value="Male">Male</SelectItem>
                                                                <SelectItem value="Female">Female</SelectItem>
                                                                <SelectItem value="Non-binary">Non-binary</SelectItem>
                                                                <SelectItem value="Other">Other</SelectItem>
                                                                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="languages"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold">Languages</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                placeholder="e.g. English, Spanish (comma separated)" 
                                                                {...field}
                                                                className="h-12 rounded-xl bg-background/50" 
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="audienceTopCountries"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold">Top Audience Countries</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder="e.g. USA, UK, India (comma separated)" 
                                                            {...field}
                                                            className="h-12 rounded-xl bg-background/50" 
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Where is most of your audience located?</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="space-y-6 pt-6 border-t border-border/50">
                                            <div>
                                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Audience Gender Ratio (%)</h3>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {(['male', 'female', 'other'] as const).map((gender) => (
                                                        <FormField
                                                            key={gender}
                                                            control={form.control}
                                                            name={`audienceGenderRatio.${gender}`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-[10px] uppercase">{gender}</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="number"
                                                                            min={0}
                                                                            max={100}
                                                                            {...field}
                                                                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                                                            className="h-10 rounded-lg bg-background/50"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Audience Age Brackets (%)</h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                    {(['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'] as const).map((age) => (
                                                        <FormField
                                                            key={age}
                                                            control={form.control}
                                                            name={`audienceAgeBrackets.${age}`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-[10px] uppercase">{age}</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="number"
                                                                            min={0}
                                                                            max={100}
                                                                            {...field}
                                                                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                                                            className="h-10 rounded-lg bg-background/50"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                                            <FormField
                                                control={form.control}
                                                name="minPrice"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold">Minimum Rate ($)</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                type="number" 
                                                                placeholder="0" 
                                                                {...field} 
                                                                onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                                                className="h-12 rounded-xl bg-background/50" 
                                                            />
                                                        </FormControl>
                                                        <FormDescription>Your starting rate for collaborations.</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="maxPrice"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold">Maximum Rate ($)</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                type="number" 
                                                                placeholder="0" 
                                                                {...field} 
                                                                onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                                                className="h-12 rounded-xl bg-background/50" 
                                                            />
                                                        </FormControl>
                                                        <FormDescription>Optional: High-end rate or package price.</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                <LayoutGrid size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black tracking-tight">Collaboration Preferences</h2>
                                                <p className="text-sm text-muted-foreground">How would you like to work with brands?</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.values(CollaborationType).map((type) => (
                                                <FormField
                                                    key={type}
                                                    control={form.control}
                                                    name="collaborationTypes"
                                                    render={({ field }) => {
                                                        const isChecked = field.value?.includes(type);
                                                        return (
                                                            <FormItem className="relative">
                                                                <FormControl>
                                                                    <div
                                                                        onClick={() => {
                                                                            const newValue = isChecked
                                                                                ? field.value.filter(v => v !== type)
                                                                                : [...(field.value || []), type];
                                                                            field.onChange(newValue);
                                                                        }}
                                                                        className={cn(
                                                                            "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                                                                            isChecked
                                                                                ? "bg-primary/5 border-primary shadow-lg shadow-primary/5"
                                                                                : "bg-background border-border hover:border-primary/50"
                                                                        )}
                                                                    >
                                                                        <span className={cn(
                                                                            "font-bold text-sm",
                                                                            isChecked ? "text-primary" : "text-foreground"
                                                                        )}>
                                                                            {formatCollaborationType(type)}
                                                                        </span>
                                                                        <div className={cn(
                                                                            "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                                                            isChecked ? "bg-primary border-primary text-white" : "bg-transparent border-zinc-200"
                                                                        )}>
                                                                            {isChecked && <Check size={14} />}
                                                                        </div>
                                                                    </div>
                                                                </FormControl>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="availability"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold">Current Availability</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="h-12 rounded-xl bg-background/50">
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="rounded-2xl">
                                                            <SelectItem value={AvailabilityStatus.OPEN}>Open for Bookings</SelectItem>
                                                            <SelectItem value={AvailabilityStatus.BUSY}>Fully Booked (Waitlist)</SelectItem>
                                                            <SelectItem value={AvailabilityStatus.CLOSED}>Not Accepting Requests</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between gap-4 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={prevStep}
                            disabled={currentStep === 0 || isLoading}
                            className="h-12 px-8 rounded-2xl font-bold gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </Button>

                        {currentStep === steps.length - 1 ? (
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-12 px-10 rounded-2xl font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2"
                            >
                                {isLoading ? (mode === 'setup' ? 'Creating Profile...' : 'Saving Changes...') : (submitLabel || 'Complete Profile')}
                                <Sparkles size={18} />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="h-12 px-10 rounded-2xl font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2 ml-auto"
                            >
                                Continue
                                <ArrowRight size={18} />
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};
