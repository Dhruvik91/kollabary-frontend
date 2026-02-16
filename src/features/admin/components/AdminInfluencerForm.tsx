'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateInfluencerFormData, createInfluencerSchema } from '@/lib/validations/admin.validation';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, UserPlus, Loader2 } from 'lucide-react';

interface AdminInfluencerFormProps {
    onSubmit: (data: CreateInfluencerFormData) => void;
    isLoading: boolean;
}

export function AdminInfluencerForm({ onSubmit, isLoading }: AdminInfluencerFormProps) {
    const form = useForm<CreateInfluencerFormData>({
        resolver: zodResolver(createInfluencerSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <Card className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UserPlus size={24} />
                </div>
                <CardTitle className="text-2xl font-bold">Create Influencer</CardTitle>
                <CardDescription>
                    Fill in the details below to create a new influencer account with login credentials.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="influencer@example.com"
                                                {...field}
                                                className="rounded-xl border-border/50 bg-background/50 pl-10 focus:ring-primary/20"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                {...field}
                                                className="rounded-xl border-border/50 bg-background/50 pl-10 focus:ring-primary/20"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                {...field}
                                                className="rounded-xl border-border/50 bg-background/50 pl-10 focus:ring-primary/20"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full rounded-xl py-6 font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Influencer Account'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
