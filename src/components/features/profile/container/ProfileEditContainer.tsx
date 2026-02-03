'use client';

import { useAuth } from '@/providers/auth-provider';
import { useMyProfile, useUpdateProfile } from '@/hooks/useProfile';
import { useMyInfluencerProfile, useSaveInfluencerProfile } from '@/hooks/useInfluencers';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, User as UserIcon, Camera, Globe, Instagram, Youtube, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ROLES } from '@/constants/constants';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    bio: z.string().optional(),
    location: z.string().optional(),
    socialMediaLinks: z.object({
        instagram: z.string().optional(),
        youtube: z.string().optional(),
        twitter: z.string().optional(),
    }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileEditContainer() {
    const { user } = useAuth();
    const { data: profile, isLoading: isProfileLoading } = useMyProfile();
    const { data: influencerProfile, isLoading: isInfluencerLoading } = useMyInfluencerProfile();
    const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
    const { mutate: saveInfluencerProfile, isPending: isSavingInfluencer } = useSaveInfluencerProfile();
    const { toast } = useToast();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        values: {
            name: profile?.name || '',
            bio: influencerProfile?.bio || '',
            location: influencerProfile?.location || '',
            socialMediaLinks: {
                instagram: influencerProfile?.socialMediaLinks?.instagram || '',
                youtube: influencerProfile?.socialMediaLinks?.youtube || '',
                twitter: influencerProfile?.socialMediaLinks?.twitter || '',
            },
        },
    });

    const onSubmit = (data: ProfileFormValues) => {
        updateProfile({ name: data.name }, {
            onSuccess: () => {
                if (user?.role === ROLES.INFLUENCER) {
                    saveInfluencerProfile({
                        bio: data.bio,
                        location: data.location,
                        socialMediaLinks: data.socialMediaLinks,
                    }, {
                        onSuccess: () => {
                            toast({ title: 'Profile Updated', description: 'Your changes have been saved successfully.' });
                        }
                    });
                } else {
                    toast({ title: 'Profile Updated', description: 'Your changes have been saved successfully.' });
                }
            },
            onError: (err: any) => {
                toast({
                    title: 'Update Failed',
                    description: err?.response?.data?.message || 'Something went wrong.',
                    variant: 'destructive'
                });
            }
        });
    };

    if (isProfileLoading || (user?.role === ROLES.INFLUENCER && isInfluencerLoading)) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="container max-w-4xl px-4 py-12 mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold">Edit Profile</h1>
                <p className="text-muted-foreground">Update your personal information and public presence.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="glass-enhanced rounded-3xl p-8 space-y-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative group">
                                <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                                    <AvatarImage src={profile?.profileImage} />
                                    <AvatarFallback className="text-2xl font-bold bg-primary/5 text-primary">
                                        {profile?.name?.charAt(0) || <UserIcon />}
                                    </AvatarFallback>
                                </Avatar>
                                <button type="button" className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex-1 space-y-1 text-center md:text-left">
                                <h3 className="text-xl font-bold">{profile?.name || 'Your Name'}</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-widest">{user?.role}</p>
                                <p className="text-sm text-muted-foreground">{profile?.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name / Brand Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter name" className="bg-white/5" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {user?.role === ROLES.INFLUENCER && (
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="e.g. New York, USA" className="bg-white/5 pl-10" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        {user?.role === ROLES.INFLUENCER && (
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell brands about yourself..."
                                                className="bg-white/5 min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Describe your niche, style, and what makes you unique.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>

                    {user?.role === ROLES.INFLUENCER && (
                        <div className="glass-enhanced rounded-3xl p-8 space-y-6">
                            <h3 className="text-xl font-bold">Social Media Profiles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="socialMediaLinks.instagram"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Instagram className="h-4 w-4 text-pink-500" /> Instagram
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="@handle" className="bg-white/5" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="socialMediaLinks.youtube"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Youtube className="h-4 w-4 text-red-500" /> YouTube
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Channel URL" className="bg-white/5" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="socialMediaLinks.twitter"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Twitter className="h-4 w-4 text-blue-400" /> Twitter
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="@handle" className="bg-white/5" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isUpdatingProfile || isSavingInfluencer} className="px-8 bg-primary hover:bg-primary/90">
                            {(isUpdatingProfile || isSavingInfluencer) ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
