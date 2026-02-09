'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Building2,
    MapPin,
    Globe,
    FileText,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { GlassCard } from '@/components/ui/GlassCard';
import { Progress } from '@/components/ui/progress';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { useBrandOnboarding } from '@/hooks/useBrandOnboarding';

const brandSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores'),
    fullName: z.string().min(2, 'Full name is required'),
    bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio must be less than 500 characters'),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
    location: z.string().min(2, 'Location is required'),
});

type BrandFormData = z.infer<typeof brandSchema>;

const steps = [
    { id: 1, name: 'Basic Info', icon: User },
    { id: 2, name: 'About You', icon: FileText },
    { id: 3, name: 'Contact', icon: Globe },
];

export default function EnhancedBrandOnboarding() {
    const [currentStep, setCurrentStep] = useState(1);
    const mutation = useBrandOnboarding();

    const form = useForm<BrandFormData>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            username: '',
            fullName: '',
            bio: '',
            website: '',
            location: '',
        },
        mode: 'onChange',
    });

    const progress = (currentStep / steps.length) * 100;

    const nextStep = async () => {
        let fieldsToValidate: (keyof BrandFormData)[] = [];

        if (currentStep === 1) {
            fieldsToValidate = ['fullName', 'username'];
        } else if (currentStep === 2) {
            fieldsToValidate = ['bio'];
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

    const onSubmit = (values: BrandFormData) => {
        mutation.mutate(values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <BackgroundEffects />
            <GlassCard className="max-w-2xl w-full p-8 relative z-10">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 mb-4">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold font-display mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Welcome to Kollabary
                    </h1>
                    <p className="text-muted-foreground">
                        Let's set up your brand profile in just a few steps
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
                                                    ? 'bg-gradient-to-br from-primary to-purple-600 text-white ring-4 ring-primary/20'
                                                    : 'bg-secondary text-muted-foreground'
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-5 h-5" />
                                        ) : (
                                            <StepIcon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
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
                            {/* Step 1: Basic Info */}
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
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Building2 className="w-4 h-4" />
                                                    Brand / Company Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Acme Corporation"
                                                        {...field}
                                                        className="h-12"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is how your brand will appear on the platform
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    Username
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                            @
                                                        </span>
                                                        <Input
                                                            placeholder="acmecorp"
                                                            {...field}
                                                            className="h-12 pl-8"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Choose a unique username (letters, numbers, underscores only)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}

                            {/* Step 2: About */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
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
                                                    About Your Brand
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell influencers about your brand, what you do, and what kind of collaborations you're looking for..."
                                                        {...field}
                                                        className="min-h-[150px] resize-none"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {field.value.length}/500 characters
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}

                            {/* Step 3: Contact */}
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
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4" />
                                                    Website (Optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://acme.com"
                                                        {...field}
                                                        className="h-12"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Your company website or landing page
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
                                                        placeholder="San Francisco, CA"
                                                        {...field}
                                                        className="h-12"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Where is your brand based?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <div className="text-sm">
                                                <p className="font-medium text-primary mb-1">You're all set!</p>
                                                <p className="text-muted-foreground">
                                                    Click "Complete Setup" to start discovering influencers and creating collaborations.
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
                                    className="flex-1 gradient-bg"
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="flex-1 gradient-bg"
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
                                            Complete Setup
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
