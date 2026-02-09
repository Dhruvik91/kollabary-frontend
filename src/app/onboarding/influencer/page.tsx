'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    MapPin,
    FileText,
    Instagram,
    Youtube,
    Twitter,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Star,
    Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { GlassCard } from '@/components/ui/GlassCard';
import { Progress } from '@/components/ui/progress';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { influencerSchema, InfluencerSchemaType } from '@/constants/validations';
import { useInfluencerOnboarding } from '@/hooks/useInfluencerOnboarding';
import { CreateInfluencerPayload } from '@/types/influencer';

const steps = [
    { id: 1, name: 'About You', icon: User },
    { id: 2, name: 'Social Media', icon: Instagram },
    { id: 3, name: 'Categories', icon: Tag },
];

export default function EnhancedInfluencerOnboarding() {
    const [currentStep, setCurrentStep] = useState(1);
    const mutation = useInfluencerOnboarding();

    const form = useForm<InfluencerSchemaType>({
        resolver: zodResolver(influencerSchema),
        defaultValues: {
            bio: '',
            location: '',
            instagram: '',
            twitter: '',
            tiktok: '',
            youtube: '',
            categories: '',
        },
        mode: 'onChange',
    });

    const progress = (currentStep / steps.length) * 100;

    const nextStep = async () => {
        let fieldsToValidate: (keyof InfluencerSchemaType)[] = [];

        if (currentStep === 1) {
            fieldsToValidate = ['bio', 'location'];
        } else if (currentStep === 2) {
            // At least one social media is required
            const hasAnySocial = form.getValues('instagram') || form.getValues('youtube') ||
                form.getValues('twitter') || form.getValues('tiktok');
            if (!hasAnySocial) {
                form.setError('instagram', { message: 'At least one social media link is required' });
                return;
            }
        }

        const isValid = await form.trigger(fieldsToValidate);

        if (isValid && currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = (values: InfluencerSchemaType) => {
        const payload: CreateInfluencerPayload = {
            bio: values.bio,
            location: values.location,
            socialMediaLinks: {
                instagram: values.instagram,
                twitter: values.twitter,
                tiktok: values.tiktok,
                youtube: values.youtube,
            },
            niche: values.categories,
        };

        mutation.mutate(payload);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <BackgroundEffects />
            <GlassCard className="max-w-2xl w-full p-8 relative z-10">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                        <Star className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold font-display mb-2 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                        Become an Influencer
                    </h1>
                    <p className="text-muted-foreground">
                        Complete your profile to start receiving collaboration offers
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {steps.map((step) => {
                            const StepIcon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;

                            return (
                                <div key={step.id} className="flex flex-col items-center flex-1">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${isCompleted
                                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                                                : isActive
                                                    ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white ring-4 ring-purple-500/20'
                                                    : 'bg-secondary text-muted-foreground'
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-5 h-5" />
                                        ) : (
                                            <StepIcon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span className={`text-xs font-medium ${isActive ? 'text-purple-600' : 'text-muted-foreground'}`}>
                                        {step.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {/* Step 1: About You */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
                                                    Tell Us About Yourself
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="I create content about fashion, lifestyle, and travel. My audience loves authentic reviews and behind-the-scenes content..."
                                                        {...field}
                                                        className="min-h-[150px] resize-none"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Share what makes you unique and what kind of content you create ({field.value.length}/500)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    Location
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Los Angeles, CA"
                                                        {...field}
                                                        className="h-12"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Where are you based? This helps brands find local influencers
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}

                            {/* Step 2: Social Media */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg mb-4">
                                        <p className="text-sm text-purple-900 dark:text-purple-100">
                                            <strong>Tip:</strong> Add at least one social media profile. More platforms = more opportunities!
                                        </p>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="instagram"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Instagram className="w-4 h-4 text-pink-600" />
                                                    Instagram Profile
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://instagram.com/yourprofile"
                                                        {...field}
                                                        className="h-12"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="youtube"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Youtube className="w-4 h-4 text-red-600" />
                                                    YouTube Channel
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://youtube.com/@yourchannel"
                                                        {...field}
                                                        className="h-12"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="twitter"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Twitter className="w-4 h-4 text-blue-500" />
                                                        Twitter/X
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="https://twitter.com/you"
                                                            {...field}
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="tiktok"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                                        </svg>
                                                        TikTok
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="https://tiktok.com/@you"
                                                            {...field}
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Categories */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="categories"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Tag className="w-4 h-4" />
                                                    Content Categories
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Fashion, Beauty, Lifestyle, Travel"
                                                        {...field}
                                                        className="h-12"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter categories separated by commas (e.g., Fashion, Tech, Gaming)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm">
                                                <p className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                                                    🎉 You're Ready to Go!
                                                </p>
                                                <p className="text-purple-800 dark:text-purple-200">
                                                    Complete your profile to start receiving collaboration requests from brands. Your ranking will improve as you complete more collaborations!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 pt-4">
                            {currentStep > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    className="flex-1"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            )}

                            {currentStep < steps.length ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                            />
                                            Creating Profile...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Complete Profile
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </GlassCard>
        </div>
    );
}
