'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAutoSaveDraft } from '@/hooks/use-auto-save-draft';
import { DRAFT_STORAGE_KEYS } from '@/constants';
import {
    LayoutGrid,
    User,
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
    Link as LinkIcon,
    CloudIcon,
    SaveIcon,
    AlertCircleIcon,
    Camera
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
import { cn, getSocialPlatformIcon } from '@/lib/utils';
import ProfileImageStep from '@/components/shared/ProfileImageStep';
import { formatCollaborationType } from '@/lib/format-collaboration-type';
import { INFLUENCER_CATEGORIES } from '@/constants/influencer.constants';
import { MultiSelect } from '@/components/ui/multi-select';
import { LocationAutocomplete } from '@/components/ui/location-autocomplete';
import { SOCIAL_PLATFORMS } from '@/constants';

import { influencerProfileSchema as profileSchema, InfluencerProfileSchemaType } from '@/lib/validations/influencer.validation';

type ProfileFormValues = InfluencerProfileSchemaType;

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
    { id: 'preferences', title: 'Preferences', icon: LayoutGrid },
    { id: 'avatar', title: 'Profile Photo', icon: Camera },
];

export const InfluencerProfileForm = ({
    onSubmit,
    initialData,
    isLoading,
    submitLabel,
    mode = 'setup'
}: InfluencerProfileFormProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const isSetupMode = mode === 'setup';

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema) as any,
        defaultValues: {
            fullName: initialData?.fullName || '',
            username: initialData?.user?.profile?.username || initialData?.user?.username || initialData?.username || '',
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
            platforms: initialData?.platforms || [{ name: 'instagram', handle: '', followers: 0, engagementRate: 0 }],
        },
    });

    // ─── Auto-save draft (setup mode only) ───────────────────────────────────
    const formValues = form.watch();

    const { getDraft, clearDraft, saveStatus } = useAutoSaveDraft({
        key: DRAFT_STORAGE_KEYS.INFLUENCER_SETUP,
        data: formValues,
        delay: 800,
        enabled: isSetupMode,
    });

    // Restore draft on first mount (setup mode, no server data passed in)
    useEffect(() => {
        if (!isSetupMode || initialData) return;

        const draft = getDraft();
        if (!draft) return;

        form.reset(draft as ProfileFormValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  // intentionally runs only once on mount

    // Handle form reset when initialData is loaded
    React.useEffect(() => {
        if (initialData) {
            form.reset({
                fullName: initialData.fullName || '',
                username: initialData.user?.profile?.username || initialData.user?.username || initialData.username || '',
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
            ? ['fullName', 'username', 'categories', 'bio', 'address', 'locationCountry', 'locationCity', 'gender']
            : currentStep === 1
                ? ['platforms']
                : currentStep === 2
                    ? ['collaborationTypes', 'availability']
                    : ['avatarUrl'];

        const isValid = await form.trigger(fieldsToValidate as any);
        if (isValid) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        } else {
            const errors = form.formState.errors;
            if (errors.username) {
                toast.error(errors.username.message || 'Please check your username');
            } else {
                const firstErrorField = fieldsToValidate.find(field => errors[field as keyof typeof errors]);
                if (firstErrorField) {
                    const error = errors[firstErrorField as keyof typeof errors];
                    toast.error((error as { message?: string })?.message || `Invalid ${firstErrorField}`);
                } else {
                    toast.error('Please fill in all required fields correctly before continuing.');
                }
            }
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
            username: data.username, // Explicitly include username
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

        // Clear draft before handing off — the parent async submit handles routing
        if (isSetupMode) clearDraft();

        onSubmit(formattedValues as any);
    };

    const handleInvalidSubmit = (errors: Record<string, { message?: string }>) => {
        if (errors.username) {
            toast.error(errors.username.message || 'Please check your username');
        } else {
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                const error = errors[firstErrorKey];
                toast.error(error?.message || `Invalid ${firstErrorKey}`);
            } else {
                toast.error('Please fill in all required fields correctly.');
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Prevent default Enter behavior (which might submit the form prematurely)
        if (e.key === 'Enter') {
            e.preventDefault();
            if (currentStep < steps.length - 1) {
                nextStep();
            } else {
                // If on final step, manually trigger submission
                form.handleSubmit(handleFormSubmit, handleInvalidSubmit)();
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
            <div className="mb-10">
                <div className="flex items-start justify-between relative">

                    {/* Connector lines — drawn between icon centres */}
                    {steps.map((_, idx) => {
                        if (idx === steps.length - 1) return null;
                        const isCompleted = idx < currentStep;
                        return (
                            <div
                                key={`connector-${idx}`}
                                className="absolute top-5 sm:top-6 h-0.5 z-0 transition-all duration-500"
                                style={{
                                    left: `calc(${(idx / (steps.length - 1)) * 100}% + 20px)`,
                                    width: `calc(${(1 / (steps.length - 1)) * 100}% - 40px)`,
                                    background: isCompleted
                                        ? 'hsl(var(--primary))'
                                        : 'hsl(var(--border))',
                                }}
                            />
                        );
                    })}

                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = idx === currentStep;
                        const isCompleted = idx < currentStep;

                        return (
                            <div
                                key={step.id}
                                className="relative z-10 flex flex-col items-center gap-2 flex-1"
                            >
                                {/* Icon bubble */}
                                <div className={cn(
                                    "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ring-2",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110 ring-primary/30"
                                        : isCompleted
                                            ? "bg-primary/15 text-primary ring-primary/20"
                                            : "bg-muted text-muted-foreground ring-border/50"
                                )}>
                                    {isCompleted
                                        ? <Check size={18} strokeWidth={2.5} />
                                        : <Icon size={18} />}
                                </div>

                                {/* Label */}
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest text-center transition-all duration-300 leading-tight px-1",
                                    isActive
                                        ? "text-primary"
                                        : isCompleted
                                            ? "text-primary/60"
                                            : "text-muted-foreground/50"
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
                    onSubmit={form.handleSubmit(handleFormSubmit, handleInvalidSubmit)}
                    onKeyDown={handleKeyDown}
                    className="space-y-8"
                >
                    <motion.div
                        layout
                        className="p-4 md:p-10"
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
                                                        <User size={14} className="text-primary" />
                                                        Full Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your full name" {...field} className="h-12 rounded-xl bg-background/50" />
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
                                                            <Input placeholder="your_username" {...field} className="h-12 pl-8 rounded-xl bg-background/50" />
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
                                                        <MultiSelect
                                                            options={[...INFLUENCER_CATEGORIES]}
                                                            value={typeof field.value === 'string' ? field.value.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(field.value) ? field.value : [])}
                                                            onChange={(vals) => field.onChange(vals.join(', '))}
                                                            placeholder="Choose Categories"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Help brands find you by listing relevant categories.</FormDescription>
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
                                                        <LocationAutocomplete
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            disabled={isLoading}
                                                            placeholder="e.g. 123 Main St, San Francisco, CA"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold flex items-center gap-2">
                                                        <Sparkles size={14} className="text-primary" />
                                                        Gender
                                                    </FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="h-12 rounded-xl bg-background/50">
                                                                <SelectValue placeholder="Choose Gender" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="rounded-2xl">
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="non-binary">Non-binary</SelectItem>
                                                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
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
                                                                <Select onValueChange={field.onChange} value={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="h-11 rounded-xl bg-background/50">
                                                                            <SelectValue placeholder="Choose Platform" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="rounded-2xl">
                                                                        {SOCIAL_PLATFORMS.map((platform) => {
                                                                            const Icon = getSocialPlatformIcon(platform.value as any);
                                                                            return (
                                                                                <SelectItem key={platform.value} value={platform.value}>
                                                                                    <div className="flex items-center gap-2">
                                                                                        <Icon size={14} className="text-primary" />
                                                                                        <span>{platform.label}</span>
                                                                                    </div>
                                                                                </SelectItem>
                                                                            );
                                                                        })}
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
                                                                        <Input placeholder="Enter your profile URL (e.g. instagram.com/username)" {...field} className="h-11 pl-9 rounded-xl bg-background/50" />
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
                                                                        value={field.value === 0 || field.value === undefined || field.value === null ? '' : field.value}
                                                                        onChange={e => field.onChange(e.target.value === '' ? 0 : (parseInt(e.target.value) || 0))}
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
                                                                        value={field.value === 0 || field.value === undefined || field.value === null ? '' : field.value}
                                                                        onChange={e => field.onChange(e.target.value === '' ? undefined : (parseFloat(e.target.value) || 0))}
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
                                            onClick={() => append({ name: 'instagram', handle: '', followers: 0, engagementRate: 0 })}
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

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border/50">
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
                                                                value={field.value === 0 || field.value === undefined || field.value === null ? '' : field.value}
                                                                onChange={e => field.onChange(e.target.value === '' ? 0 : (parseFloat(e.target.value) || 0))}
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
                                                                value={field.value === 0 || field.value === undefined || field.value === null ? '' : field.value}
                                                                onChange={e => field.onChange(e.target.value === '' ? 0 : (parseFloat(e.target.value) || 0))}
                                                                className="h-12 rounded-xl bg-background/50"
                                                            />
                                                        </FormControl>
                                                        <FormDescription>Optional: High-end rate.</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="availability"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold">Current Availability</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="h-12 rounded-xl bg-background/50">
                                                                <SelectValue placeholder="Choose Status" />
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

                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                <Camera size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black tracking-tight">Profile Photo</h2>
                                                <p className="text-sm text-muted-foreground">Upload and crop your profile photo so brands can recognize you.</p>
                                            </div>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="avatarUrl"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col items-center justify-center">
                                                    <FormControl>
                                                        <ProfileImageStep
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Draft status indicator */}
                    {isSetupMode && saveStatus !== 'idle' && (
                        <div className="flex justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={saveStatus}
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.2 }}
                                    className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold",
                                        saveStatus === 'saving' && "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
                                        saveStatus === 'saved' && "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400",
                                        saveStatus === 'error' && "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
                                    )}
                                >
                                    {saveStatus === 'saving' && <><CloudIcon size={11} className="animate-pulse" /> Saving draft…</>}
                                    {saveStatus === 'saved' && <><SaveIcon size={11} /> Draft saved</>}
                                    {saveStatus === 'error' && <><AlertCircleIcon size={11} /> Failed to save</>}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}

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
