'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
    User,
    AtSign,
    MapPin,
    AlignLeft,
    Sparkles,
    Link2,
    Plus,
    Trash2,
    Globe,
    Camera,
    Briefcase,
    Phone,
    Mail,
    LayoutGrid,
    Users,
    Check,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import ProfileImageStep from '@/components/shared/ProfileImageStep';
import { MultiSelect } from '@/components/ui/multi-select';
import { INFLUENCER_CATEGORIES } from '@/constants/influencer.constants';
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
    SelectValue,
} from '@/components/ui/select';

import { LocationAutocomplete } from '@/components/ui/location-autocomplete';
import { SOCIAL_PLATFORMS, DRAFT_STORAGE_KEYS } from '@/constants';
import { getSocialPlatformIcon, cn } from '@/lib/utils';
import { useAutoSaveDraft } from '@/hooks/use-auto-save-draft';


import { profileSchema, ProfileSchemaType } from '@/lib/validations/profile.validation';


export interface ProfileFormValues {
    username: string;
    fullName: string;
    bio?: string;
    location?: string;
    avatarUrl?: string;
    profileImage?: string; // Keep for mapping if needed
    socialLinks?: Record<string, string>;
    categories?: string[];
    website?: string;
    industry?: string;
    companySize?: string;
    brandTone?: string;
    contactEmail?: string;
    contactPhone?: string;
}

const steps = [
    { id: 'basics', title: 'Basics', icon: User },
    { id: 'brand', title: 'Brand', icon: Briefcase },
    { id: 'socials', title: 'Socials', icon: Globe },
    { id: 'photo', title: 'Photo', icon: Camera },
];

interface ProfileSetupFormProps {
    onSubmit: (data: ProfileFormValues) => void;
    initialData?: Partial<ProfileFormValues>;
    isLoading?: boolean;
    isEdit?: boolean;
}

