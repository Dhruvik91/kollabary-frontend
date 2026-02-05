"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { useBrandOnboarding } from "@/hooks/useBrandOnboarding";

// Define schema
const brandSchema = z.object({
    username: z.string().min(3, "Username must be 3+ characters"),
    fullName: z.string().min(2, "Full Name is required"),
    bio: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    location: z.string().optional(),
});

export default function BrandOnboarding() {
    const mutation = useBrandOnboarding();
    const form = useForm<z.infer<typeof brandSchema>>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            username: "",
            fullName: "",
            bio: "",
            website: "",
            location: "",
        },
    });

    async function onSubmit(values: z.infer<typeof brandSchema>) {
        const payload = {
            username: values.username,
            fullName: values.fullName,
            bio: values.bio,
            website: values.website,
            location: values.location,
        };
        mutation.mutate(payload);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <BackgroundEffects />
            <GlassCard className="max-w-xl w-full p-8 relative z-10">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold font-display mb-2">Welcome to Kollabary</h1>
                    <p className="text-muted-foreground">Set up your brand profile to start collaborating.</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand / Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Corp" {...field} />
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
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="acmecorp" {...field} />
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
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="We make the best widgets..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://acme.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full gradient-bg" disabled={mutation.isPending}>
                            {mutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                            Complete Setup
                        </Button>
                    </form>
                </Form>
            </GlassCard>
        </div>
    );
}