export const ProfileSetupForm = ({
    onSubmit,
    initialData,
    isLoading,
    isEdit = false,
}: ProfileSetupFormProps) => {
    const [currentStep, setCurrentStep] = React.useState(0);

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
            avatarUrl: initialData?.avatarUrl || initialData?.profileImage || '',
            socials: initialSocials,
            categories: initialData?.categories || [],
            website: initialData?.website || '',
            industry: initialData?.industry || '',
            companySize: initialData?.companySize || '',
            brandTone: initialData?.brandTone || '',
            contactEmail: initialData?.contactEmail || '',
            contactPhone: initialData?.contactPhone || '',
        },
    });

    const nextStep = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();

        const fieldsToValidate = currentStep === 0
            ? ['fullName', 'username', 'location', 'bio', 'categories']
            : currentStep === 1
                ? ['website', 'industry', 'companySize', 'contactEmail', 'contactPhone', 'brandTone']
                : currentStep === 2
                    ? ['socials']
                    : ['avatarUrl'];

        const isValid = await form.trigger(fieldsToValidate as any);
        if (isValid) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                form.handleSubmit(handleFormSubmit)();
            }
        }
    };

    const prevStep = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLElement;
            // Allow enters in textareas
            if (target.tagName.toLowerCase() === 'textarea') return;

            e.preventDefault();
            if (currentStep < steps.length - 1) {
                nextStep();
            } else {
                form.handleSubmit(handleFormSubmit)();
            }
        }
    };

    const { fields, append, remove } = useFieldArray({
        control: form.control as any,
        name: "socials",
    });

    // ─── Auto-save draft (setup mode only) ───────────────────────────────────
    const isSetupMode = !isEdit;
    const formValues = form.watch();

    const { getDraft, clearDraft, saveStatus } = useAutoSaveDraft({
        key: DRAFT_STORAGE_KEYS.PROFILE_SETUP,
        data: formValues,
        delay: 800,
        enabled: isSetupMode,
    });

    // Restore draft on first mount (setup mode, no server data passed in)
    useEffect(() => {
        if (!isSetupMode || initialData) return;

        const draft = getDraft();
        if (!draft) return;

        form.reset(draft as ProfileSchemaType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // intentionally runs only once on mount

    const handleFormSubmit = (values: ProfileSchemaType) => {
        // Transform socials array back to object for backend
        const socialLinks: Record<string, string> = {};
        values.socials.forEach(item => {
            if (item.platform && item.url) {
                socialLinks[item.platform.toLowerCase()] = item.url;
            }
        });

        const { socials, ...rest } = values;

        // Clean values: convert empty strings and empty arrays to null to avoid backend validation errors
        const cleanedRest: Record<string, any> = {};
        Object.entries(rest).forEach(([key, val]) => {
            if (val === '') {
                cleanedRest[key] = null;
            } else if (Array.isArray(val) && val.length === 0) {
                cleanedRest[key] = null;
            } else {
                cleanedRest[key] = val;
            }
        });

        // Clear draft before handing off — parent handles success routing
        if (isSetupMode) clearDraft();

        onSubmit({
            ...cleanedRest,
            socialLinks
        } as any);
    };

    const handleFinishLater = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();

        // Validate only basic fields (fullName and username)
        const isValid = await form.trigger(['fullName', 'username']);
        if (!isValid) {
            toast.error('Please enter your full name and username to save your profile.');
            return;
        }

        const values = form.getValues();
        
        // Transform socials array back to object for backend
        const socialLinks: Record<string, string> = {};
        (values.socials || []).forEach(item => {
            if (item.platform && item.url) {
                socialLinks[item.platform.toLowerCase()] = item.url;
            }
        });

        const { socials, ...rest } = values;

        // Clean values: convert empty strings and empty arrays to null to avoid backend validation errors
        const cleanedRest: Record<string, any> = {};
        Object.entries(rest).forEach(([key, val]) => {
            if (val === '') {
                cleanedRest[key] = null;
            } else if (Array.isArray(val) && val.length === 0) {
                cleanedRest[key] = null;
            } else {
                cleanedRest[key] = val;
            }
        });

        if (isSetupMode) clearDraft();

        onSubmit({
            ...cleanedRest,
            socialLinks
        } as any);
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
                    onSubmit={form.handleSubmit(handleFormSubmit, (errors) => {
                        if (errors.username) {
                            toast.error(errors.username.message || 'Please check your username');
                        } else {
                            const firstErrorKey = Object.keys(errors)[0];
                            if (firstErrorKey) {
                                const error = errors[firstErrorKey as keyof typeof errors];
                                toast.error((error as { message?: string })?.message || `Invalid ${firstErrorKey}`);
                            } else {
                                toast.error('Please fill in all required fields correctly.');
                            }
                        }
                    })}
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
                                    <div className="space-y-10">
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
                                                        <LocationAutocomplete
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            disabled={isLoading}
                                                            placeholder="Search and select your location..."
                                                        />
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
                                                            value={field.value || []}
                                                            onChange={field.onChange}
                                                            placeholder="Select categories"
                                                            className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-[10px]">Select categories that best describe your brand or niche.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                <Briefcase size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-lg">Brand Information</h3>
                                                <p className="text-xs text-muted-foreground">Additional details for business accounts</p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name="website"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold flex items-center gap-2">
                                                            <Globe size={14} className="text-primary" />
                                                            Website
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="https://yourbrand.com" {...field} className="h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="industry"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold flex items-center gap-2">
                                                            <LayoutGrid size={14} className="text-primary" />
                                                            Industry
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g. Fashion, Tech" {...field} className="h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="companySize"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold flex items-center gap-2">
                                                            <Users size={14} className="text-primary" />
                                                            Company Size
                                                        </FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all">
                                                                    <SelectValue placeholder="Select size" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                                                <SelectItem value="11-50">11-50 employees</SelectItem>
                                                                <SelectItem value="51-200">51-200 employees</SelectItem>
                                                                <SelectItem value="201-500">201-500 employees</SelectItem>
                                                                <SelectItem value="501+">501+ employees</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="contactEmail"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold flex items-center gap-2">
                                                            <Mail size={14} className="text-primary" />
                                                            Business Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="contact@brand.com" {...field} className="h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="contactPhone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold flex items-center gap-2">
                                                            <Phone size={14} className="text-primary" />
                                                            Business Phone
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+1 234 567 890" {...field} className="h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="brandTone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold flex items-center gap-2">
                                                        <Sparkles size={14} className="text-primary" />
                                                        Brand Tone / Voice
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Describe your brand's voice (e.g. Professional, Fun, Minimalist)..."
                                                            {...field}
                                                            className="min-h-[80px] rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all resize-none px-4 py-3"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {currentStep === 2 && (
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
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="h-10 rounded-lg bg-background border-none shadow-sm w-full">
                                                                                <SelectValue placeholder="Platform" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
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

                    {/* Navigation Buttons */}
                    <div className="flex justify-between gap-4 pt-4">
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0 || isLoading}
                                className="h-12 px-8 rounded-2xl font-bold gap-2 text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft size={18} />
                                Back
                            </Button>

                            {isSetupMode && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleFinishLater}
                                    disabled={isLoading}
                                    className="h-12 px-6 rounded-2xl font-bold border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                                >
                                    Finish Later
                                </Button>
                            )}
                        </div>

                        {currentStep === steps.length - 1 ? (
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-12 px-10 rounded-2xl font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2"
                            >
                                {isLoading ? 'Saving...' : isEdit ? 'Update Profile' : 'Complete Setup'}
                                <Sparkles size={18} />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="h-12 px-10 rounded-2xl font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2"
                            >
                                Continue
                                <ChevronRight size={18} />
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};
